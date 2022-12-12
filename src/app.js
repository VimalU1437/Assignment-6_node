const express = require('express');
const app = express();


// Import routes
const blogRoute = require('./routes/blog');


//Router MIddlewares
app.use(express.json());

app.use('/blog', blogRoute); 

app.get("*",(req,res)=>{
    res.sendStatus(404);
})

module.exports = app;
