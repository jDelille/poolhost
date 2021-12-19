const express = require('express')
const axios = require('axios')
const path = require('path')

const app = express()


// nfl news api:
// 'https://api.nflpickwatch.com/v1/nfl/news'


app.use(express.urlencoded({ extended: true }));








//ESPN API

app.get("/gamebar", async (req, res) => {
    const response = await axios.get('https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=football&league=nfl')
    const news = response.data;
    res.status(200).send(news)
})

app.get("/news", async (req, res) => {
    const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/news')
    const news = response.data;
    res.status(200).send(news)
})

app.get("/expert", async (req, res) => {
    const response = await axios.get('https://api.nflpickwatch.com/v1/nfl/picks/2021/11/su/experts/true/25/0')
    const news = response.data;
    res.status(200).send(news)
})


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
  

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Avengers... Assemble!'));