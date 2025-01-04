'use client';
import React from 'react';
import Link from 'next/link';
import nftData from '@/components/assets.json';
import "../components/discover.js";
import dynamic from 'next/dynamic';
import Image from 'next/image';

const WalletButton = dynamic(
    () => import('@/components/Wallet'),
    { ssr: false }
);

const NFTMarketplace = () => {
    // Extract the NFTs array from the JSON data
    const topNFTs = nftData.nfts;

    // Different path patterns you can use:
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

    // Helper function to determine if a pattern is trending up
    const isUpwardTrend = (pattern) => {
        return [
            chartPatterns.upTrend,
            chartPatterns.steadyRise,
            chartPatterns.wavyUp
        ].includes(pattern);
    };

    return (
        <div className="marketplace-container">
            <div className="background-container">
                <img src="/NFT/apple.jpg" alt="background" className="background-video" />
            </div>

            <header className="header">
                <div className="header-left">
                    <img src="/public/game/burger.png" alt="KiwiEden" className="logo" />
                    <nav className="main-nav">
                        <button>Collections</button>
                        <button>Runes</button>
                        <Link href="/discover">
                            <button className="nav-button">Discover</button>
                        </Link>
                        <button>Mint</button>
                        <button className="wallet-btn">Wallet</button>
                    </nav>
                </div>
                
                <div className="header-right">
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Search collections on Magic Eden" 
                            className="search-bar" 
                        />
                        <span className="currency">K</span>
                    </div>
                    <WalletButton />
                </div>
            </header>

            <div className="image-scroll">
                {topNFTs.map(nft => (
                    <div key={nft.id} className="nft-image">
                        <img src={nft.image} alt={nft.name} className="nft-img" />
                        <div className="nft-info">
                            <h3>{nft.name}</h3>
                            <p>{nft.description}</p>
                        </div>
                    </div>
                ))}
            </div>

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
                        {topNFTs.map((nft, index) => (
                            <tr key={nft.id}>
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

export default NFTMarketplace;