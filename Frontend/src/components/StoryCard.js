import React from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return null;
  }
};

const BookmarkIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const StoryCard = ({ story, rank, onBookmarkToggle }) => {
  const { isAuthenticated } = useAuth();
  const domain = getDomain(story.url);

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Login to bookmark stories');
      return;
    }
    try {
      const { data } = await api.post(`/stories/${story._id}/bookmark`);
      onBookmarkToggle(story._id, data.isBookmarked);
      toast.success(data.isBookmarked ? 'Bookmarked!' : 'Removed bookmark');
    } catch {
      toast.error('Failed to update bookmark');
    }
  };

  return (
    <div className="story-card">
      <span className="story-rank">{rank}.</span>
      <div className="story-body">
        <a
          href={story.url || `https://news.ycombinator.com`}
          target="_blank"
          rel="noopener noreferrer"
          className="story-title-link"
        >
          {story.title}
        </a>
        <div className="story-meta">
          <span className="meta-item points">▲ {story.points}</span>
          <span className="meta-item">by {story.author || 'unknown'}</span>
          <span className="meta-item">{story.postedAt}</span>
          {domain && <span className="story-domain">{domain}</span>}
        </div>
      </div>
      <button
        className={`bookmark-btn ${story.isBookmarked ? 'active' : ''}`}
        onClick={handleBookmark}
        title={story.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
      >
        <BookmarkIcon filled={story.isBookmarked} />
      </button>
    </div>
  );
};

export default StoryCard;
