import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ProgressBar = ({ progressValue= 0, progressBarLabel = "", progressBarStyle = {} }) => {
  const [progress, setProgress] = useState(progressValue);
  const [progressLabel, setProgressLabel] = useState(progressBarLabel);

  useEffect(() => {
    setProgress(progressValue); 
  }, [progressValue]); 

  useEffect(() => {
    setProgressLabel(progressBarLabel)
  }, [progressBarLabel]);

  return (
    <Box sx={progressBarStyle}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {progressLabel}
      </Typography>
      <Box display="flex" alignItems="center">
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ width: "90%", height: 8, borderRadius: 5, backgroundColor: "#e3f2fd" }}
        />
        <Typography variant="body2" sx={{ ml: 1, fontWeight: "bold" }}>
          {progress}%
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
