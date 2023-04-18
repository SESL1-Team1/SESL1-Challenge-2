import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const app = express();
const PORT = 5000;

app.get('/', (_req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../client' });
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => {
    console.log(err);
});
