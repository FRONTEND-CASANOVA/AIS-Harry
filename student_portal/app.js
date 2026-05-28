import express from 'express'
import 'dotenv/config.js'

import studentRoutes from './routes/studentRoutes.js'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

try {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening to port ${process.env.PORT || 5000}...`)
  })
} catch (error) {
  console.log(error)
}

app.use('/students', studentRoutes)