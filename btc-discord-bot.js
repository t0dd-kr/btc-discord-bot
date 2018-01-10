const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'html')));
app.get('/', (req, res) => {
    res.send('HELLO WORLD');
});
app.listen(8080, () => {
    console.log('Express App on port 8080!');
});
