const express = require('express');
const { createProject, listProjects, viewProject } = require('../controllers/projectController');

const router = express.Router();

router.post('/create', createProject);
router.get('/list', listProjects);
router.get('/list/:id', viewProject);

module.exports = router;

