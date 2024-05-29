"use client";
import PropTypes from "prop-types";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Card } from "@material-tailwind/react";

export default function MapCard({
  position,
}: {
  position: { lat: number; lng: number };
}) {
  const apiKey = import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_PUBLIC_MAP_ID;
  return (
    <APIProvider apiKey={apiKey}>
      <Card className="h-4/5">
        <Map
          defaultZoom={18}
          defaultCenter={position}
          mapId={mapId}
          gestureHandling={"auto"}
          zoomControl={true}
        >
          <AdvancedMarker position={position}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </Card>
    </APIProvider>
  );
}

MapCard.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};
