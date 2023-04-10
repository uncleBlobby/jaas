const express = require('express');
const app = express();
const port = 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./jokes.db');

let jokes = [];

db.all("SELECT * from deduped_jokes", (err, rows) => {
    if (err) {
        throw err;
    }
    
    rows.forEach((row) => {
        jokes.push(row);
        //console.log(row);
        //console.log(jokes);
    })
    
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.get('/joke', (req, res) => {
    let jokeNumber = Math.floor(Math.random() * jokes.length);
    console.log(`joke request received. Sending a random joke #${jokeNumber}...`)
    res.send("<H1>jaas - jokes as a service</H1><br>" + "<H3>" + jokes[jokeNumber].title + "</H3>" + "<br>" + jokes[jokeNumber].joke + "<br><br><a href='/joke'>Get another joke</a>");
    //res.json(jokes[jokeNumber]);
})

app.get('/jaas', (req, res) => {
    let jokeNumber = Math.floor(Math.random() * jokes.length);
    console.log(`joke request received. Sending a random joke #${jokeNumber}...`)
    res.send(
        `<H1>jaas - jokes as a service</H1>
        <H4>ticket #${jokeNumber}</H4>` + 
        "<H3>" + jokes[jokeNumber].title + "</H3>" + "<br>" + 
        jokes[jokeNumber].joke + "<br><br><a href='/joke'>Get another joke</a>");
    //res.json(jokes[jokeNumber]);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    //console.log(jokes);
})