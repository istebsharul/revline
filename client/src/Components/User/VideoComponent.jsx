import { useRef, useEffect } from 'react';

const VideoComponent = () => {
  const videoRef = useRef(null);

  // useEffect(() => {
  //   const video = videoRef.current;

  //   if (video) {
  //     const handleTimeUpdate = () => {
  //       if(video.currentTime >2.0){
  //         video.playbackRate = 1.0;
  //       }else{
  //         video.playbackRate = 4.0;
  //       }
  //     };

  //     video.addEventListener('timeupdate', handleTimeUpdate);

  //     return () => {
  //       video.removeEventListener('timeupdate', handleTimeUpdate);
  //     };
  //   }
  // }, []);

  return (
    <video
      ref={videoRef}
      src="https://res.cloudinary.com/dp3xz2kbh/video/upload/v1731679746/revlineautoparts/Assets/aebxtccemugiuuytk1ad.mp4"
      className="md:w-[35rem] w-1/2"
      autoPlay
      muted
      playsInline
    />
  );
};

export default VideoComponent;
