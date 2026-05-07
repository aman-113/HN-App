const { saveStories } = require('./scraper');

const triggerScrape = async (req, res, next) => {
  try {
    const result = await saveStories();
    res.status(200).json({
      success: true,
      message: `Scrape complete. Saved ${result.saved} stories.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { triggerScrape };
