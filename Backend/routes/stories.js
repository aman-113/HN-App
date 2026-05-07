const express = require('express');
const {
  getAllStories,
  getStoryById,
  toggleBookmark,
  getBookmarkedStories,
} = require('../controllers/storyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const optionalAuth = (req, res, next) => {
  const auth = require('../middleware/auth');
  if (req.headers.authorization?.startsWith('Bearer ')) {
    return auth.protect(req, res, next);
  }
  next();
};

router.get('/', optionalAuth, getAllStories);
router.get('/bookmarked', protect, getBookmarkedStories);
router.get('/:id', optionalAuth, getStoryById);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
