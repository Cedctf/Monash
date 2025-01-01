import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');

const Wallet = () => {
  const { wallet, connect, connected, disconnect } = useWallet();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (wallet?.publicKey) {
      setAddress(wallet.publicKey.toString());
    }
  }, [wallet]);

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <WalletMultiButton className='wallet-adapter-button-trigger'>Connect Wallet</WalletMultiButton>
    </div>
  );
};

export default Wallet;
