'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import nftData from '@/components/assets.json';
import "../components/discover.js";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from 'next/router';
import PopupNotification from '../components/PopupNotification';
import Header from '../components/Header';

const WalletButton = dynamic(
    () => import('@/components/Wallet'),
    { ssr: false }
);

const NFTMarketplace = () => {
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Show popup when component mounts
        setShowPopup(true);
    }, []);

    // Chart patterns
    const chartPatterns = {
        downTrend: "M0 10 L30 15 L50 25 L70 20 L100 25",
        upTrend: "M0 20 L30 15 L50 5 L70 10 L100 5",
        volatile: "M0 15 L20 5 L40 25 L60 10 L80 20 L100 12",
        flat: "M0 15 L20 14 L40 16 L60 15 L80 15 L100 14",
        sharpDrop: "M0 5 L30 20 L60 10 L80 25 L100 20",
        steadyRise: "M0 25 L20 20 L40 15 L60 10 L100 5",
        wavyDown: "M0 10 L20 15 L40 5 L60 20 L80 15 L100 25",
        wavyUp: "M0 20 L20 15 L40 25 L60 10 L80 15 L100 5"
    };

    const isUpwardTrend = (pattern) => {
        return [
            chartPatterns.upTrend,
            chartPatterns.steadyRise,
            chartPatterns.wavyUp
        ].includes(pattern);
    };

    // Add click handler for chart NFTs
    const handleChartNFTClick = (nft) => {
        router.push('/nftcontent');
    };

    return (
        <div className="marketplace-container">
            {showPopup && (
                <PopupNotification onClose={() => setShowPopup(false)} />
            )}
            
            <div className="background-container">
                <img 
                    src="/NFT/snowy.gif" 
                    alt="background" 
                    className="background-video"
                />
            </div>

           <Header />

            {/* Scrolling NFT Display */}
            <ScrollingNFTDisplay />

            {/* NFT Rankings Table */}
            <div className="nft-section">
                <div className="nft-header">
                    <div className="header-left">
                        <h2 className="active-tab">Top Solana NFTs</h2>
                    </div>
                    <div className="header-right">
                        <div className="time-filters">
                            <button>10m</button>
                            <button>1h</button>
                            <button>6h</button>
                            <button className="active">1d</button>
                            <button>7d</button>
                            <button>30d</button>
                        </div>
                        <div className="currency-filters">
                        </div>
                    </div>
                </div>
                
                <table className="nft-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Collection</th>
                            <th>Floor ↑</th>
                            <th>Top Offer ↑</th>
                            <th>Floor 1d % ↑</th>
                            <th>Volume ↑</th>
                            <th>Sales ↑</th>
                            <th>Listed ↑</th>
                            <th>Last 1d</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nftData.nfts.map((nft, index) => (
                            <tr 
                                key={nft.id} 
                                onClick={() => handleChartNFTClick(nft)}
                                className="chart-row"
                            >
                                <td>
                                    <span className="star">☆</span>
                                    {index + 1}
                                </td>
                                <td className="collection-cell">
                                    <img src={nft.image} alt={nft.name} className="collection-img" />
                                    <span>{nft.name}</span>
                                </td>
                                <td>
                                    {nft.floor} <span className="sol">SOL</span>
                                </td>
                                <td>
                                    {nft.topOffer} <span className="sol">SOL</span>
                                </td>
                                <td className={nft.floorChange > 0 ? 'positive' : 'negative'}>
                                    <span className="change-value">
                                        {nft.floorChange > 0 ? '▲' : '▼'} {Math.abs(nft.floorChange)}%
                                    </span>
                                </td>
                                <td>
                                    {nft.volume} <span className="sol">SOL</span>
                                </td>
                                <td>{nft.sales}</td>
                                <td className="listed-cell">
                                    <span className="listed-percentage">{nft.listed.percentage}%</span>
                                    <span className="listed-ratio">
                                        {nft.listed.current.toLocaleString()} / {nft.listed.total.toLocaleString()}
                                    </span>
                                </td>
                                <td>
                                    <svg className="chart-placeholder" viewBox="0 0 100 30">
                                        {(() => {
                                            const pattern = 
                                                index === 0 ? chartPatterns.volatile :
                                                index === 1 ? chartPatterns.steadyRise :
                                                index === 2 ? chartPatterns.wavyDown :
                                                index === 3 ? chartPatterns.sharpDrop :
                                                index === 4 ? chartPatterns.upTrend :
                                                index === 5 ? chartPatterns.wavyUp :
                                                chartPatterns.flat;
                                            
                                            return (
                                                <path
                                                    className={isUpwardTrend(pattern) ? 'positive-chart' : 'negative-chart'}
                                                    d={pattern}
                                                />
                                            );
                                        })()}
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ScrollingNFTDisplay = () => {
    const nftPairs = [];
    for (let i = 0; i < nftData.nfts.length; i += 2) {
        nftPairs.push(nftData.nfts.slice(i, i + 2));
    }

    return (
        <div className="relative">
            <div 
                style={{ height: `${100 * nftPairs.length}vh` }}
                className="relative w-full"
            >
                {nftPairs.map((pair, pairIndex) => (
                    <NFTRow 
                        key={pairIndex}
                        nfts={pair}
                        index={pairIndex}
                        totalPairs={nftPairs.length}
                        isLast={pairIndex === nftPairs.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

const NFTRow = ({ nfts, index, totalPairs, isLast }) => {
    const router = useRouter();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const handleNFTClick = () => {
        router.push('/nftcontent');
    };

    return (
        <motion.div
            ref={ref}
            className={`nft-row ${isLast ? 'last-row' : ''}`}
            style={{
                opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
                position: 'sticky',
                top: 0,
                height: '100vh',
                zIndex: totalPairs - index
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
                            delay: i * 0.2
                        }}
                        onClick={() => handleNFTClick(nft)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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

export default NFTMarketplace;