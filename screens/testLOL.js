const puppeteer = require("puppeteer");

async function getReview(params) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let plusStr = params.split(' ').join('+')
    await page.goto(`https://www.hungrygowhere.com/search-results/${plusStr}`)
    await page.click('a.close')
    await page.click('img.lazy')
    // await page.click('.truncate-30words > a.see-all')
    await page.screenshot({path: 'example.png'});
    let reviews = await page.evaluate(()=>
    Array.from(document.querySelectorAll('.truncate-30words > a.see-all')).map((partner) => partner.textContent)
    )
    console.log(reviews)
    await browser.close()

}

getReview('boon lay power lemak')