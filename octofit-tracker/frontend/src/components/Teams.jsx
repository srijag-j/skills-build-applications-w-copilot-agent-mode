import { useEffect, useState } from 'react'

const BASE_URL = getApiBaseUrl('teams')

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

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((json) => setTeams(normalizeResponse(json)))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <p>
        This page depends on <code>VITE_CODESPACE_NAME</code>. Define it in
        <code>.env.local</code> if you need Codespaces URL support.
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      {teams.length === 0 ? (
        <div>No teams found.</div>
      ) : (
        <div className="list-group">
          {teams.map((team, index) => (
            <div key={team.id ?? index} className="list-group-item">
              <strong>{team.name ?? `Team ${index + 1}`}</strong>
              <div>{team.description ?? 'No description available'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
