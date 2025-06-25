import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function FadeInUp ({ children }) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeInOut"}}
        variants={{
          visible: {y: 0, opacity: 1},
          hidden: {y: 10, opacity: 0}
        }}
        exit={{ y: -10, opacity: 0 }}>
        {children}
      </motion.div>
    );
  }

  export default FadeInUp;