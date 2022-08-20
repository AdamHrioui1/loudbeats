require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const wrapedSendMail = require('./mail');
const app = express()
const path = require('path')

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body
    let date = new Date()

    let mailOption = {
        from: 'oneoneoneuser@gmail.com',
        to: 'oneoneoneuser@gmail.com',
        subject: 'LoudBeats Shop - Message',
        text: `This message from: ${name}\nEmail: ${email}\nMessage: ${message} \nThis message sent at: ${date}`
    }
    
    let emailMessage = await wrapedSendMail(mailOption)

    if (emailMessage) {
        console.log('Message sent successfuly!')
    }
    else {
        console.log('message doesn\'t sent!')
    }

    return res.json(emailMessage)
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`Server is listenning on port: http://localhost:${PORT}`))