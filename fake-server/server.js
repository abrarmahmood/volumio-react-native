const express = require('express');
const morgan = require('morgan');
const service = require('./service');

const app = express();

app.use(morgan('dev'));

app.get('/search', async (req, res) => {
    try {
        const {term} = req.query;

        if (!term) {
            res.json({});
        }
        const result = await service.search(term);

        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

app.get('/browse', async (req, res) => {
    try {
        const {uri, prevUri} = req.query;

        if (!uri || !prevUri) {
            res.json({});
        }
        const result = await service.browse(uri, prevUri);

        res.set('max-age', '600');
        res.set('s-max-age', '600');
        res.json(result);
        console.log(JSON.stringify(result))
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

app.listen(8080, err => {
    if (err) throw err;

    console.log('server listening on port 8080');
});
