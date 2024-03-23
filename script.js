const { chromium, page } = require('playwright');
const express = require('express');
const app = express();
const port = 8000;

app.listen(port,()=> {
console.log('listen port 8000');
}) 

app.get('/shadowban/:username', (req,res)=>{

    
    const accountStatus = async (username) => {
        const browser = await chromium.launch({ headless: false})
        const context = await browser.newContext()
        const page = await context.newPage();

        await page.goto(`https://www.reddit.com/user/${username}/`);

        if (await page.getByText('This account has been').isVisible()) {
          console.log(`${username} is banned!`);
          res.status(200).json(`Account is banned!`);
        } else {
          console.log(`${username} is NOT banned!`);
          res.status(200).json(`Account is NOT banned!`);
        }

        await browser.close();
    }

    const { username } = req.params;
    accountStatus(username);

})