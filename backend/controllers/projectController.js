const { Project, sequelize } = require('../models');
const { esriToGeoJSON } = require('../utils/geometry');

// Create project (persists to Postgres/PostGIS)
async function createProject(req, res) {
  const { name, description, category, referenceId, startDate, location } = req.body;
  console.log('req.body', req.body);

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Project name is required' });
  }

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const geojson = esriToGeoJSON(location);

    const project = await Project.create({
      name: name.trim(),
      description: description || '',
      category: category || 'uncategorized',
      referenceId: referenceId || '',
      startDate: startDate || null,
      locationRaw: location,
      geom: geojson
        ? sequelize.fn(
            'ST_SetSRID',
            sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(geojson)),
            4326
          )
        : null
    });

    return res.status(201).json({ project });
  } catch (err) {
    console.error('Project create error', err);
    return res.status(500).json({ error: 'Failed to create project' });
  }
}

// List project (persists to Postgres/PostGIS)
async function listProjects(req, res) {
  try {
    // const geojson = esriToGeoJSON(location);
    const projectList = await Project.findAll();

    return res.status(201).json({ projectList });
  } catch (err) {
    console.error('Project create error', err);
    return res.status(500).json({ error: 'Failed to create project' });
  }
}

// List project (persists to Postgres/PostGIS)
async function viewProject(req, res) {
  try {
    const { id } = req.params;
    // const geojson = esriToGeoJSON(location);
    const project = await Project.findOne({ where: { id } });

    return res.status(201).json({ project });
  } catch (err) {
    console.error('Project create error', err);
    return res.status(500).json({ error: 'Failed to create project' });
  }
}

module.exports = {
  createProject,
  listProjects,
  viewProject
};

