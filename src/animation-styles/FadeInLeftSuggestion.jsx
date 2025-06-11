import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function FadeInLeft ({ children, props }) {
    return (
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 30 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
        className="term-edit-suggestion-part"
      >
        {children}
      </motion.div>
    );
  }

  export default FadeInLeft;