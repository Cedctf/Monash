import Link from 'next/link';
import dynamic from 'next/dynamic';

const WalletButton = dynamic(
    () => import('@/components/Wallet'),
    { ssr: false }
);

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src="/me-logo.svg" alt="KiwiEden" className="logo" />
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
    );
};

export default Header;
