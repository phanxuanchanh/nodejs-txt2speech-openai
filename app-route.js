import express from 'express';
import openai from './app.js';

const router = express.Router();

router.get('/', async (req, res) => { res.redirect('ui'); })

router.get('/ui', async (req, res) => {
    res.render('./app-view.hbs', { layout: false });
});

router.post('/txt2speech', async (req, res) => {
    try {
        let text = req.body.text;
        let voiceSelect = req.body['voice-select'];
    
        let mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voiceSelect,
            input: text,
          });
    
        let buffer = Buffer.from(await mp3.arrayBuffer());
    
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', buffer.length);
        res.status(200);
        res.end(buffer);
    } catch (err) {
        res.status(500).json({ errorMsg: 'ERR!' });
    }
});

export default router;