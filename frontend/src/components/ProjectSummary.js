import React from 'react';

export default function ProjectSummary({ form, location }) {
  return (
    <div className="summary">
      <p className="eyebrow">Summary</p>
      <h3>{form.name || 'Untitled project'}</h3>
      <p className="muted">
        {form.description || 'Add a description to help teammates understand.'}
      </p>

      <div className="summary-grid">
        <div>
          <p className="label">Category</p>
          <p className="value">{form.category}</p>
        </div>
        <div>
          <p className="label">Reference ID</p>
          <p className="value">{form.referenceId || 'Not set'}</p>
        </div>
        <div>
          <p className="label">Start date</p>
          <p className="value">{form.startDate || 'TBD'}</p>
        </div>
      </div>

      <div className="summary-geom">
        <div className="summary-row">
          <p className="label">Geometry</p>
          <span className={`pill ${location ? '' : 'pill-muted'}`}>
            {location ? location.type : 'Pending'}
          </span>
        </div>
        <p className="muted">
          {location
            ? 'You can redraw before saving if you need to refine the area.'
            : 'Draw the boundary on the map to continue.'}
        </p>
      </div>
    </div>
  );
}


