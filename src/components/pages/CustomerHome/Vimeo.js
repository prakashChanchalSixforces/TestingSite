import React from 'react'
import IframePlayer from "player-iframe-video";
import "player-iframe-video/dist/index.css"
function Vimeo(){
    const iFrame = <iframe width="1056px" height="854px"
        src="https://player.vimeo.com/video/736253057?h=d178710954&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameBorder="0"
        allow="fullscreen; picture-in-picture;"
        allowFullScreen
        title="test player iframe vimeo" />
return(
   <React.Fragment> <IframePlayer  id={"iframe-vimeo-player-test"} iFrame={iFrame} /></React.Fragment>
)
}
export default Vimeo
