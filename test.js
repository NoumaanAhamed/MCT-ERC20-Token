import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.post('/webhook', (req, res) => {
    console.log(req.body);
    res.send('OK');
}
);


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);

