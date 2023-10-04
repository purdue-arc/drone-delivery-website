import { Head, Title, Meta, Link, Body, Scripts } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

import { Component, createSignal } from 'solid-js';
import { MapPin, Compass, Battery, Speedometer } from 'solid-icons/fa';
import LocationOnIcon from '@suid/icons-material/LocationOn';

const DroneStatus: Component = () => {
  const [title, setTitle] = createSignal('Drone 1');
  const [location, setLocation] = createSignal('40.425651, -86.918249');
  const [direction, setDirection] = createSignal('30 degree North');
  const [speed, setSpeed] = createSignal('20mph');
  const [battery, setBattery] = createSignal('90%');

  return (
    <div>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>{title()}</h1>
      <p>
        <MapPin style={{ marginRight: '0.5em' }} />
        {location()}
      </p>
      <p>
        <Compass style={{ marginRight: '0.5em' }} />
        {direction()}
      </p>
      <p>
        <Speedometer style={{ marginRight: '0.5em' }} />
        {speed()}
      </p>
      <p>
        <Battery style={{ marginRight: '0.5em' }} />
        {battery()}
      </p>
    </div>
  );
};

export default DroneStatus;

// const DroneStatus = ( { title }) => {
//   return (
//     <Head>
//       <Title>{title} Drone Status </Title>
//     <Meta name = "description" content = {description} />
//     <Meta property = 'og:description' content={description} />
//     <Meta property = 'og:title' content = {'${title} - Drone Status'} />>
//     </Head>
//   )
// }



// export default function DroneStatus() {
//   return (
//     <main>
//       <Title>Drone Status</Title>
// //       <h1>Drone Status</h1>

// //           <h2>Location</h2>
// //           <p>Latitude: {droneLocation().latitude}</p>
// //           <p>Longitude: {droneLocation().longitude}</p>
// //           <h2>Direction</h2>
// //           <p>{droneDirection()} degrees North</p>
// //           <h2>Speed</h2>
// //           <p>{droneSpeed()} mph</p>
// //           <h2>Battery</h2>
// //           <p>{droneBattery()}%</p>
// //           <h2>Status</h2>
// //           <p>{droneStatus()}</p>
//       <h1></h1>
//       <p>
//         {/* body */}

//         Hi, this is Ryan. 

        
//       </p>
//     </main>
//   );
// }

// interface DroneStatusProps {
//   title: string;
//   latitude: number;
//   longitude: number;
//   direction: number;
//   speed: number;
//   battery: number;
// }


// import { Title } from "solid-start";
// import { HttpStatusCode } from "solid-start/server";
// import { FaMapMarkerAlt, FaCompass, FaTachometerAlt, FaBatteryFull } from 'react-icons/fa';

// interface DroneStatusProps {
//   title: string;
//   latitude: number;
//   longitude: number;
//   direction: number;
//   speed: number;
//   battery: number;
// }

// export default function DroneStatus({ title, latitude, longitude, direction, speed, battery }: DroneStatusProps) {
//   return (
//     <div>
//       <h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>{title}</h1>
//       <p>
//         <FaMapMarkerAlt /> {latitude}, {longitude}
//       </p>
//       <p>
//         <FaCompass /> {direction} degree North
//       </p>
//       <p>
//         <FaTachometerAlt /> {speed} mph
//       </p>
//       <p>
//         <FaBatteryFull /> {battery}%
//       </p>
//     </div>
//   );
// }


// import { createSignal } from 'solid-js';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { ModelViewer } from '@google/model-viewer';

// const DroneStatus = () => {
//   const [droneLocation, setDroneLocation] = createSignal({ latitude: 0, longitude: 0 });
//   const [droneDirection, setDroneDirection] = createSignal(0);
//   const [droneSpeed, setDroneSpeed] = createSignal(0);
//   const [droneBattery, setDroneBattery] = createSignal(0);
//   const [droneStatus, setDroneStatus] = createSignal('operational');
//   const [pickupLocation, setPickupLocation] = createSignal({ latitude: 0, longitude: 0 });
//   const [deliveryLocation, setDeliveryLocation] = createSignal({ latitude: 0, longitude: 0 });

//   return (
//     <div>
//       <h1>Drone Status</h1>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div>
//           <h2>Location</h2>
//           <p>Latitude: {droneLocation().latitude}</p>
//           <p>Longitude: {droneLocation().longitude}</p>
//           <h2>Direction</h2>
//           <p>{droneDirection()} degrees North</p>
//           <h2>Speed</h2>
//           <p>{droneSpeed()} mph</p>
//           <h2>Battery</h2>
//           <p>{droneBattery()}%</p>
//           <h2>Status</h2>
//           <p>{droneStatus()}</p>
//         </div>
//         <div>
//           <h2>Pickup Location</h2>
//           <MapContainer center={[pickupLocation().latitude, pickupLocation().longitude]} zoom={13} scrollWheelZoom={false} style={{ height: '200px', width: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <Marker position={[pickupLocation().latitude, pickupLocation().longitude]}>
//               <Popup>Pickup Location</Popup>
//             </Marker>
//           </MapContainer>
//           <h2>Delivery Location</h2>
//           <MapContainer center={[deliveryLocation().latitude, deliveryLocation().longitude]} zoom={13} scrollWheelZoom={false} style={{ height: '200px', width: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <Marker position={[deliveryLocation().latitude, deliveryLocation().longitude]}>
//               <Popup>Delivery Location</Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//         <div>
//           <ModelViewer src="drone.glb" alt="A 3D model of a drone" style={{ height: '400px', width: '100%' }}></ModelViewer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DroneStatus;
