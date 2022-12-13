import React from 'react'
import { GoogleMap, Marker ,DirectionsRenderer} from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();
const containerStyle = {
  width: '100%',
  height: '100%',
  display:'flex'
};

const center = {
  lat: 49.246292,
  lng: -123.116226
};


function MainTrack() {
  /* global google */

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA" // ,
    // ...otherOptions
  })
  console.log(isLoaded,'isloaded')
  const [directionsResponse,setDirectionsResponse]=useState(null)
  const [distance,setDistance]=useState('')
  const [duration,setDuration]=useState('')

  const calculateRoute=async()=>{
    const directionsService= new google.maps.DirectionsService()
    const results=await directionsService.route({
       origin: { lat: 49.246292, lng:  -123.116226 },
      destination: { lat: 37.541290, lng: -77.434769},
      travelMode:google.maps.TravelMode.DRIVING
    })
    /* global google */
    //eslint-disable-next-line no-undef
    setDirectionsResponse(results)
    setDistance(results?.routes[0].legs[0].distance.text)
    setDuration(results?.routes[0].legs[0].duration.text)
    console.log('hey im working')
  }


useEffect(()=>{
  calculateRoute()
})
  return (
   
    <div>
    <div className='d-flex'>
    <h2>Distance:{distance}</h2>
    <h2>Duration:{duration}</h2>
    </div>
  
      <div style={{ width: '100%', height: '223px' }}>
      {isLoaded?
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          zoomControl:false,
          streetViewControl:false,
          mapTypeControl:false,
          fullscreenControl:false,
          

        }}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA&libraries=places"
        loadingElement={
            <div style={{ height: `100%` }} />
        }
        containerElement={
            <div style={{ height: '100%', width: '100%' }} />
        }
        mapElement={
            <div style={{ height: `100%` }} />
        }
      >
       <Marker position={center}/>
       {directionsResponse&&<DirectionsRenderer options={{
         polylineOptions:{
           strokeColor: "#ff2527",
           strokeOpacity: 2,
           strokeWeight: 2,
           geodesic:true,
         }
       }} directions={directionsResponse}/>}
      </GoogleMap>
      :'loading....!'}   
            </div>
   
      </div>
  )
}

export default MainTrack
