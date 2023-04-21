import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
        credentials: true,
}));
app.use(express.urlencoded({ extended: false }));

app.use('/user', require('./routes/userRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));

app.get('/', (_req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../client' });
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => {
    console.log(err);
});
