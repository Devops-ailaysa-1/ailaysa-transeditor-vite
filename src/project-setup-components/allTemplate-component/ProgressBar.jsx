import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ProgressBar = ({ progressValue = 0, progressBarLabel = "", progressBarStyle = {} }) => {
  const [animatedProgress, setAnimatedProgress] = useState(progressValue);
  const [progressLabel, setProgressLabel] = useState(progressBarLabel);

  useEffect(() => {
    if (progressValue > 0) {
      const animation = setInterval(() => {
        setAnimatedProgress((prev) => {
          const next = prev + (progressValue - prev) * 0.1;
          if (Math.abs(next - progressValue) < 0.5) {
            clearInterval(animation);
            return progressValue;
          }
          return next;
        });
      }, 30);

      return () => clearInterval(animation);
    } else {
      setAnimatedProgress(0);
    }
  }, [progressValue]);

  useEffect(() => {
    setProgressLabel(progressBarLabel);
  }, [progressBarLabel]);

  return (
    <Box sx={progressBarStyle}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {progressLabel}
      </Typography>
      <Box display="flex" alignItems="center">
        <LinearProgress
          variant={progressValue === 0 ? "indeterminate" : "determinate"}
          value={animatedProgress}
          sx={{
            width: "90%",
            height: 8,
            borderRadius: 5,
            backgroundColor: "#e3f2fd",
            transition: "all 0.3s ease-in-out",
          }}
        />
        <Typography variant="body2" sx={{ ml: 1, fontWeight: "bold" }}>
          {progressValue === 0 ? "" : `${Math.round(animatedProgress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
