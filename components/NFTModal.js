import React from 'react';
import styles from '@/styles/NFTModal.module.css';

const NFTModal = ({ nft, onClose }) => {
    if (!nft) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.nftDetails}>
                    <div className={styles.imageContainer}>
                        <img src={nft.image} alt={nft.name} className={styles.nftImage} />
                    </div>
                    <div className={styles.info}>
                        <h2>{nft.name}</h2>
                        <div className={styles.statsGrid}>
                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Floor Price</span>
                                <div className={styles.solPrice}>
                                    <img src="/solana-logo.png" alt="SOL" className={styles.solIcon} />
                                    <span>{nft.floor} SOL</span>
                                </div>
                            </div>
                            
                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Top Offer</span>
                                <div className={styles.solPrice}>
                                    <img src="/solana-logo.png" alt="SOL" className={styles.solIcon} />
                                    <span>{nft.topOffer} SOL</span>
                                </div>
                            </div>

                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Floor Change</span>
                                <span className={nft.floorChange >= 0 ? styles.positive : styles.negative}>
                                    {nft.floorChange}%
                                </span>
                            </div>

                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Volume</span>
                                <div className={styles.solPrice}>
                                    <img src="/solana-logo.png" alt="SOL" className={styles.solIcon} />
                                    <span>{nft.volume}</span>
                                </div>
                            </div>

                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Sales</span>
                                <span>{nft.sales}</span>
                            </div>

                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Listed</span>
                                <div className={styles.listedInfo}>
                                    <span>{nft.listed.percentage}%</span>
                                    <span className={styles.subText}>
                                        ({nft.listed.current}/{nft.listed.total})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTModal;
