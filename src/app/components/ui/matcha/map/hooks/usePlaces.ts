import { Place } from "@/types/Place";
import { useState, useEffect } from "react";

export const usePlaces = () => {
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
      const getPlaces = async () => {
        const res = await fetch('/api/place');
        const data = await res.json();
        setPlaces(data);
      };

      getPlaces();
    }, []);

    return places;
  };

