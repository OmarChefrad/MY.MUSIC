import React from "react"
import LibrarySong from "./LibrarySong"

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
  setLibraryStatus
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      {/***DropBurger***/}
      <div className="librarySongs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            song={song}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
            id={song.id}
            key={song.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
