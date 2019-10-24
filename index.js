const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//SEARCH start
let search;
app.post("/search-post", (req, res) => {
    search = req.body.search;
    res.redirect("/search");
})

app.get("/search-get", (req, res) => {
    let url = 'https://newsapi.org/v2/top-headlines?' +
        'pageSize=45&' +
        `q=${search}&` +
        'country=us&' +
        'apiKey=7a241e177afe47b99d8bf0be5a610cb6';
    fetch(url)
        .then(res => res.json())
        .then(data => res.send(data))
})
//SEARCH end

if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})
