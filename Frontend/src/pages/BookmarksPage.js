import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import StoryCard from '../components/StoryCard';
import SkeletonLoader from '../components/SkeletonLoader';
import toast from 'react-hot-toast';

const BookmarksPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data } = await api.get('api/stories/bookmarked');
        setStories(data.data);
      } catch {
        toast.error('Failed to load bookmarks');
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleBookmarkToggle = (storyId, isBookmarked) => {
    if (!isBookmarked) {
      setStories((prev) => prev.filter((s) => s._id !== storyId));
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Bookmarks</h1>
          <p className="page-subtitle">{stories.length} saved stories</p>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={5} />
      ) : stories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔖</div>
          <div className="empty-title">No bookmarks yet</div>
          <p className="empty-desc">Bookmark stories from the home page to save them here</p>
        </div>
      ) : (
        <div className="story-list">
          {stories.map((story, index) => (
            <StoryCard
              key={story._id}
              story={story}
              rank={index + 1}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
