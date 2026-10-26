import React, { useEffect, useState } from 'react'
import {
  LayoutDashboard, BriefcaseBusiness, Plus, Search, Bell, MapPin,
  CalendarDays, Clock, CheckCircle2, TrendingUp, ChevronDown, MoreHorizontal,
  Filter, ArrowUpRight, Building2, Sparkles, X
} from 'lucide-react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || ''

const statuses = ['Applied', 'Assessment', 'Interview', 'Offer', 'Rejected']

export default function App() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All applications')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [form, setForm] = useState({
    company: '',
    role: '',
    location: '',
    status: 'Applied',
    type: 'Internship'
  })

  useEffect(() => {
    fetch(`${API_URL}/api/jobs`)
      .then(async response => {
        if (!response.ok) {
          throw new Error('Could not load applications.')
        }
        return response.json()
      })
      .then(data => {
        setJobs(data)
        setApiError('')
      })
      .catch(() => {
        setApiError('Could not connect to the database. Please try again later.')
      })
      .finally(() => setLoading(false))
  }, [])

  const visibleJobs = jobs.filter(job => {
    const text = `${job.company} ${job.role} ${job.location}`.toLowerCase()

    return (
      text.includes(search.toLowerCase()) &&
      (filter === 'All applications' || job.status === filter)
    )
  })

  const count = status => jobs.filter(job => job.status === status).length

  async function addJob(event) {
    event.preventDefault()

    if (!form.company.trim() || !form.role.trim()) return

    const date = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

    try {
      const response = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          date,
          color: '#7565e8'
        })
      })

      const savedJob = await response.json()

      if (!response.ok) {
        throw new Error(savedJob.message || 'Could not save application.')
      }

      setJobs(current => [savedJob, ...current])
      setApiError('')
      setForm({
        company: '',
        role: '',
        location: '',
        status: 'Applied',
        type: 'Internship'
      })
      setShowForm(false)
    } catch (error) {
      alert(error.message || 'Could not save application.')
    }
  }

  async function updateStatus(id, status) {
    try {
      const response = await fetch(`${API_URL}/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      const updatedJob = await response.json()

      if (!response.ok) {
        throw new Error(updatedJob.message || 'Could not update status.')
      }

      setJobs(current =>
        current.map(job => job.id === id ? updatedJob : job)
      )
    } catch (error) {
      alert(error.message || 'Could not update status.')
    }
  }

  async function deleteJob(id) {
    try {
      const response = await fetch(`${API_URL}/api/jobs/${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Could not delete application.')
      }

      setJobs(current => current.filter(item => item.id !== id))
    } catch (error) {
      alert(error.message || 'Could not delete application.')
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <BriefcaseBusiness size={21} />
          </div>
          <span>career<span className="brand-accent">ly.</span></span>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav>
          <a className="nav-item active" href="#dashboard">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a className="nav-item" href="#applications">
            <BriefcaseBusiness size={18} /> My Applications
            <span className="nav-count">{jobs.length}</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-sparkle">
              <Sparkles size={18} />
            </div>
            <h3>Your career, upgraded.</h3>
            <p>Keep every opportunity organised and never miss a follow-up.</p>
          </div>

          <div className="profile">
            <div className="avatar">P</div>
            <div className="profile-info">
              <strong>Priyadarshini Jaliparthi</strong>
              <span>Job seeker</span>
            </div>
            <MoreHorizontal size={20} />
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>Dashboard</strong>
          </div>
          <div className="top-actions">
            <span className="today-label">
              <CalendarDays size={15} /> October 2026
            </span>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} /> YOUR CAREER AT A GLANCE
            </div>
            <h1>Good things take <span>tracking.</span></h1>
            <p>
              Every application is a step closer to your next big opportunity.
            </p>
          </div>
          <button
            className="primary-button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} /> Add application
          </button>
        </section>

        {apiError && (
          <div
            style={{
              margin: '0 0 18px',
              padding: '12px 16px',
              borderRadius: 12,
              background: '#fff0f0',
              color: '#a32626'
            }}
          >
            {apiError}
          </div>
        )}

        {loading && (
          <div style={{ margin: '0 0 18px', color: '#6b7280' }}>
            Loading your applications…
          </div>
        )}

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-top">
              <span>Total applications</span>
              <div className="stat-icon purple">
                <BriefcaseBusiness size={18} />
              </div>
            </div>
            <div className="stat-number">{jobs.length}</div>
            <div className="stat-footer">
              <TrendingUp size={14} /> Your job search, in one place
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>In progress</span>
              <div className="stat-icon blue">
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-number">
              {jobs.filter(j =>
                ['Applied', 'Assessment', 'Interview'].includes(j.status)
              ).length}
            </div>
            <div className="stat-footer">Applications still active</div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Interviews</span>
              <div className="stat-icon orange">
                <CalendarDays size={18} />
              </div>
            </div>
            <div className="stat-number">{count('Interview')}</div>
            <div className="stat-footer">
              Time to show them what you can do
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Offers</span>
              <div className="stat-icon green">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="stat-number">{count('Offer')}</div>
            <div className="stat-footer">Big wins start somewhere</div>
          </div>
        </section>

        <section className="applications-section" id="applications">
          <div className="section-heading">
            <div>
              <h2>Your applications</h2>
              <p>Keep an eye on every opportunity.</p>
            </div>
            <button
              className="secondary-button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={16} /> New application
            </button>
          </div>

          <div className="table-toolbar">
            <div className="search-box">
              <Search size={17} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search companies or roles..."
              />
            </div>

            <div className="filter-box">
              <Filter size={16} />
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                {['All applications', ...statuses].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="job-list">
            <div className="job-list-header">
              <span>COMPANY & ROLE</span>
              <span>STATUS</span>
              <span>DATE APPLIED</span>
              <span>ACTIONS</span>
            </div>

            {visibleJobs.map(job => (
              <article className="job-row" key={job.id}>
                <div className="company-cell">
                  <div
                    className="company-logo"
                    style={{ '--company-color': job.color }}
                  >
                    {job.company.charAt(0)}
                  </div>
                  <div className="company-details">
                    <strong>{job.company}</strong>
                    <span>{job.role}</span>
                    <small>
                      <MapPin size={12} /> {job.location || 'Location not specified'} · {job.type}
                    </small>
                  </div>
                </div>

                <div>
                  <select
                    aria-label={`Status for ${job.company}`}
                    className={`status-select status-${job.status.toLowerCase()}`}
                    value={job.status}
                    onChange={e => updateStatus(job.id, e.target.value)}
                  >
                    {statuses.map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="date-cell">{job.date}</div>

                <div className="row-actions">
                  <button
                    className="icon-button delete-button"
                    title="Delete application"
                    aria-label={`Delete ${job.company} application`}
                    onClick={() => deleteJob(job.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </article>
            ))}

            {visibleJobs.length === 0 && !loading && (
              <div className="empty-state">
                <Building2 size={30} />
                <h3>No applications found</h3>
                <p>Try a different search or add your first application.</p>
                <button
                  className="primary-button"
                  onClick={() => setShowForm(true)}
                >
                  <Plus size={16} /> Add application
                </button>
              </div>
            )}
          </div>

          <div className="list-footer">
            Showing <strong>{visibleJobs.length}</strong> of{' '}
            <strong>{jobs.length}</strong> applications
            <span>
              Stay organised. Keep moving forward. <ArrowUpRight size={14} />
            </span>
          </div>
        </section>

        <footer className="page-footer">
          Made for the next step in your career <span>✳</span>
        </footer>
      </main>

      {showForm && (
        <div
          className="modal-backdrop"
          onClick={e =>
            e.target === e.currentTarget && setShowForm(false)
          }
        >
          <form className="job-modal" onSubmit={addJob}>
            <div className="modal-heading">
              <div>
                <div className="eyebrow">
                  <Sparkles size={13} /> NEW OPPORTUNITY
                </div>
                <h2>Add an application</h2>
                <p>Every great career starts with one step.</p>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X size={17} />
              </button>
            </div>

            <label>
              Company name *
              <input
                required
                placeholder="e.g. Google"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
              />
            </label>

            <label>
              Job title *
              <input
                required
                placeholder="e.g. Software Engineer Intern"
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
              />
            </label>

            <label>
              Location
              <input
                placeholder="e.g. Bangalore, India"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
              />
            </label>

            <div className="form-row">
              <label>
                Application type
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                >
                  <option>Internship</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </label>

              <label>
                Status
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  {statuses.map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="primary-button">
                <Plus size={16} /> Save application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}