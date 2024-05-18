let OpenAI = require("openai")
const express = require('express');
const router = express.Router();
const pool = require('../database.js');
let dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.NODE_ENV_OPENAI_API_KEY});

async function main(userInput) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a doctor giving advice to his patient." },
            { role: "user", content: `${userInput}` },
        ],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
}

router.get('/logs', async (req,res) => {
    let userData

     await pool.query('SELECT * FROM logs').then((result) => {
         userData = result.rows
     }).catch((error) => {
         console.log('Error fetching logs:', error);
     });


    res.send(userData)
})

router.post('/message', async (req,res) => {
    const {text} = req.body  
    const openAiResponse = await main(text);

    await pool.query(`INSERT INTO logs(user_input, response) VALUES('${text}', '${openAiResponse}') RETURNING response`, )
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error creating new log:', error);
        });
})

module.exports = router