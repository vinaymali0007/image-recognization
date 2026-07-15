const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function getHeaders(isFormData = false) {
  const headers = {}
  const token = localStorage.getItem('access_token');
  if (token) {
      headers['Authorization'] = `Bearer ${token}`
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(options.body instanceof FormData),
        ...options.headers,
      },
    })
    
    // For file downloads
    if (res.headers.get('content-type')?.includes('application/pdf')) {
      const blob = await res.blob()
      return { ok: res.ok, status: res.status, data: blob }
    }

    const data = await res.json().catch(() => ({}))
    return { ok: res.ok, status: res.status, data }
  } catch (err) {
    return { ok: false, status: 0, data: { message: err.message } }
  }
}

export async function checkHealth() {
  return request('/api/v1/health')
}

export async function login(email, password, role) {
  return request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role })
  })
}

export async function register(name, email, password, organization, role) {
  return request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, organization, role })
  })
}

export async function getMe() {
  return request('/api/v1/auth/me')
}

export async function predictImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  return request('/api/v1/predict/', {
    method: 'POST',
    body: formData,
  })
}

export async function getHistory() {
  return request('/api/v1/predict/history')
}

export async function downloadReport(id) {
  const res = await request(`/api/v1/report/download/${id}`)
  if (res.ok && res.data instanceof Blob) {
    const url = window.URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = `report_${id}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }
  return res
}
