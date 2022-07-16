const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// users router
const userRouter = require('./db/routes/userRouter')
app.use('/api/users', userRouter)

//products router
const productsRouter = require('./db/routes/productRouter')
app.use('/api/products', productsRouter)

//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = 3000;

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})