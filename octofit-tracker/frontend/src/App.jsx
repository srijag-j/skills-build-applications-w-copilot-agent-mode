import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">
            Use <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for
            Codespaces API routing. If unset, the app falls back to
            <code>http://localhost:8000</code>.
          </p>
          <nav className="nav nav-pills gap-2 flex-wrap">
            <Link className="nav-link" to="/users">
              Users
            </Link>
            <Link className="nav-link" to="/teams">
              Teams
            </Link>
            <Link className="nav-link" to="/activities">
              Activities
            </Link>
            <Link className="nav-link" to="/workouts">
              Workouts
            </Link>
            <Link className="nav-link" to="/leaderboard">
              Leaderboard
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
