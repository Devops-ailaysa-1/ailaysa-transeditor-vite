import { useState, useEffect } from "react";
import { deleteAudio } from "./HandleRecordingsList";
import generateKey from "./utils/GenerateKey";

export default function useRecordingsList({ audio, audioFile, tempBlob,audioData ,setAudioData }) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio)
    setAudioData((prevState) => {
        return [...prevState, { key: generateKey(), audio, audioFile, tempBlob}];
      });
  }, [audio]);
  

  return {
    audioData,
    deleteAudio: (audioKey) => deleteAudio(audioKey, setAudioData),
  };
}