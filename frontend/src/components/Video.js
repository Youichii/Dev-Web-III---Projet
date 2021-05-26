import React from 'react';
import VideoPlayer from 'react-video-js-player';
import intro from '../video/intro.mp4'


const Video =()=>{
    
        return(
            <div className="video">
                <VideoPlayer
                src={intro}
                width="500"
                height ="400"
                autoPlay="true"/>

            </div>
        );
    
};

export default Video;
