import React, {useState, useRef, useMemo, useCallback} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function DraggableMarker() {
    const center = {
      lat: 33.8938,
      lng: 35.5018,
    };
    const [Loc, setLoc] = useState([])
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
        dragend(e) {
            const marker = markerRef.current;
            if (marker != null) {
            setPosition(marker.getLatLng());
            let pos = e.target.getLatLng()
            setLoc(pos)
            }
        },
        }),
        []
    );
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
    }, []);


    return (
        <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        >
        <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
            {draggable
                ? "Marker is draggable"
                : "Click here to make marker draggable"}
            </span>
        </Popup>
        </Marker>
    );
}