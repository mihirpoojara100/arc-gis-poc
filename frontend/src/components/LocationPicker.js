import React, { useEffect, useRef } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

export default function LocationPicker({ onLocationSelected }) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);
  const graphicsLayerRef = useRef(new GraphicsLayer());

  useEffect(() => {
    const map = new Map({
      basemap: 'streets-navigation-vector',
      layers: [graphicsLayerRef.current]
    });

    const view = new MapView({
      container: containerRef.current,
      map,
      center: [54.37, 24.45], // Abu Dhabi default
      zoom: 11
    });
    viewRef.current = view;

    const sketch = new Sketch({
      view,
      layer: graphicsLayerRef.current,
      creationMode: 'single'
    });

    view.ui.add(sketch, 'top-right');

    sketch.on('create', (event) => {
      if (event.state === 'complete') {
        const geom = event.graphic.geometry.toJSON();
        onLocationSelected(geom);
      }
    });

    return () => {
      view.destroy();
    };
  }, [onLocationSelected]);

  return (
    <div className="map-shell">
      <div ref={containerRef} className="map-container" />
    </div>
  );
}
