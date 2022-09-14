import React from 'react';
import L from 'leaflet';
import {
    MapContainer, TileLayer, Marker, FeatureGroup, Polyline, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


export const Map = (props) => {
  const position = [20.5937, 78.9629]; // India position
  const customMarkerUserPos = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [15, 20],
    iconAnchor: [5, 20],
    popupAnchor: [2, -40]
  });
//For reference
//   const polyline = [
//     [13.0827, 80.2707],
//     [12.9716, 77.5946],
//     [19.076, 72.8777],
//   ]
//   const multiPolyline = [
//     [
//       [51.5, -0.1],
//       [51.5, -0.12],
//       [51.52, -0.12],
//     ],
//     [
//       [51.5, -0.05],
//       [51.5, -0.06],
//       [51.52, -0.06],
//     ],
//   ]
  console.log(props.polyline);
  return (
    <div className="map__container">
      <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          {props.polyline?.map((mark, i) => (
            <Marker key={i} position={mark} icon={customMarkerUserPos}>
              <Popup >
                Stop {mark[2]}
              </Popup>
            </Marker>
          ))}

          <Polyline pathOptions={{ color: '#' + Math.random().toString(16).substr(-6) }} positions={props.polyline} />
        </FeatureGroup>
    </MapContainer>,
    </div>
  );
};