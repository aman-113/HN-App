const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const HN_URL = 'https://news.ycombinator.com';

const scrapeHackerNews = async () => {
  console.log('Starting HackerNews scrape...');

  const { data } = await axios.get(HN_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    timeout: 10000,
  });

  const $ = cheerio.load(data);
  const stories = [];

  const titleRows = $('.athing').slice(0, 10);

  titleRows.each((index, element) => {
    const titleRow = $(element);
    const subRow = titleRow.next('tr');

    const hnId = titleRow.attr('id');
    const rank = parseInt(titleRow.find('.rank').text().replace('.', ''), 10) || index + 1;

    const titleLink = titleRow.find('.titleline > a').first();
    const title = titleLink.text().trim();
    let url = titleLink.attr('href') || '';

    if (url.startsWith('item?id=')) {
      url = `${HN_URL}/${url}`;
    }

    const subText = subRow.find('.subtext');
    const pointsText = subText.find('.score').text().replace(' points', '').replace(' point', '').trim();
    const points = parseInt(pointsText, 10) || 0;

    const author = subText.find('.hnuser').text().trim();

    const ageElement = subText.find('.age');
    const postedAt = ageElement.attr('title') || ageElement.text().trim() || '';

    if (title) {
      stories.push({ hnId, rank, title, url, points, author, postedAt });
    }
  });

  console.log(`Scraped ${stories.length} stories`);
  return stories;
};

const saveStories = async () => {
  const stories = await scrapeHackerNews();

  const results = await Promise.allSettled(
    stories.map((story) =>
      Story.findOneAndUpdate(
        { hnId: story.hnId },
        story,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    )
  );

  const saved = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  console.log(`Saved: ${saved}, Failed: ${failed}`);
  return { saved, failed, total: stories.length, stories };
};

module.exports = { scrapeHackerNews, saveStories };
