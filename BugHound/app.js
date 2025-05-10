const express = require('express')
const { DbConnect } = require('./Config/db')
const BugRouter = require('./Routes/bugRoutes')
const UserRouter = require('./Routes/userRoutes')
const CommentRouter = require('./Routes/commentRoutes')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const cookieParser = require('cookie-parser')
//const rateLimit=require('express-rate-limit')
require('dotenv').config()
  
const app = express()
DbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser()) 
app.use(cors({origin : "https://bug-hound-88g7.vercel.app",credentials:true}))
app.use(morgan('dev')) 
app.use(compression())
/*const limit=rateLimit({
  windowMs:15*60*1000,
  max:10,
  message:"Too many requests, please try again later"
})
app.use(limit)*/
app.use('/uploads', express.static("uploads"))
app.use('/BugHound/bug', BugRouter)
app.use('/BugHound/user', UserRouter)
app.use('/BugHound/Comment', CommentRouter)

app.get('/test',(req,res)=>{
  res.json({message:"connected"})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
