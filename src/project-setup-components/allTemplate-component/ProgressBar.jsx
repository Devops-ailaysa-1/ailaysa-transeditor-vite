import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";

// Fade animation
const fade = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const ProgressBar = ({ progressValue = 0, progressMap, progressBarStyle = {} }) => {
  const [progress, setProgress] = useState(progressValue);
  const [progressLabel, setProgressLabel] = useState("Reading source content");
  const [dots, setDots] = useState("");

  // Interval for dots animation
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  // Smoothly increment/decrement progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === progressValue) {
          clearInterval(interval);
          return prevProgress;
        }
        const defaultInterval = 2;
        let nextProgress = prevProgress;

        if (prevProgress < progressValue) {
          nextProgress = Math.min(prevProgress + defaultInterval, progressValue);
        } else if (prevProgress > progressValue) {
          nextProgress = Math.max(prevProgress - defaultInterval, progressValue);
        }

        const match = progressMap.find(item =>
          nextProgress >= item.min && (
            nextProgress < item.max || (nextProgress === 100 && item.max === 100)
          ));
        setProgressLabel(match ? match.message : "");
        return nextProgress;
      });
    }, 50); // Adjust timing here for faster or slower animation

    return () => clearInterval(interval);
  }, [progressValue]);

  return (
    <Box sx={progressBarStyle}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "500",
          animation: `${fade} 1.5s ease-in-out infinite`,
          fontSize: '14px',
        }}
      >
        {progressLabel === "Finishing" || progressLabel === "Almost Finished"
          ? `${progressLabel}${dots}!`
          : `${progressLabel}${dots}`}
      </Typography>
      <Box display="flex" alignItems="center">
        <LinearProgress
          variant="determinate"
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
          {progress === 0 ? "" : `${progress}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
