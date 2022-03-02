import React from "react"


const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
  setLibraryStatus
}) => {
  //handlers
  const SongSelectHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id)
    await setCurrentSong(selectedSong[0])
    //Add active State
    const newSongs = songs.map((song) => {
      if (song.id === id) {
          return {
              ...song,
              active: true,
          };
      } else {
        return {
          ...song,
          active: false,
        }
      }
    })
    setSongs(newSongs)
    //check if song is Playing
    if(isPlaying)audioRef.current.play();
    //fin
  }
  return (
    /***Library of Songs***/
    <div
      onClick={SongSelectHandler}
      className={`librarySong ${song.active ? "selected" : ""}`}
      onClick={SongSelectHandler}
    >
      {/***Song---COVER***/}
      <img
        alt={song.name}
        src={song.cover}
        onClick={() => setLibraryStatus(!libraryStatus)}
      ></img>
      {/***Song----Name***/}
      <h3 className="song-description">{song.name}</h3>
      {/***Artist--Name***/}
      <h4 className="song-description">{song.artist}</h4>
    </div>
  )
}

export default LibrarySong
