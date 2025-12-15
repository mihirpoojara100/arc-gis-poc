import React from 'react';

export default function ProjectDetailsForm({ value, errors, onChange }) {
  const handleChange = (key) => (event) => onChange(key, event.target.value);

  return (
    <div className="form-grid">
      <label className="field">
        <span className="label">
          Project name <span className="required">*</span>
        </span>
        <input
          value={value.name}
          onChange={handleChange('name')}
          placeholder="e.g. Al Maryah Island Marina"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label className="field">
        <span className="label">Category</span>
        <select value={value.category} onChange={handleChange('category')}>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="public-realm">Public realm</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="field">
        <span className="label">Reference ID</span>
        <input
          value={value.referenceId}
          onChange={handleChange('referenceId')}
          placeholder="Internal or client reference"
        />
      </label>

      <label className="field">
        <span className="label">Start date</span>
        <input
          type="date"
          value={value.startDate}
          onChange={handleChange('startDate')}
        />
      </label>

      <label className="field span-2">
        <span className="label">Description</span>
        <textarea
          rows={4}
          value={value.description}
          onChange={handleChange('description')}
          placeholder="What problem does this project solve? Who is it for?"
        />
      </label>
    </div>
  );
}


