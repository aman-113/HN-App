import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import StoryCard from '../components/StoryCard';
import SkeletonLoader from '../components/SkeletonLoader';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  const fetchStories = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`api/stories?page=${page}&limit=10`);
      const responseData = response.data || {};
      setStories(responseData.data || []);
      setPagination({
        page: responseData.pagination?.page ?? 1,
        totalPages: responseData.pagination?.totalPages ?? 1,
        total: responseData.pagination?.total ?? 0,
        hasPrevPage: responseData.pagination?.hasPrevPage ?? false,
        hasNextPage: responseData.pagination?.hasNextPage ?? false,
      });
    } catch {
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories(1);
  }, [fetchStories]);

  const handleScrape = async () => {
    setScraping(true);
    try {
      const { data } = await api.post('api/scrape');
      toast.success(`Scraped ${data.data.saved} stories!`);
      fetchStories(1);
    } catch {
      toast.error('Scrape failed');
    } finally {
      setScraping(false);
    }
  };

  const handleBookmarkToggle = (storyId, isBookmarked) => {
    setStories((prev) =>
      prev.map((s) => (s._id === storyId ? { ...s, isBookmarked } : s))
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Top Stories</h1>
          <p className="page-subtitle">
            {pagination.total} stories · sorted by points
          </p>
        </div>
        <div className="scrape-section">
          <button onClick={handleScrape} disabled={scraping} className="btn btn-primary">
            {scraping ? (
              <>
                <div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                Scraping...
              </>
            ) : (
              '↻ Refresh'
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={10} />
      ) : stories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📰</div>
          <div className="empty-title">No stories yet</div>
          <p className="empty-desc">Click Refresh to scrape HackerNews</p>
        </div>
      ) : (
        <>
          <div className="story-list">
            {stories.map((story, index) => (
              <StoryCard
                key={story._id}
                story={story}
                rank={(pagination.page - 1) * 10 + index + 1}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-ghost"
                disabled={!pagination.hasPrevPage}
                onClick={() => fetchStories(pagination.page - 1)}
              >
                ← Prev
              </button>
              <span className="page-info">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                className="btn btn-ghost"
                disabled={!pagination.hasNextPage}
                onClick={() => fetchStories(pagination.page + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
