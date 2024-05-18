let OpenAI = require("openai")
const express = require('express');
const router = express.Router();
const pool = require('../database.js');
let dotenv = require("dotenv");
dotenv.config();


async function chatBotResponse(userInput) {
    let settings = await pool.query('SELECT value from settings where setting_id = 1').then((result) => {
        return result.rows[0].value
    })
    const openai = new OpenAI({ apiKey: settings });
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
    // The following is the code for handling the open ai key only if you have a paid subscription, 
    // I do not so I replace it with a hard coded text. 
     
    const openAiResponse = await chatBotResponse(text);
    await pool.query(`INSERT INTO logs(user_input, response) VALUES('${text}', '${openAiResponse} ') RETURNING response`, )
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error creating new log:', error);
        });



    // await pool.query(`INSERT INTO logs(user_input, response) VALUES('${text}', 'For headaches apply hot or cold 
    // compresses to your head or neck. Massage and small amounts of caffeine. Over-the-counter medications such as 
    // ibuprofen (Advil, Motrin IB, others), acetaminophen (Tylenol, others) and aspirin. 
    // ') RETURNING response`, )
    //     .then((result) => {
    //         res.send(result.rows);
    //     }).catch((error) => {
    //         console.log('Error creating new log:', error);
    //     });
})

module.exports = router