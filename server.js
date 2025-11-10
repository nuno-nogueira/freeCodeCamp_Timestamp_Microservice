const express = require('express');
const app = express();
app.use(express.json());

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {  
    res.send('Hello Express')
})

app.get('/api/:date', (req, res) => {
    let { date } = req.params;
    let d = "";

    if (!date.includes("-")) {
        date = parseInt(date);
    }

    d = new Date(date);
    d = d.toUTCString();
    console.log(d)

    if (d === null) {
        res.json({error: "Invalid Date"})
    }  else if (!date) {
        res.json({unix: new Date(), utc: new Date().getMilliseconds})
    }
    res.json({echo: d});
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

