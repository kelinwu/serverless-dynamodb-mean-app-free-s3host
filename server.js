const express = require('express')
const app = express();

app.use(express.static(__dirname + '/aws-site'));

app.get('/wordcloud', (req, res) =>{
    res.sendFile('./aws-site/index.html', {"root": __dirname});
})

app.listen(8088);
console.log("server listening on port 8088")