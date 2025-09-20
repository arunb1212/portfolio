import React, { useState, useEffect, useCallback } from 'react'
import { X, RotateCcw, Play, Pause } from 'lucide-react'

const Game = ({ onClose }) => {
  const [gameState, setGameState] = useState('ready') // 'ready', 'playing', 'paused', 'gameOver'
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)
  const [board, setBoard] = useState(() => 
    Array(20).fill().map(() => Array(10).fill(0))
  )
  const [currentPiece, setCurrentPiece] = useState(null)
  const [nextPiece, setNextPiece] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const BOARD_WIDTH = 10
  const BOARD_HEIGHT = 20

  // Tetris pieces
  const PIECES = [
    {
      shape: [
        [1, 1, 1, 1]
      ],
      color: 'bg-cyan-500'
    },
    {
      shape: [
        [1, 1],
        [1, 1]
      ],
      color: 'bg-yellow-500'
    },
    {
      shape: [
        [0, 1, 0],
        [1, 1, 1]
      ],
      color: 'bg-purple-500'
    },
    {
      shape: [
        [0, 1, 1],
        [1, 1, 0]
      ],
      color: 'bg-green-500'
    },
    {
      shape: [
        [1, 1, 0],
        [0, 1, 1]
      ],
      color: 'bg-red-500'
    },
    {
      shape: [
        [1, 0, 0],
        [1, 1, 1]
      ],
      color: 'bg-blue-500'
    },
    {
      shape: [
        [0, 0, 1],
        [1, 1, 1]
      ],
      color: 'bg-orange-500'
    }
  ]

  // Generate random piece
  const generatePiece = useCallback(() => {
    const randomPiece = PIECES[Math.floor(Math.random() * PIECES.length)]
    return {
      ...randomPiece,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(randomPiece.shape[0].length / 2),
      y: 0
    }
  }, [])

  // Check collision
  const checkCollision = useCallback((piece, board, dx = 0, dy = 0) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x + dx
          const newY = piece.y + y + dy
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true
          }
          
          if (newY >= 0 && board[newY][newX]) {
            return true
          }
        }
      }
    }
    return false
  }, [])

  // Place piece on board
  const placePiece = useCallback((piece, board) => {
    const newBoard = board.map(row => [...row])
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.y + y
          const boardX = piece.x + x
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.color
          }
        }
      }
    }
    
    return newBoard
  }, [])

  // Clear completed lines
  const clearLines = useCallback((board) => {
    const newBoard = board.filter(row => row.some(cell => cell === 0))
    const linesCleared = BOARD_HEIGHT - newBoard.length
    
    if (linesCleared > 0) {
      const newLines = Array(linesCleared).fill().map(() => Array(BOARD_WIDTH).fill(0))
      return { board: [...newLines, ...newBoard], linesCleared }
    }
    
    return { board, linesCleared: 0 }
  }, [])

  // Move piece down
  const moveDown = useCallback(() => {
    if (!currentPiece) return

    if (!checkCollision(currentPiece, board, 0, 1)) {
      setCurrentPiece(prev => ({ ...prev, y: prev.y + 1 }))
    } else {
      // Place piece and generate new one
      const newBoard = placePiece(currentPiece, board)
      const { board: clearedBoard, linesCleared } = clearLines(newBoard)
      
      setBoard(clearedBoard)
      setLines(prev => prev + linesCleared)
      setScore(prev => prev + linesCleared * 100 * level)
      
      if (linesCleared > 0) {
        setLevel(prev => Math.floor((lines + linesCleared) / 10) + 1)
      }
      
      // Check game over
      if (checkCollision(nextPiece, clearedBoard)) {
        setGameState('gameOver')
        return
      }
      
      setCurrentPiece(nextPiece)
      setNextPiece(generatePiece())
    }
  }, [currentPiece, board, nextPiece, checkCollision, placePiece, clearLines, lines, level])

  // Rotate piece
  const rotatePiece = useCallback((piece) => {
    const rotated = {
      ...piece,
      shape: piece.shape[0].map((_, index) => 
        piece.shape.map(row => row[index]).reverse()
      )
    }
    return rotated
  }, [])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing' || !currentPiece) return

      switch (e.key) {
        case 'ArrowLeft':
          if (!checkCollision(currentPiece, board, -1, 0)) {
            setCurrentPiece(prev => ({ ...prev, x: prev.x - 1 }))
          }
          break
        case 'ArrowRight':
          if (!checkCollision(currentPiece, board, 1, 0)) {
            setCurrentPiece(prev => ({ ...prev, x: prev.x + 1 }))
          }
          break
        case 'ArrowDown':
          moveDown()
          break
        case 'ArrowUp':
          const rotated = rotatePiece(currentPiece)
          if (!checkCollision(rotated, board)) {
            setCurrentPiece(rotated)
          }
          break
        case ' ':
          e.preventDefault()
          setGameState(prev => prev === 'playing' ? 'paused' : 'playing')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, currentPiece, board, checkCollision, moveDown, rotatePiece])

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return

    const gameLoop = setInterval(() => {
      moveDown()
    }, Math.max(50, 500 - (level - 1) * 50))

    return () => clearInterval(gameLoop)
  }, [gameState, moveDown, level])

  // Start game
  const startGame = () => {
    setGameState('playing')
    setBoard(Array(20).fill().map(() => Array(10).fill(0)))
    setScore(0)
    setLines(0)
    setLevel(1)
    const firstPiece = generatePiece()
    const secondPiece = generatePiece()
    setCurrentPiece(firstPiece)
    setNextPiece(secondPiece)
  }

  // Reset game
  const resetGame = () => {
    setGameState('ready')
    setBoard(Array(20).fill().map(() => Array(10).fill(0)))
    setCurrentPiece(null)
    setNextPiece(null)
    setScore(0)
    setLines(0)
    setLevel(1)
  }

  // Render board with current piece
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row])
    
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y
            const boardX = currentPiece.x + x
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color
            }
          }
        }
      }
    }
    
    return displayBoard
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-6 max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Tetris Blocks</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Game Info */}
        <div className="flex justify-between items-center mb-4 text-white">
          <div>
            <span className="text-gray-400">Score: </span>
            <span className="font-bold">{score}</span>
          </div>
          <div>
            <span className="text-gray-400">Lines: </span>
            <span className="font-bold">{lines}</span>
          </div>
          <div>
            <span className="text-gray-400">Level: </span>
            <span className="font-bold">{level}</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div 
            className="grid gap-0 mx-auto"
            style={{ 
              gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
              width: '200px',
              height: '400px'
            }}
          >
            {renderBoard().flat().map((cell, index) => (
              <div
                key={index}
                className={`border border-gray-700 ${cell || 'bg-gray-800'}`}
              />
            ))}
          </div>
        </div>

        {/* Next Piece Preview */}
        {nextPiece && (
          <div className="mb-4">
            <h3 className="text-white text-sm mb-2">Next:</h3>
            <div className="bg-gray-800 rounded p-2 inline-block">
              <div 
                className="grid gap-0"
                style={{ 
                  gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 1fr)`,
                  width: `${nextPiece.shape[0].length * 20}px`,
                  height: `${nextPiece.shape.length * 20}px`
                }}
              >
                {nextPiece.shape.flat().map((cell, index) => (
                  <div
                    key={index}
                    className={`border border-gray-700 ${cell ? nextPiece.color : 'bg-gray-800'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Game Controls */}
        {gameState === 'ready' && (
          <div className="text-center">
            <p className="text-gray-300 mb-4">Use arrow keys to move and rotate blocks</p>
            <button
              onClick={startGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <Play size={16} />
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="text-center">
            <p className="text-green-400 mb-2">Playing...</p>
            <button
              onClick={() => setGameState('paused')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <Pause size={16} />
              Pause
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="text-center">
            <p className="text-yellow-400 mb-4">Game Paused</p>
            <button
              onClick={() => setGameState('playing')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <Play size={16} />
              Resume
            </button>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center">
            <p className="text-red-400 mb-4 font-bold">Game Over!</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={resetGame}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          <p>↑ Rotate • ← → Move • ↓ Drop • Space Pause</p>
        </div>
      </div>
    </div>
  )
}

export default Game
