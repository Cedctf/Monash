'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/nftcontent.module.css';
import gameNFTs from '../components/gameNFTs.json';
import Link from 'next/link';
import Header from '../components/Header';

export default function NFTContent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('Price low to high');
    const [activeStatus, setActiveStatus] = useState('All');

    return (
        <div className={styles.pageContainer}>
            <Header />
            
            {/* Full Screen Banner */}
            <div className={styles.bannerSection}>
                <div className={styles.bannerBackground}>
                    <Image 
                        src="/contentnft/contentback.gif" 
                        alt="Banner Background"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                <div className={styles.bannerContent}>
                    <div className={styles.collectionHeader}>
                        <div className={styles.collectionInfo}>
                            <div className={styles.titleSection}>
                                <Image 
                                    src="/NFT/eyeliner.gif" 
                                    alt="Collection Logo" 
                                    width={80} 
                                    height={80}
                                    className={styles.collectionLogo}
                                />
                                <div>
                                    <h1>Dylan Wade Editions</h1>
                                    <p>dylanwade</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.collectionStats}>
                            <div className={styles.statItem}>
                                <h3>28 SOL</h3>
                                <p>Total volume</p>
                            </div>
                            <div className={styles.statItem}>
                                <h3>0.149 SOL</h3>
                                <p>Floor price</p>
                            </div>
                            <div className={styles.statItem}>
                                <h3>0.003 SOL</h3>
                                <p>Best offer</p>
                            </div>
                            <div className={styles.statItem}>
                                <h3>3%</h3>
                                <p>Listed</p>
                            </div>
                            <div className={styles.statItem}>
                                <h3>75 (75%)</h3>
                                <p>Owners (Unique)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section (Below GIF) */}
            <div className={styles.mainContent}>
                {/* Left Sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.filterSection}>
                        <h3>Status</h3>
                        <div className={styles.filterOptions}>
                            <button className={activeStatus === 'All' ? styles.active : ''}>All</button>
                            <button>Listed</button>
                            <button>On auction</button>
                            <button>New</button>
                            <button>Has offers</button>
                        </div>
                    </div>

                    <div className={styles.filterSection}>
                        <h3>Price</h3>
                        <select className={styles.priceSelect}>
                            <option>SOL</option>
                            <option>USDC</option>
                        </select>
                        <div className={styles.priceInputs}>
                            <input type="number" placeholder="Min" />
                            <input type="number" placeholder="Max" />
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className={styles.content}>
                    <div className={styles.contentHeader}>
                        <div className={styles.resultCount}>7,082 results</div>
                        <div className={styles.sortOptions}>
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option>Price low to high</option>
                                <option>Price high to low</option>
                            </select>
                        </div>
                    </div>

                    {/* NFT Grid */}
                    <div className={styles.nftGrid}>
                        {gameNFTs.nfts.map((nft) => (
                            <div key={nft.id} className={styles.nftCard}>
                                <div className={styles.nftImageContainer}>
                                    <Image
                                        src={nft.image}
                                        alt={nft.name}
                                        width={300}
                                        height={300}
                                        className={styles.nftImage}
                                    />
                                    <div className={styles.buyNowOverlay}>
                                        <button className={styles.buyNowButton}>
                                            Buy now
                                            <div className={styles.cartIcon}>
                                                <Image 
                                                    src="/contentnft/cart.png" 
                                                    alt="Cart" 
                                                    width={24} 
                                                    height={24} 
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.nftInfo}>
                                    <h3>{nft.name}</h3>
                                    <div className={styles.nftPrice}>
                                        <p>{nft.price}</p>
                                        <p className={styles.lastSale}>Last: {nft.lastSale}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
