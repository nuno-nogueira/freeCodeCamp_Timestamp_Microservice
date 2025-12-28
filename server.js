const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.json());

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {  
    res.send('Hello Express')
})

// Route if there is no time in the URL (shows current time)
app.get('/api', (req, res) => {
    const now = new Date();
    res.json({
        unix: now.getTime(),
        utc: now.toUTCString()
    })
})

app.get('/api/:date', (req, res) => {
    let { date } = req.params;

    //if the url has only numbers
    if (/^\d+$/.test(date)) {
        date = parseInt(date);
    }

    let d = new Date(date);

    // check if the date is valid
    if (isNaN(d.getTime())) {
        return res.json({ error: "Invalid Date" });
    }

    res.json({
        unix: d.getTime(),
        utc: d.toUTCString()
    });
})

// if (!process.env.DISABLE_XORIGIN) {
//   app.use((req, res, next) => {
//     const allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
//     const origin = req.headers.origin || '*';
//     if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
//          console.log(origin);
//          res.setHeader('Access-Control-Allow-Origin', origin);
//          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     }
//     next();
//   });
// }

//Listen on port set in environment variable or default to 3000
app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}/`)
})

