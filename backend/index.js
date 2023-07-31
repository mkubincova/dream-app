// initialize OpenAI api
import * as dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

const cofig = new Configuration({
    apiKey: process.env.OPEN_AI
});

const openai = new OpenAIApi(cofig);

// create new Express app
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024'
        });

        const image = aiResponse.data.data[0].url;
        res.send({ image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }

});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));