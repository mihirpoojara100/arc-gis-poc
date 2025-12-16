import React, { useEffect, useRef } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';

function geoJSONToEsri(geom) {
  if (!geom || !geom.type) return null;
  const { type, coordinates } = geom;
  if (!coordinates) return null;

  const sr = { wkid: 3857 };

  if (type === 'Point') {
    return { type: 'point', x: coordinates[0], y: coordinates[1], spatialReference: sr };
  }

  if (type === 'MultiPoint') {
    return { type: 'multipoint', points: coordinates, spatialReference: sr };
  }

  if (type === 'LineString') {
    return { type: 'polyline', paths: [coordinates], spatialReference: sr };
  }

  if (type === 'MultiLineString') {
    return { type: 'polyline', paths: coordinates, spatialReference: sr };
  }

  if (type === 'Polygon') {
    return { type: 'polygon', rings: coordinates, spatialReference: sr };
  }

  if (type === 'MultiPolygon') {
    // Flatten multipolygon into a single polygon with multiple rings
    const rings = coordinates.flat();
    return { type: 'polygon', rings, spatialReference: sr };
  }

  return null;
}

function getSymbol(geometry) {
  if (!geometry || !geometry.type) return null;
  if (geometry.type === 'point') {
    return {
      type: 'simple-marker',
      color: '#2563eb',
      size: 10,
      outline: {
        color: '#ffffff',
        width: 1
      }
    };
  }
  if (geometry.type === 'polyline') {
    return {
      type: 'simple-line',
      color: '#2563eb',
      width: 2
    };
  }
  return {
    type: 'simple-fill',
    color: [37, 99, 235, 0.1],
    outline: {
      color: '#2563eb',
      width: 2
    }
  };
}

export default function ProjectMapView({ geometry, geojson }) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);
  const graphicsLayerRef = useRef(new GraphicsLayer());

  // initialize map/view once
  useEffect(() => {
    const map = new Map({
      basemap: 'streets-navigation-vector',
      layers: [graphicsLayerRef.current]
    });

    const view = new MapView({
      container: containerRef.current,
      map,
      center: [54.37, 24.45],
      zoom: 11
    });
    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  // update geometry
  useEffect(() => {
    if (!viewRef.current) return;
    graphicsLayerRef.current.removeAll();
    console.log("geojson", geojson);
    const esriGeom = geoJSONToEsri(geojson);

    if (!esriGeom || !esriGeom.type) return;

    const symbol = getSymbol(esriGeom);
    const graphic = new Graphic({
      geometry: esriGeom,
      symbol
    });
    graphicsLayerRef.current.add(graphic);

    viewRef.current.goTo(graphic, { animate: true }).catch(() => {});
  }, [geometry]);

  return <div ref={containerRef} className="map-container view-map" />;
}


