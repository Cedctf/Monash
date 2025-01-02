import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');

const Wallet = () => {
  const { publicKey } = useWallet();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (publicKey) {
      // Truncate the address to first 4 and last 4 characters
      const truncatedAddress = `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`;
      setAddress(truncatedAddress);
    }
  }, [publicKey]);

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <WalletMultiButton className='wallet-adapter-button-trigger'>
        {publicKey ? address : 'Connect Wallet'}
      </WalletMultiButton>
    </div>
  );
};

export default Wallet;
