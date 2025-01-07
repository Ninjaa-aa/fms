"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Asset } from "@/data/data";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface MapComponentProps {
  assets: Asset[];
  selectedAsset: Asset | null;
  onAssetSelect: (asset: Asset) => void;
}

const MapComponent = ({ assets, selectedAsset, onAssetSelect }: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token is required');
      return;
    }

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.4194, 37.7749], // San Francisco coordinates
      zoom: 12,
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

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

      // Create marker element
      const el = document.createElement('div');
      el.className = 'marker';

      // Style based on status
      const markerColor = (() => {
        switch (asset.status) {
          case 'active': return 'text-green-500';
          case 'idle': return 'text-yellow-500';
          case 'warning': return 'text-yellow-500';
          case 'critical': return 'text-black';
          default: return 'text-gray-300';
        }
      })();

      el.innerHTML = `
        <div class="relative">
          <div class="absolute -translate-x-1/2 -translate-y-1/2">
            <div class="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              ${asset.title}
            </div>
          </div>
        </div>
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([asset.location.lng, asset.location.lat])
        .addTo(mapRef.current!);

      el.addEventListener('click', () => onAssetSelect(asset));
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
    <div className="h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};

export default MapComponent;