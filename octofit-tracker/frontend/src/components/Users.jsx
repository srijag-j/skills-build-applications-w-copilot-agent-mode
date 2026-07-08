import { useEffect, useState } from 'react'

const BASE_URL = getApiBaseUrl('users')

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

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((json) => setUsers(normalizeResponse(json)))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <p>
        This page depends on <code>VITE_CODESPACE_NAME</code>. Define it in
        <code>.env.local</code> if you need Codespaces URL support.
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <div className="list-group">
          {users.map((user, index) => (
            <div key={user.id ?? index} className="list-group-item">
              <strong>{user.name ?? user.username ?? `User ${index + 1}`}</strong>
              <div>{user.email ?? user.contact ?? 'No email provided'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
