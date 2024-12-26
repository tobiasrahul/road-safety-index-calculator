import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const Heatmap = () => {
  const mapRef = useRef(null);
  const [hazards, setHazards] = useState([]); // Simulating backend hazard data

  useEffect(() => {
    // Initialize the map
    const map = tt.map({
      key: '2n9KzEpQ3UiJKj60AdvWM537TjzlNwbu',
      container: mapRef.current,
      center: [4.899, 52.372],
      zoom: 12,
    });

    // Fetch existing hazard markers from the "backend"
    const fetchHazards = () => {
      // Simulate API call
      const storedHazards = [
        { id: 1, lng: 4.895, lat: 52.375, description: 'Accident-prone zone' },
        { id: 2, lng: 4.890, lat: 52.370, description: 'Frequent flooding' },
      ];
      setHazards(storedHazards);

      // Add markers for existing hazards
      storedHazards.forEach(({ lng, lat, description }) => {
        new tt.Marker()
          .setLngLat([lng, lat])
          .setPopup(new tt.Popup().setHTML(`<b>${description}</b>`))
          .addTo(map);
      });
    };

    fetchHazards();

    // Add click event for adding new hazard markers
    map.on('click', (e) => {
      const { lngLat } = e;
      const newHazard = {
        id: hazards.length + 1,
        lng: lngLat.lng,
        lat: lngLat.lat,
        description: 'User-reported hazard',
      };

      setHazards((prev) => [...prev, newHazard]); // Update state
      new tt.Marker()
        .setLngLat([lngLat.lng, lngLat.lat])
        .setPopup(new tt.Popup().setHTML(`<b>${newHazard.description}</b>`))
        .addTo(map);

      // Simulate saving to the backend
      console.log('Saving hazard to backend:', newHazard);
    });

    return () => map.remove(); // Clean up on unmount
  }, [hazards]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Road Safety Heatmap</h1>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default Heatmap;
