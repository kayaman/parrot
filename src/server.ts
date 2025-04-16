import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 9999

app.use(cors())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

app.all('*', (req: Request, res: Response) => {
  const logDetails = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    headers: req.headers,
    query: req.query,
    body: req.body,
    ip: req.ip,
  }

  console.log(JSON.stringify(logDetails, null, 2))

  res.status(200).json({
    message: 'Request logged successfully',
    received: logDetails,
  })
})

app.listen(port, () => {
  console.log(`Parrot 🦜 is running at port ${port}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  process.exit(0)
})
