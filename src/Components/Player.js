import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons"


//Props
const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  SongInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs
}) => {
  //EventHandler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        }
      } else {
        return {
          ...song,
          active: false,
        }
      }
    })
    setSongs(newSongs)
  }
  // Passed Time 
  const getTime = (time) => {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
  }
  // LeftTime
  const LeftTime = (SongInfo) => {
    const time = SongInfo.duration
    const left = time - SongInfo.currentTime
    return Math.floor(left / 60) + ":" + ("0" + Math.floor(left % 60)).slice(-2)
  }
  // DragHandler
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...SongInfo, currentTime: e.target.value })
  }
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (direction === "skipForward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }
    if (direction === "skipBack") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
          if(isPlaying)audioRef.current.play();
        return;
        }
     await setCurrentSong(songs[(currentIndex - 1) % songs.length])
    }
    if(isPlaying)audioRef.current.play();
  }
  //Styles
  const trackAnim = {
    transform: `translateX(${SongInfo.animationPercentage}%)`
  }


  return (
    /***Player***/
    <div className="Player">
      {/***timeControle***/}
      <div className="timeControle">
        <p>{getTime(SongInfo.currentTime)}</p>
          <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
          >
          <input
            min={0}
            max={SongInfo.duration || 0}
            value={SongInfo.currentTime}
            onChange={dragHandler}
            type="range"
          /> 
          <div style={trackAnim} className="animateTrack"></div>
        </div>
        <p>{SongInfo.duration ? LeftTime(SongInfo) : "0:00"}</p>
      </div>
      {/***PlayControle***/}
      <div className="playControle">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skipBack")}
          className="skipBack"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="Play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skipForward")}
          className="skipForward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  )
}

export default Player
