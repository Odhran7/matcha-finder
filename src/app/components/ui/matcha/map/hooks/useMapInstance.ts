import { useRef, useEffect } from 'react';

const useMapInstance = () => {
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map) {
      console.log('Map instance:', map);
    }
  }, [mapInstanceRef]);

  return mapInstanceRef;
};

export default useMapInstance;
