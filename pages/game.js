'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Game.module.css';
import { Pacifico, Poppins } from 'next/font/google';

const pacifico = Pacifico({ 
    weight: '400',
    subsets: ['latin'],
});

const poppins = Poppins({
    weight: ['400', '600'],
    subsets: ['latin'],
});

const GRID_SIZE = 8;
const CANDY_TYPES = [
    '/game/tiramisu.png',
    '/game/pancake.png',
    '/game/icecream.png',
    '/game/coffee.png',
    '/game/burger.png',
    '/game/croissant.png',
    '/game/sushi.png',
    '/game/breakfast.png'
];
const GAME_TIME = 999999;

export default function CandyCrush() {
    const router = useRouter();
    const [board, setBoard] = useState([]);
    const [selectedCandy, setSelectedCandy] = useState(null);
    const [score, setScore] = useState(0);
    const [canPlay, setCanPlay] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [leaderboard, setLeaderboard] = useState([
        { rank: 1, name: "SUKIHONG", score: 628900, avatar: "/avatar/catvibe.gif" },
        { rank: 2, name: "J.DRAGON", score: 597450, avatar: "/avatar/avatar1.gif" },
        { rank: 3, name: "HYONY", score: 432040, avatar: "/avatar/avatar3.gif" },
        { rank: 4, name: "YOUNG93", score: 212000, avatar: "/avatar/avatar4.gif" },
        { rank: 5, name: "MISS.MOON", score: 95040, avatar: "/NFT/angel.gif" }
    ]);
    const [showLeaderboard, setShowLeaderboard] = useState(true);
    const [timeLeft, setTimeLeft] = useState(50);
    const [gameStarted, setGameStarted] = useState(false);
    const [showGuidelines, setShowGuidelines] = useState(true);

    useEffect(() => {
        initializeBoard();
    }, []);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            console.log('Timer started!');
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1 || gameOver) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [gameStarted, timeLeft, gameOver]);

    const initializeBoard = () => {
        console.log('Initializing board');
        
        // Calculate how many of each candy we need for even distribution
        const totalCells = GRID_SIZE * GRID_SIZE;
        const candiesPerType = totalCells / CANDY_TYPES.length;
        
        // Create array with equal numbers of each candy
        let candies = [];
        CANDY_TYPES.forEach(candy => {
            for (let i = 0; i < candiesPerType; i++) {
                candies.push(candy);
            }
        });
        
        // Shuffle the candies array
        candies = candies.sort(() => Math.random() - 0.5);
        
        // Create the board using the shuffled candies
        const newBoard = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill());
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                newBoard[row][col] = candies[row * GRID_SIZE + col];
            }
        }
        
        setBoard(newBoard);
        setGameStarted(false);
        setTimeLeft(50);
        setGameOver(false);-
        setCanPlay(true);
        setScore(0);
        console.log('Board initialized with even distribution');
    };

    const handleCandyClick = (row, col) => {
        if (!canPlay || gameOver || !board[row][col]) return;

        if (!gameStarted) {
            console.log('Starting game!');
            setGameStarted(true);
            setTimeLeft(50);
        }

        if (!selectedCandy) {
            // First candy selected
            setSelectedCandy({ row, col, type: board[row][col] });
        } else {
            // Second candy selected
            if (board[row][col] === selectedCandy.type) {
                // Match found!
                const newBoard = [...board];
                newBoard[selectedCandy.row][selectedCandy.col] = null;
                newBoard[row][col] = null;
                setBoard(newBoard);
                setScore(prev => prev + 100);
                
                // Check if game is over
                checkGameOver(newBoard);
            }
            setSelectedCandy(null);
        }
    };

    const checkGameOver = (currentBoard) => {
        // Check if all candies are eliminated
        let remainingCandies = false;
        
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (currentBoard[row][col] !== null) {
                    remainingCandies = true;
                    break;
                }
            }
            if (remainingCandies) break;
        }
        
        // If no candies remain, game is over
        if (!remainingCandies) {
            setGameOver(true);
            setCanPlay(false);
            setGameStarted(false); // This will stop the timer
            console.log('Game completed! All candies eliminated.');
        }
    };

    const handleBackToMenu = () => {
        router.push('/marketplace');
    };

    return (
        <div className={styles.gameContainer}>
            <div className={styles.backgroundContainer}>
                <img src="/game/gameBackground.gif" alt="background" />
            </div>
            
            <div className={styles.header}>
                <div>
                    <div className={styles.score}>Score: {score}</div>
                    <div className={styles.timer}>Time: {timeLeft}s</div>
                </div>
            </div>

            <button onClick={initializeBoard} className={styles.restartButton}>
                Restart Game
            </button>

            <button onClick={handleBackToMenu} className={styles.menuButton}>
                Back to Menu
            </button>

            <button 
                className={styles.leaderboardButton}
                onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
                {showLeaderboard ? '✕' : '🏆 Leaderboard'}
            </button>

            {gameOver && (
                <div className={styles.gameOverOverlay}>
                    <div className={styles.gameOver}>
                        <button 
                            className={styles.closeButton}
                            onClick={() => setGameOver(false)}
                        >
                            ×
                        </button>
                        <h2>🎉 Congratulations! 🎉</h2>
                        <p>
                            You've completed the game with a score of {score}!
                        </p>
                    </div>
                </div>
            )}

            <div className={styles.board}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {row.map((candy, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`${styles.candy} ${
                                    selectedCandy?.row === rowIndex && 
                                    selectedCandy?.col === colIndex ? 
                                    styles.selected : ''
                                }`}
                                onClick={() => handleCandyClick(rowIndex, colIndex)}
                            >
                                {candy && (
                                    <Image
                                        src={candy}
                                        alt="food"
                                        width={50}
                                        height={50}
                                        priority
                                        onError={(e) => {
                                            console.log('Attempting to load image from:', candy);
                                            console.error('Error loading image:', e);
                                            // Try to fetch the image directly to see the response
                                            fetch(candy)
                                                .then(res => console.log('Image fetch response:', res.status))
                                                .catch(err => console.error('Fetch error:', err));
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {showLeaderboard && (
                <div className={styles.leaderboard}>
                    <div className={styles.leaderboardHeader}>
                        <span>🏆 GAME POP UP 🏆</span>
                    </div>
                    
                    <div className={styles.podium}>
                        {[2, 1, 3].map(rank => {
                            const player = leaderboard.find(p => p.rank === rank);
                            return (
                                <div key={rank} className={`${styles.podiumPlace} ${styles[`place${rank}`]}`}>
                                    <div className={styles.avatar}>
                                        <Image src={player.avatar} alt={player.name} width={40} height={40} />
                                    </div>
                                    <div className={styles.rank}>{rank}</div>
                                    <div className={styles.name}>{player.name}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.leaderboardList}>
                        {leaderboard.map((player) => (
                            <div key={player.rank} className={styles.leaderboardRow}>
                                <div className={styles.rankMedal}>
                                    {player.rank <= 3 ? (
                                        <Image 
                                            src={`/avatar/medal${player.rank}.jpg`} //medal picture
                                            alt={`Rank ${player.rank}`} 
                                            width={20} 
                                            height={20}
                                        />
                                    ) : (
                                        <span>{player.rank}th</span>
                                    )}
                                </div>
                                <div className={styles.playerAvatar}>
                                    <Image src={player.avatar} alt={player.name} width={30} height={30} />
                                </div>
                                <div className={styles.playerName}>{player.name}</div>
                                <div className={styles.playerScore}>{player.score.toLocaleString()}</div>
                                <div className={styles.coinIcon}>🪙</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Guidelines Popup */}
            {showGuidelines && (
                <div className={styles.guidelinesOverlay}>
                    <div className={`${styles.guidelinesPopup} ${poppins.className}`}>
                        <button 
                            className={styles.closeButton}
                            onClick={() => setShowGuidelines(false)}
                        >
                            ×
                        </button>
                        <h2 className={pacifico.className}>How to Play</h2>
                        <div className={styles.guidelinesList}>
                            <div className={styles.guidelineItem}>
                                <span className={styles.number}>1</span>
                                <p>Link same picture to get marks</p>
                            </div>
                            <div className={styles.guidelineItem}>
                                <span className={styles.number}>2</span>
                                <p>Marks will award to personal record</p>
                            </div>
                            <div className={styles.guidelineItem}>
                                <span className={styles.number}>3</span>
                                <p>Finish them in 50 seconds</p>
                            </div>
                            <div className={`${styles.guidelineItem} ${styles.goodLuck}`}>
                                <span className={`${styles.number} ${styles.specialNumber}`}>4</span>
                                <p>Good luck!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}