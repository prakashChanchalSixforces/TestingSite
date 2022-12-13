import React from 'react'
import { GoogleMap, Marker ,DirectionsRenderer,InfoWindow} from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import Geocode from "react-geocode";
import { blackMapStyle } from './mapStyles';
import Mark from '../../../assets/Mark.png'
import Mark1 from '../../../assets/Mark1.png'
import styled from 'styled-components';
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


function MainTrack(props) {
  /* global google */

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA" // ,
    // ...otherOptions
  })
  console.log(isLoaded,'isloaded')
  const [directionsResponse,setDirectionsResponse]=useState(null)
  const [distance,setDistance]=useState('')
  const [duration,setDuration]=useState('')

  const calculateRoute=async(from,to)=>{
    const directionsService= new google.maps.DirectionsService()
    const results=await directionsService.route({
       origin: from||{ lat: 26.846511, lng: 80.946683 },
      destination: to||{ lat: 26.862410, lng: 81.020348},
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
    calculateRoute(props?.fromAddres,props?.toAddres)
},[props?.fromAddres,props?.toAddres])


  return (
  
  <Main>
     
      {isLoaded?
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        defaultOptions={{
            styles: blackMapStyle
        }}
        options={{
          zoomControl:false,
          streetViewControl:false,
          mapTypeControl:false,
          fullscreenControl:false,
            styles: blackMapStyle
          

        }}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA&libraries=places"
        loadingElement={
            <div style={{ height: `100%` }} />
        }
        containerElement={
            <div style={{ height: '100%', width: '100%' }} />
        }
        mapElement={
            <div style={{ height: `100%`,width: '100%' }} />
        }
      >
       <Marker icon={{
           url:Mark,           
       }}  position={props?.fromAddres}/>
     
       <Marker icon={{
           url:Mark1,           
       }} position={props?.toAddres}/>
       {directionsResponse&&<DirectionsRenderer options={{
           suppressMarkers:true,
         polylineOptions:{
           strokeColor: "#D81159",
           strokeOpacity: 2,
           strokeWeight: 3,
           geodesic:true,
           
         }
       }} directions={directionsResponse}/>}
        {/* {props?.fromAddres? <Info
       
              //  onClose={onInfoWindowClose}
                position={{ lat: (props?.fromAddres?.lat||0 ), lng: props?.fromAddres?.lng||0+ 0.0005 }}
               options={{
                   pixelOffset: new google.maps.Size(0,-30)
               }}
              >
                <div style={{backgroundColor:'#D81159'}}>
                  <span style={{ padding: 0,height:20,color:'#fff' }}>{"Vancover"}</span>
                </div>
              </Info>:null} */}
      </GoogleMap>
      :'loading....!'}   
            </Main>
   
           
  )
}

export default MainTrack

const Main=styled.div`

width:80%;

padding:20px;
background-color:#fff;
@media (min-width: 260px) and (max-width: 1111px){
  width:100%;
  height:300px;
}
`

const Info=styled(InfoWindow)`
.gm-style .gm-style-iw-c{
    background-color:#D81159;
    background:#D81159;
}
`
