'use client';
import React, { useEffect } from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import nftData from '@/components/assets.json';

const Try = () => {
  useEffect(() => {
    console.log("NFT Data:", nftData); // Debug log
  }, []);

  return (
    <div className="bg-zinc-950 min-h-screen">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Nav />
        <Hero />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <SiSpacex className="text-3xl mix-blend-difference" />
      <button className="flex items-center gap-1 text-xs text-zinc-400">
        <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  // Group NFTs into pairs
  const nftPairs = [];
  for (let i = 0; i < nftData.nfts.length; i += 2) {
    nftPairs.push(nftData.nfts.slice(i, i + 2));
  }

  return (
    <div className="relative min-h-screen">
      <div 
        style={{ height: `calc(${SECTION_HEIGHT * nftPairs.length}px)` }}
        className="relative w-full"
      >
        {nftPairs.map((pair, pairIndex) => (
          <NFTRow 
            key={pairIndex}
            nfts={pair}
            index={pairIndex}
            totalPairs={nftPairs.length}
          />
        ))}
      </div>
    </div>
  );
};

const NFTRow = ({ nfts, index, totalPairs }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate opacity based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      className="nft-row"
      style={{
        opacity,
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: totalPairs - index // Higher sections appear on top
      }}
    >
      <div className="nft-row-container">
        {nfts.map((nft, i) => (
          <motion.div 
            key={i} 
            className="nft-image-container"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              delay: i * 0.2 // Stagger effect for each NFT in the pair
            }}
          >
            <motion.img
              src={nft.image}
              alt={nft.name}
              className="nft-image"
              style={{
                scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]),
                willChange: 'transform'
              }}
              loading="eager"
            />
            
            <div className="nft-info-overlay">
              <h2 className="nft-title">{nft.name}</h2>
              <div className="nft-stats">
                <span className="nft-floor">Floor: {nft.floor} SOL</span>
                <span className={`nft-change ${nft.floorChange > 0 ? 'positive' : 'negative'}`}>
                  {nft.floorChange > 0 ? '▲' : '▼'} {Math.abs(nft.floorChange)}%
                </span>
              </div>
              <p className="nft-volume">Volume: {nft.volume}</p>
              <div className="nft-listed">
                Listed: {nft.listed?.current} / {nft.listed?.total}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Try;