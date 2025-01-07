"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const MapComponent = ({ assets, selectedAsset, onAssetSelect }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token is required');
      return;
    }

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.4194, 37.7749], // San Francisco coordinates
      zoom: 12,
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add geolocate control
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.addControl(geolocateControl);

    // Clean up on unmount
    return () => map.remove();
  }, []);

  // Update markers when assets change
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers for each asset
    assets.forEach(asset => {
      if (!asset.location?.lat || !asset.location?.lng) return;

      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';

      // Create marker container
      const container = document.createElement('div');
      container.className = 'relative';

      // Create marker pin
      const pin = document.createElement('div');
      pin.className = 'w-4 h-4 rounded-full';
      
      // Set color based on status
      switch (asset.status) {
        case 'active':
          pin.className += ' bg-green-500';
          break;
        case 'warning':
          pin.className += ' bg-yellow-500';
          break;
        case 'critical':
          pin.className += ' bg-red-500';
          break;
        default:
          pin.className += ' bg-gray-500';
      }

      // Create asset name label
      const label = document.createElement('div');
      label.className = 'absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap';
      label.textContent = asset.title;

      // Assemble marker
      container.appendChild(pin);
      container.appendChild(label);
      markerElement.appendChild(container);

      // Create and add marker to map
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([asset.location.lng, asset.location.lat])
        .addTo(mapRef.current);

      // Add click handler
      markerElement.addEventListener('click', () => {
        onAssetSelect(asset);
      });

      // Store marker reference
      markersRef.current[asset.id] = marker;
    });
  }, [assets, onAssetSelect]);

  // Update map center when selected asset changes
  useEffect(() => {
    if (!mapRef.current || !selectedAsset?.location) return;

    mapRef.current.flyTo({
      center: [selectedAsset.location.lng, selectedAsset.location.lat],
      zoom: 14,
      duration: 1000,
    });
  }, [selectedAsset]);

  return (
    <>
      <div
        ref={mapContainerRef}
        className="w-full h-[600px] relative"
      />
      <style jsx global>{`
        .custom-marker {
          cursor: pointer;
        }
        .custom-marker:hover .bg-black {
          background-color: #1a1a1a;
        }
      `}</style>
    </>
  );
};

export default MapComponent;