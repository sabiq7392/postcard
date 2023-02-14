"use client";
import ServiceRecommendationController from "@/services/recommendation/controller.recommendation";
import "./globals.css"
import { Inter } from '@next/font/google'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import { useSearchParams } from "next/navigation";

// eslint-disable-next-line no-undef
type GoogleMapProps = google.maps.Map;
// eslint-disable-next-line no-undef
type GoogleMapLatLngLiteral = google.maps.LatLngLiteral;
// eslint-disable-next-line no-undef
type GoogleMapAutoComplete = google.maps.places.Autocomplete;

// eslint-disable-next-line no-undef
type GoogleMapPlaceResult = google.maps.places.PlaceResult;

const inter = Inter({ subsets: ['latin'] })

type Query = {
  query: string,
}

export default function Home() {
  const searchParams = useSearchParams();
  // searchParams.get("query") as string
  const recommendation = ServiceRecommendationController.useGetList({ query: { query: "restaurant" } });

  const [center, setCenter] = useState<GoogleMapLatLngLiteral>({
    lat: -6.208869746866656,
    lng: 106.84461723387074,
  });
  const [position, setPosition] = useState<GoogleMapLatLngLiteral>({     
    lat: -6.208869746866656,
    lng: 106.84461723387074,
  });
  
  const onLoad = useCallback((map: GoogleMapProps) => {
    const bounds = new window.google.maps.LatLngBounds(position);
    map.fitBounds(bounds);
    // setMap(map);
  }, [position]);

  const onChangePosition = ({ lat, lng }: GoogleMapLatLngLiteral) => {
    setPosition({ lat, lng });
  };

  console.log(recommendation)

  return (
    <main>
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY as string}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={{ lat: recommendation.data?.places[0].lat ?? 0, lng: recommendation.data?.places[0].long ?? 0 }}
          zoom={10}
          onLoad={onLoad}
          onClick={(e) => onChangePosition({ lat: e.latLng?.lat() as number, lng: e.latLng?.lng() as number })}
        >
          {/* <MarkerF position={position as GoogleMapLatLngLiteral} /> */}
          {recommendation.data?.places.map((place) => (
            <MarkerF key={place.placeId} position={{ lat: place.lat, lng: place.long }} />
          ))}
          {/* <Make */}
        </GoogleMap>
      </LoadScript>
    </main>
  )
}
