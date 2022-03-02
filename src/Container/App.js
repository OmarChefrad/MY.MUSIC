import React, { useRef, useState } from "react"
//styles
import "../Styles/App.scss"
//components
import Player from "../Components/Player"
import Song from "../Components/Song"
import Library from "../Components/Library"
import Nav from "../Components/Nav"
//Data
import Data from "./Data"

function App() {
  //Refs
  const audioRef = useRef(null)
  // state
  const [songs, setSongs] = useState(Data())
  const [currentSong, setCurrentSong] = useState(songs[3])
  const [isPlaying, setIsPlaying] = useState(false)
  const [SongInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  //Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    //Calculate Percentage
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)

    setSongInfo({
      ...SongInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    })
  }
  //start NewSong after the end
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play()
  }
  //jsx
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song
        currentSong={currentSong}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        isPlaying={isPlaying}
      />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SongInfo={SongInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
      <footer className="App-Footer">
        MYM_PLAYER © Copyright CHEFRAD-OMAR 2022 . All rights reserved.
      </footer>
    </div>
  )
}

export default App
