import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import User from './models/userModel';

config();

const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/user', require('./routes/userRoutes'));

app.get('/', (_req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../client' });
});

app.post('/register', async (req, res) => {
    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    res.json(createdUser);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => {
    console.log(err);
});
