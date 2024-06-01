const puppeteer = require('puppeteer');

const scanForLinks = (page) => {
  return page.evaluate(() => {
    const aWithBr = document.querySelectorAll('a:has(br)');
    const hrefs = [];

    for (const anchor of aWithBr) {
      if (anchor.hasAttribute('href')) {
        hrefs.push(anchor.getAttribute('href'));
      }
    }

    return hrefs;
  });
}

const run = async (searchBy) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log(`Starting to search by: ${searchBy.searchText}`);
  const url = `https://www.google.com/search?q=${searchBy.searchText}`;
  
  await page.goto(url, { waitUntil: 'networkidle2' });
  const hrefs = await scanForLinks(page);
    console.log(hrefs);
  

  await browser.close();
};


const searchFor = [
  { searchText: 'web development'},
  { searchText: 'javascript tutorials'},
  { searchText: 'nodejs tutorials' }
]


for (const searchBy of searchFor) {
  run(searchBy);
}