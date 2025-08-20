import { useState, useEffect } from 'react';
import carGif from '../../Assets/web/hero_section2.webp';

const VideoComponent = () => {
  const [gifSrc, setGifSrc] = useState(carGif);

  useEffect(() => {
    // Change src by appending timestamp to force reload on mount
    setGifSrc(`${carGif}?t=${Date.now()}`);
  }, []);

  return (
    <img
      src={gifSrc}
      className="md:w-[55rem] w-1/2"
      alt="Car animation"
    />
  );
};

export default VideoComponent;