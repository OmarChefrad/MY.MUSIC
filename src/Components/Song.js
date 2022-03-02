import React from 'react';

const Song = ({ currentSong, libraryStatus, setLibraryStatus,isPlaying }) => {
   
  
  return (
    <div
      className="songContainer"
      className={`songContainer ${isPlaying ? "active-song" : ""}`}
    >
      <img
        alt={currentSong.name}
        src={currentSong.cover}
        onClick={() => setLibraryStatus(!libraryStatus)}
      ></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  ) 
};
 
export default Song; 