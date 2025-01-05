import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from '@/styles/nftcontent.module.css';


const WalletButton = dynamic(
    () => import('@/components/Wallet'),
    { ssr: false }
);

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <div className={styles.logo}>
                    <img src="/game/coffee.png" alt="Logo" width={40} height={40} />
                    <span>KiwiEden</span>
                </div>
                <nav className="main-nav">
                    <Link href="/profile">
                        <button className="nav-button">Collections</button>
                    </Link>
                    <Link href="/marketplace">
                        <button className="nav-button">Discover</button>
                    </Link>
                    <Link href="/game">
                        <button className="nav-button">Game</button>
                    </Link>
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
    );
};

export default Header;
