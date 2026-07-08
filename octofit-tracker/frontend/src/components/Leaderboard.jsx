import { useEffect, useState } from 'react'

// Expected Codespaces API endpoint pattern:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
const BASE_URL = getApiBaseUrl('leaderboard')

function getApiBaseUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const baseHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  return `${baseHost}/api/${resource}`
}

function normalizeResponse(data) {
  if (Array.isArray(data)) return data
  if (data?.items) return data.items
  if (data?.data) return data.data
  return []
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((json) => setLeaderboard(normalizeResponse(json)))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <p>
        This page depends on <code>VITE_CODESPACE_NAME</code>. Define it in
        <code>.env.local</code> if you need Codespaces URL support.
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      {leaderboard.length === 0 ? (
        <div>No leaderboard entries found.</div>
      ) : (
        <div className="list-group">
          {leaderboard.map((item, index) => (
            <div key={item.id ?? index} className="list-group-item">
              <strong>{item.name ?? item.team ?? `Entry ${index + 1}`}</strong>
              <div>{item.points ?? item.score ?? 'No score available'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
