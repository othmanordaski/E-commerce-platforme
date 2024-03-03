const express = require('express');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

require('dotenv').config()

const authRouter = require('./routes/authRoutes');
const profileRouter= require('./routes/profileRoutes')

const app = express();

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL


app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log('connected to database');
}).catch(err=>{
    console.log('error connecting to database', err);
})

app.use('/api/auth',authRouter)
app.use('/api/profile',profileRouter)
// app.use('/api/products',productRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})