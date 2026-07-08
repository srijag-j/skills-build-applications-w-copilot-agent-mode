import { useEffect, useState } from 'react'

// Expected Codespaces API endpoint pattern:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
const BASE_URL = getApiBaseUrl('activities')

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

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((json) => setActivities(normalizeResponse(json)))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <p>
        This page depends on <code>VITE_CODESPACE_NAME</code>. Define it in
        <code>.env.local</code> if you need Codespaces URL support.
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      {activities.length === 0 ? (
        <div>No activities found.</div>
      ) : (
        <ul className="list-group">
          {activities.map((activity, index) => (
            <li key={activity.id ?? index} className="list-group-item">
              <strong>{activity.title ?? activity.description ?? `Activity ${index + 1}`}</strong>
              <div>{activity.date ?? activity.createdAt ?? 'No date provided'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
