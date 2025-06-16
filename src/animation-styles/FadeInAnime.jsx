import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function FadeInAnime ({ children }) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        className="fade-in"
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeInOut"}}
        variants={{
          visible: { opacity: 1},
          hidden: { opacity: 0}
        }}
      >
        {children}
      </motion.div>
    );
  }

  export default FadeInAnime;