import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const Heatmap = () => {
  const mapRef = useRef(null);
  const [hazards, setHazards] = useState([]);

  // Function to get marker color based on hazard severity
  const getHazardColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#ff0000'; // Red
      case 'medium':
        return '#ffa500'; // Orange
      case 'low':
        return '#ffff00'; // Yellow
      default:
        return '#ff0000';
    }
  };

  useEffect(() => {
    const map = tt.map({
      key: '2n9KzEpQ3UiJKj60AdvWM537TjzlNwbu',
      container: mapRef.current,
      center: [4.899, 52.372],
      zoom: 12,
    });

    // Simulate API call with severity levels
    const storedHazards = [
      { 
        id: 1, 
        lng: 4.895, 
        lat: 52.375, 
        description: 'Accident-prone zone', 
        severity: 'high'
      },
      { 
        id: 2, 
        lng: 4.890, 
        lat: 52.370, 
        description: 'Frequent flooding', 
        severity: 'medium'
      },
      { 
        id: 3, 
        lng: 4.885, 
        lat: 52.365, 
        description: 'Minor road damage', 
        severity: 'low'
      }
    ];

    setHazards(storedHazards);

    // Add custom markers with colors based on severity
    storedHazards.forEach(({ lng, lat, description, severity }) => {
      const element = document.createElement('div');
      element.className = 'custom-marker';
      element.style.backgroundColor = getHazardColor(severity);
      element.style.width = '20px';
      element.style.height = '20px';
      element.style.borderRadius = '50%';
      element.style.border = '2px solid white';

      new tt.Marker({element: element})
        .setLngLat([lng, lat])
        .setPopup(new tt.Popup().setHTML(
          `<div style="padding: 10px;">
            <b>${description}</b><br/>
            <span style="color: ${getHazardColor(severity)}">
              Severity: ${severity.toUpperCase()}
            </span>
          </div>`
        ))
        .addTo(map);
    });

    // Add click event for adding new hazard markers
map.on('click', (e) => {
    const { lngLat } = e;
    const severity = prompt('Enter hazard severity (high/medium/low):', 'medium');
    
    // Only proceed if user entered a valid severity
    const validSeverities = ['high', 'medium', 'low'];
    
    if (severity && validSeverities.includes(severity.toLowerCase())) {
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
    } else {
      // If invalid input or cancelled, don't add any marker
      console.log('Invalid severity level or cancelled operation');
    }
  });

    return () => map.remove();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Road Safety Heatmap</h1>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
      <div style={{ padding: '20px' }}>
        <h3>Legend:</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#ff0000', borderRadius: '50%', marginRight: '5px' }}></div>
            High Risk
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#ffa500', borderRadius: '50%', marginRight: '5px' }}></div>
            Medium Risk
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#ffff00', borderRadius: '50%', marginRight: '5px' }}></div>
            Low Risk
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
