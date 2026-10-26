import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  location: { type: String, default: '' },
  type: { type: String, default: 'Internship' },
  status: { type: String, enum: ['Applied', 'Assessment', 'Interview', 'Offer', 'Rejected'], default: 'Applied' },
  date: { type: String, default: '' },
  color: { type: String, default: '#7565e8' }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema)

function formatJob(job) {
  return {
    id: job._id.toString(),
    company: job.company,
    role: job.role,
    location: job.location,
    type: job.type,
    status: job.status,
    date: job.date,
    color: job.color
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

app.get('/api/jobs', async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'Database is not connected. Add a valid MONGO_URI to .env.' })
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.json(jobs.map(formatJob))
  } catch {
    res.status(500).json({ message: 'Failed to fetch applications.' })
  }
})

app.post('/api/jobs', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'Database is not connected. Add a valid MONGO_URI to .env.' })
    const job = await Job.create({
      company: req.body.company,
      role: req.body.role,
      location: req.body.location || '',
      type: req.body.type || 'Internship',
      status: req.body.status || 'Applied',
      date: req.body.date || '',
      color: req.body.color || '#7565e8'
    })
    res.status(201).json(formatJob(job))
  } catch (error) {
    res.status(400).json({ message: error.message || 'Invalid application data.' })
  }
})

app.patch('/api/jobs/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'Database is not connected.' })
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!job) return res.status(404).json({ message: 'Application not found.' })
    res.json(formatJob(job))
  } catch (error) {
    res.status(400).json({ message: error.message || 'Could not update application.' })
  }
})

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'Database is not connected.' })
    const job = await Job.findByIdAndDelete(req.params.id)
    if (!job) return res.status(404).json({ message: 'Application not found.' })
    res.json({ message: 'Application deleted.' })
  } catch {
    res.status(400).json({ message: 'Could not delete application.' })
  }
})

app.listen(PORT, () => {
  console.log(`Smart Job Tracker API running on http://localhost:${PORT}`)
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is missing. Create a .env file with your MongoDB Atlas connection string.')
    return
  }
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection failed:', error.message))
})