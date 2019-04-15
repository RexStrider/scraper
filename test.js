const axios = require("axios");
const cheerio = require("cheerio");

axios.get('https://www.nytimes.com/section/us')
.then(function (response) {
    const $ = cheerio.load(response.data);
    let elements = $(`#stream-panel > div > ol > li`);
    for (i=1; i<=elements.length; i++) {
        let text = $(`#stream-panel ol > li:nth-child(${i}) h2`).text();
        console.log(`${i}. ${text}`);
        let href = $(`#stream-panel ol > li:nth-child(${i}) a`).attr("href");
        console.log(`    ${href}`);
        text = $(`#stream-panel ol > li:nth-child(${i}) p`).text();
        console.log(`${text}`);
        console.log();
    }
})
.catch(function (error) {
    console.log(error);
});