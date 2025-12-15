const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function createProject(payload) {
  const res = await fetch(`${API_URL}/projects/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to create project');
  }

  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/projects/list`, {
    method: 'GET'
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to load projects');
  }

  return res.json();
}

export { API_URL };

