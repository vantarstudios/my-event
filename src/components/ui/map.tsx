'use client';

import type { FunctionComponent, Ref } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { icon, type LatLngLiteral, type Marker as TMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css'

interface MapProps {
    value: string;
    position: LatLngLiteral;
    zoom: number;
    markerRef: Ref<TMarker>;
    markerHandlers: Record<string, () => void>;
    clickHandler?: FunctionComponent;
}

const Map: FunctionComponent<MapProps> = ({ value, position, zoom, markerRef, markerHandlers, clickHandler }) => {
    const MapClickHandler = clickHandler ?? (() => null);
    
    const MarkerIcon = icon({ iconUrl: '/images/marker-icon.png' });
    
    return typeof window !== 'undefined' && (
        <MapContainer
            center={position}
            zoom={zoom}
            fadeAnimation={true}
            className="w-full h-full rounded-2xl"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={position}
                icon={MarkerIcon}
                draggable={true}
                ref={markerRef}
                eventHandlers={markerHandlers}
            >
                <Popup>
                    {value ?? 'No address selected'}
                </Popup>
            </Marker>
            <MapClickHandler/>
        </MapContainer>
    )
};

export default Map;
