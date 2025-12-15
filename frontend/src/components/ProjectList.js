import React from 'react';
import { ReactComponent as EyeIcon } from '../icons/eye.svg';
import { ReactComponent as EditIcon } from '../icons/edit.svg';

export default function ProjectList({ projects, loading, error, onRefresh }) {
  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Projects</p>
          <h2>Project list</h2>
        </div>
        <span className="hint">
          {projects.length} project{projects.length === 1 ? '' : 's'} found
        </span>
      </div>

      <div className="table-toolbar">
        <div className="search-wrapper">
          <input
            className="search-input"
            placeholder="Search projects..."
          />
        </div>
        <div className="toolbar-actions">
          <button className="btn ghost small">Filter</button>
        </div>
      </div>

      <div className="table-scroll">
        <table className="projects-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Project ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="empty">
                  Loading projects…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="empty">
                  <div className="error-row">
                    <span>{error}</span>
                    {onRefresh && (
                      <button className="btn ghost small" onClick={onRefresh}>
                        Retry
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No projects yet. Create one to see it here.
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={project.id}>
                  <td className="muted">{index + 1}</td>
                  <td className="muted">{project.id.slice(0, 8)}</td>
                  <td>{project.name}</td>
                  <td className="muted description-cell">
                    {project.description || '—'}
                  </td>
                  <td>
                    <div className="actions-inline">
                      <button className="icon-button" title="View">
                        <EyeIcon />
                      </button>
                      <button className="icon-button" title="Edit">
                        <EditIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="records">
          <span className="hint">Records per page</span>
          <select className="records-select" defaultValue="10">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="pagination">
          <button className="btn ghost small" disabled>
            Previous
          </button>
          <button className="page-pill active">1</button>
          <button className="btn ghost small" disabled>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
