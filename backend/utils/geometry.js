// Convert minimal Esri geometry JSON to GeoJSON for storage
function esriToGeoJSON(esriGeom) {
  if (!esriGeom) return null;

  // Point
  if (typeof esriGeom.x === 'number' && typeof esriGeom.y === 'number') {
    return {
      type: 'Point',
      coordinates: [esriGeom.x, esriGeom.y]
    };
  }

  // Polyline
  if (Array.isArray(esriGeom.paths)) {
    return {
      type: 'LineString',
      coordinates: esriGeom.paths[0] || []
    };
  }

  // Polygon
  if (Array.isArray(esriGeom.rings)) {
    return {
      type: 'Polygon',
      coordinates: esriGeom.rings
    };
  }

  return null;
}

module.exports = {
  esriToGeoJSON
};

