import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styles from '../styles/PopupNotification.module.css';

const PopupNotification = ({ onClose }) => {
    const router = useRouter();

    const handleShopNFT = () => {
        onClose();
        router.push('/marketplace');
    };

    const handlePlayGame = () => {
        onClose();
        router.push('/game');
    };

    return (
        <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className={styles.popup}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
            >
                <h2>Welcome to KiwiEden!</h2>
                <p>Choose your adventure:</p>
                <div className={styles.buttonContainer}>
                    <button 
                        className={`${styles.button} ${styles.shopButton}`}
                        onClick={handleShopNFT}
                    >
                        Shop NFT
                    </button>
                    <button 
                        className={`${styles.button} ${styles.playButton}`}
                        onClick={handlePlayGame}
                    >
                        Play Game
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PopupNotification; 