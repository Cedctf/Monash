'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '@/styles/profile.module.css';
import nftData from '@/components/assets.json';
import NFTModal from '../components/NFTModal';

const ProfilePage = () => {
    const { publicKey } = useWallet();
    const [copied, setCopied] = useState(false);
    const [selectedNFT, setSelectedNFT] = useState(null);
    
    useEffect(() => {
        // Debug logs
        console.log('Raw NFT Data:', nftData);
        console.log('NFTs array:', nftData?.nfts);
    }, []);

    const shortenAddress = (address) => {
        if (!address) return 'Not Connected';
        return `${address.toString().slice(0, 6)}...${address.toString().slice(-4)}`;
    };

    const copyToClipboard = () => {
        if (publicKey) {
            navigator.clipboard.writeText(publicKey.toString());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        }
    };

    const handleNFTClick = (nft) => {
        setSelectedNFT(nft);
    };

    return (
        <div className="profile-container">
            <div className="background-container">
                <img 
                    src="/NFT/snowy.gif" 
                    alt="background" 
                    className="background-video"
                />
            </div>

            <Header />

            <div className={styles.profileBanner}>
                <div className={styles.profileInfo}>
                    <div className={styles.profileLeft}>
                        <div className={styles.profileAvatar}>
                            <img 
                                src="/profile-pic.svg" 
                                alt="Profile" 
                                className={styles.avatarImage}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/100";
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.profileRight}>
                        <div className={styles.addressContainer}>
                            <h2 className={styles.walletAddress}>
                                {shortenAddress(publicKey)}
                            </h2>
                            <button 
                                className={styles.copyButton} 
                                onClick={copyToClipboard}
                                title="Copy address"
                            >
                                {copied ? (
                                    <span className={styles.checkmark}>✓</span>
                                ) : (
                                    <svg 
                                        className={styles.copyIcon} 
                                        width="16" 
                                        height="16" 
                                        viewBox="0 0 24 24"
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2"
                                    >
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className={styles.stats}>
                            <span>Total Items: {nftData?.nfts?.length || 0}</span>
                            <span className={styles.activeOn}>
                                Active On: 
                                <img 
                                    src="/solana-logo.png" 
                                    alt="Solana" 
                                    className={styles.chainLogo}
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.profileContent}>
                    <h3 style={{ marginBottom: '20px' }}>NFT Items ({nftData?.nfts?.length || 0})</h3>
                    
                    <div className={styles.itemsGrid}>
                        {nftData?.nfts?.map((nft, index) => (
                            <div 
                                key={index} 
                                className={styles.itemCard}
                                onClick={() => handleNFTClick(nft)}
                            >
                                <div className={styles.itemImageContainer}>
                                    <img 
                                        src={nft.image} 
                                        alt={nft.name}
                                        className={styles.itemImage}
                                    />
                                </div>
                                <div className={styles.itemInfo}>
                                    <span className={styles.itemName}>{nft.name}</span>
                                    <div className={styles.itemPrice}>
                                        <img 
                                            src="/solana-logo.png" 
                                            alt="SOL" 
                                            className={styles.solIcon}
                                        />
                                        <span>{nft.floor} SOL</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedNFT && (
                <NFTModal 
                    nft={selectedNFT} 
                    onClose={() => setSelectedNFT(null)}
                />
            )}
        </div>
    );
};

export default ProfilePage;    