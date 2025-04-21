import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";

// Fade animation for the label
const fade = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const ProgressBar = ({ progressValue = 0, progressBarLabel = "", progressBarStyle = {} }) => {
  const [progress, setProgress] = useState(progressValue);
  const [progressLabel, setProgressLabel] = useState(progressBarLabel);
  const [dots, setDots] = useState("");

  useEffect(() => {
    setProgress(progressValue);
  }, [progressValue]);

  useEffect(() => {
    setProgressLabel(progressBarLabel);
  }, [progressBarLabel]);

  useEffect(() => {
    let dotInterval;
    if (progressValue === 0) {
      dotInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
    } else {
      setDots("");
    }

    return () => clearInterval(dotInterval);
  }, [progressValue]);

  return (
    <Box sx={progressBarStyle}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "500",
          animation: progressValue === 0 ? `${fade} 1.5s ease-in-out infinite` : "none",
          fontSize:'14px'
        }}
      >
        {progressValue === 0 ? `Reading source content${dots}` : progressLabel}
      </Typography>
      <Box display="flex" alignItems="center">
        <LinearProgress
          variant={'determinate'}
          value={progress}
          sx={{
            width: "90%",
            height: 8,
            borderRadius: 5,
            backgroundColor: "#e3f2fd",
            transition: "all 0.3s ease-in-out",
          }}
        />
        <Typography variant="body2" sx={{ ml: 1, fontWeight: "bold" }}>
          {progressValue === 0 ? "" : `${progress}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
