import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import '../styles/home.css';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// Create a new component for animated stars
function AnimatedStars() {
  const starsRef = useRef();

  useFrame((state) => {
    // Move stars horizontally
    starsRef.current.rotation.x += 0.0001;
    starsRef.current.rotation.y += 0.0002;
    
    // Optional: Add some wave-like motion
    starsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    starsRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 2;
  });

  return (
    <Stars 
      ref={starsRef}
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1}
    />
  );
}

export default function Home() {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="hero-section"
    >
      <div className="relative z-10 flex flex-col items-center">

        <h1 className="hero-heading">
        The Next Generation Solana NFT Marketplace
        </h1>
        <p className="hero-description">
          Trade, mint, and discover exclusive NFTs and participate in exciting play-to-earn games on Solana
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="cta-button"
        >
          Start Now!
          <FiArrowRight className="arrow-icon" />
        </motion.button>
      </div>

      <div className="canvas-container">
        <Canvas>
          <AnimatedStars />
        </Canvas>
      </div>
    </motion.section>
  );
}
