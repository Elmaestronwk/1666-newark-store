const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Catch console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    console.log('Navigating to http://localhost:5174/');
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2' });

    console.log('Page loaded. Simulating click on ACCESS_DATABASE button...');
    
    // Wait for the button
    const btnXPath = "//button[contains(text(), 'ACCESS_DATABASE')]";
    await page.waitForSelector("xpath/" + btnXPath);
    
    // Click it
    const elements = await page.$x(btnXPath);
    await elements[0].click();
    
    console.log('Click triggered. Waiting a bit to see output...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await browser.close();
    console.log('Test complete.');
  } catch (err) {
    console.error('Puppeteer error:', err);
  }
})();
