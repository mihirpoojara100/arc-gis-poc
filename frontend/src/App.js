import { useMemo, useState, useEffect, useCallback } from 'react';
import { createProject, fetchProjects, fetchProject } from './utils/api';
import LocationPicker from './components/LocationPicker';
import ProjectMapView from './components/ProjectMapView';
import ProjectDetailsForm from './components/ProjectDetailsForm';
import ProjectList from './components/ProjectList';
import './App.css';

export default function ProjectCMS() {
  const [activePage, setActivePage] = useState('projects'); // 'dashboard' | 'projects'
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'residential',
    referenceId: '',
    startDate: ''
  });
  const [location, setLocation] = useState(null);
  const [projects, setProjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [listError, setListError] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [viewing, setViewing] = useState(false);
  const [viewError, setViewError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const errors = useMemo(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Project name is required';
    if (!location) errs.location = 'Choose a location on the map';
    return errs;
  }, [form.name, location]);

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const loadProjects = useCallback(async () => {
    setLoadingProjects(true);
    setListError(null);
    try {
      const result = await fetchProjects();
      setProjects(result.projectList || []);
    } catch (err) {
      setListError(err.message || 'Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleViewProject = async (id) => {
    setViewing(true);
    setViewError(null);
    setSelectedProject(null);
    try {
      const result = await fetchProject(id);
      setSelectedProject(result.project || null);
    } catch (err) {
      setViewError(err.message || 'Failed to load project');
    } finally {
      setViewing(false);
    }
  };

  const submitProject = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const result = await createProject({
        ...form,
        location
      });

      setProjects((prev) => [result.project, ...prev]);
      setMessage('Project created successfully');
      setShowCreate(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const canSubmit = Object.keys(errors).length === 0 && !saving;

  const renderProjects = () => {
    return (
      <>
        <div className="projects-header">
          <div>
            <p className="eyebrow">Projects</p>
            <h1>Projects</h1>
          </div>
          <button
            className="btn primary"
            onClick={() => setShowCreate(true)}
          >
            Create project
          </button>
        </div>

        <ProjectList
          projects={projects}
          loading={loadingProjects}
          error={listError}
          onRefresh={loadProjects}
          onView={handleViewProject}
        />

        {showCreate && (
          <div className="form-overlay">
            <div className="form-panel card">
              <div className="form-panel-header">
                <div>
                  <p className="eyebrow">New project</p>
                  <h2>Create project</h2>
                  <p className="lede">
                    Capture project details and draw the site boundary.
                  </p>
                </div>
                <button
                  className="btn ghost small"
                  onClick={() => setShowCreate(false)}
                >
                  Close
                </button>
              </div>

              <div className="grid">
                <section className="card span-2 inset-card">
                  <div className="section-header">
                    <div>
                      <p className="eyebrow">Step 1</p>
                      <h2>Project details</h2>
                    </div>
                    <span className="hint">Tell us what you&apos;re building</span>
                  </div>
                  <ProjectDetailsForm
                    value={form}
                    errors={errors}
                    onChange={handleFormChange}
                  />
                </section>

                <section className="card span-3 inset-card">
                  <div className="section-header">
                    <div>
                      <p className="eyebrow">Step 2</p>
                      <h2>Draw project area</h2>
                    </div>
                    <span className="hint">
                      Use the sketch tools to draw a point, line, or polygon
                    </span>
                  </div>

                  <LocationPicker onLocationSelected={setLocation} />

                  <div className="map-footer">
                    {errors.location ? (
                      <span className="error">{errors.location}</span>
                    ) : (
                      <span className="hint">
                        Tip: select the shape tool first, then click to draw.
                      </span>
                    )}
                    {location && (
                      <div className="geom-pill">
                        <div className="dot" />
                        <span>{location.type || 'Geometry selected'}</span>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <footer className="page-footer">
                <div className="footer-messages">
                  {message && <span className="success">{message}</span>}
                  {error && <span className="error">{error}</span>}
                </div>
                <div className="actions">
                  <button
                    className="btn ghost"
                    onClick={() => setShowCreate(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn primary"
                    disabled={!canSubmit}
                    onClick={submitProject}
                  >
                    {saving ? 'Saving…' : 'Create project'}
                  </button>
                </div>
              </footer>
            </div>
          </div>
        )}

        {selectedProject && (
          <div className="form-overlay">
            <div className="form-panel card">
              <div className="form-panel-header">
                <div>
                  <p className="eyebrow">Project</p>
                  <h2>{selectedProject.name}</h2>
                  <p className="lede">ID: {selectedProject.id}</p>
                </div>
                <button
                  className="btn ghost small"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>
              <div className="project-details">
                <div>
                  <p className="eyebrow">Description</p>
                  <p>{selectedProject.description || '—'}</p>
                </div>
                <div className="detail-grid">
                  <div>
                    <p className="eyebrow">Category</p>
                    <p>{selectedProject.category || '—'}</p>
                  </div>
                  <div>
                    <p className="eyebrow">Reference ID</p>
                    <p>{selectedProject.referenceId || '—'}</p>
                  </div>
                  <div>
                    <p className="eyebrow">Start date</p>
                    <p>{selectedProject.startDate || '—'}</p>
                  </div>
                </div>
                <div className="view-map-shell">
                  <p className="eyebrow">Location</p>
                  <ProjectMapView
                    geometry={selectedProject.locationRaw}
                    geojson={selectedProject.geom}
                  />
                </div>
              </div>
              <footer className="page-footer">
                <div className="footer-messages">
                  {viewError && <span className="error">{viewError}</span>}
                </div>
                <div className="actions">
                  <button
                    className="btn ghost"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </button>
                  <button className="btn primary" disabled>
                    {viewing ? 'Loading…' : 'Edit (coming soon)'}
                  </button>
                </div>
              </footer>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderContent = () => {
    if (activePage === 'dashboard') {
      return (
        <div className="dashboard-empty card">
          <p className="eyebrow">Dashboard</p>
          <h2>Coming soon</h2>
          <p className="lede">
            This space will show high-level metrics and recent activity across
            your projects.
          </p>
        </div>
      );
    }

    return renderProjects();
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-logo">Learning ArcGIS</div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-item ${activePage === 'projects' ? 'active' : ''}`}
            onClick={() => setActivePage('projects')}
          >
            Projects
          </button>
        </nav>
      </aside>
      <main className="main">
        <div className="page">{renderContent()}</div>
      </main>
    </div>
  );
}
