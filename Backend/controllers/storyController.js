const Story = require('../models/Story');
const User = require('../models/User');

const getAllStories = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const total = await Story.countDocuments();
    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    let storiesWithBookmark = stories;

    if (req.user) {
      const user = await User.findById(req.user._id).select('bookmarks');
      const bookmarkSet = new Set(user.bookmarks.map((b) => b.toString()));
      storiesWithBookmark = stories.map((s) => ({
        ...s,
        isBookmarked: bookmarkSet.has(s._id.toString()),
      }));
    }

    res.status(200).json({
      success: true,
      data: storiesWithBookmark,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getStoryById = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    let isBookmarked = false;
    if (req.user) {
      const user = await User.findById(req.user._id).select('bookmarks');
      isBookmarked = user.bookmarks.some((b) => b.toString() === story._id.toString());
    }

    res.status(200).json({ success: true, data: { ...story, isBookmarked } });
  } catch (error) {
    next(error);
  }
};

const toggleBookmark = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    const user = await User.findById(req.user._id);
    const bookmarkIndex = user.bookmarks.indexOf(story._id);
    let isBookmarked;

    if (bookmarkIndex === -1) {
      user.bookmarks.push(story._id);
      isBookmarked = true;
    } else {
      user.bookmarks.splice(bookmarkIndex, 1);
      isBookmarked = false;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: isBookmarked ? 'Story bookmarked' : 'Bookmark removed',
      isBookmarked,
    });
  } catch (error) {
    next(error);
  }
};

const getBookmarkedStories = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'bookmarks',
      options: { sort: { points: -1 } },
    });

    const stories = user.bookmarks.map((s) => ({ ...s.toObject(), isBookmarked: true }));

    res.status(200).json({ success: true, data: stories });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllStories, getStoryById, toggleBookmark, getBookmarkedStories };
