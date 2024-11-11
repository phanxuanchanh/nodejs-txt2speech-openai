import path from "path";
import { fileURLToPath } from 'url';
import OpenAI from "openai";
import dotenv from 'dotenv';
import express from 'express';
import { engine } from 'express-handlebars';
import appRoute from './app-route.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('/', path.join(__dirname, 'views'));


app.use('/', appRoute);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

export default openai;