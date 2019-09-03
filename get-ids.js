// This script gets IDs for the hashtag from a Twitter page
// and outputs them into a file.

const puppeteer = require('puppeteer');
const fs = require('file-system');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1000,
      height: 550
    }
  });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/hashtag/techwontbuildit?f=tweets&vertical=default');
  console.log('yes');
  const result = await page.evaluate(() => {
    const atPageBottom = () => {
      // The pixels we're scrolled down from the upper left corner
      const scrolled = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      const documentHeightMinusOneViewport =
      document.body.scrollHeight - Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      return Math.abs( documentHeightMinusOneViewport - scrolled ) < 3;
    }
    const scrollUntilAtPageBottom = () => {
      if (atPageBottom()) {
        return Promise.resolve(true);
      }
      window.scrollTo(0, document.body.scrollHeight);
      return (new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 2000)
      }))
        .then(scrollUntilAtPageBottom);
    }
    return scrollUntilAtPageBottom();
  });
  const ids = await page.evaluate(() => {
    const elements = document.querySelectorAll('[data-item-id]');
    let ids = [];
    for (element of elements) {
      ids.push(element.getAttribute('data-item-id'));
    }
    return ids;
  });
  fs.writeFile(
    'tweet-ids.json',
    JSON.stringify(ids, null, 2),
    async function(err) {
      await browser.close();
    }
  );
})();
