import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function ZoomInAnime ({ children }) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ 
            duration: 0.4, 
            ease: "easeInOut",
          }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0.75}
        }}
      >
        {children}
      </motion.div>
    );
  }

  export default ZoomInAnime;