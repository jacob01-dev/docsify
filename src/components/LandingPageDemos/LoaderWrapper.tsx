import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const loaderStyle = {
    width: "60px",
    aspectRatio: "1",
    background: `
      no-repeat linear-gradient(#fff 0 0) 0 0,
      no-repeat linear-gradient(#fff 0 0) 50% 50%,
      no-repeat linear-gradient(#fff 0 0) 100% 100%
    `,
  };

  const animation = {
    backgroundSize: [
      "20% 100%",
      "20% 20%",
      "100% 20%",
      "100% 100%",
      "100% 100%",
      "100% 100%",
      "20% 100%",
    ],
    rotate: [0, 0, 0, 0, 180, 360, 360],
    opacity: [1, 1, 1, 1, 1, 0, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.7, 0.9, 1],
    },
  };

  return <motion.div style={loaderStyle} animate={animation} />;
};

export default Loader;
