import React, { useEffect, useState } from 'react';
import paper from '../../public/images/paper.png';
import rock from '../../public/images/rock.png';
import scissors from '../../public/images/scissors.png';
import gameStyle from './Game.module.css';
const choices = ['rock', 'paper', 'scissors'];
const images = [rock, paper, scissors];
export function Game() {
  const [playerImage, setPlayerImage] = useState('');
  const [playerChoice, setPlayerChoice] = useState(null);
  let [playerScore, setPlayerScore] = useState(0);
  const [computerChoice, setComputerChoice] = useState(null);
  const [computerImage, setComputerImage] = useState([]);
  let [computerScore, setComputerScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function computerTurn() {
    let randomIndex = Math.floor(Math.random() * 3);
    setComputerChoice(choices[randomIndex]);
    setComputerImage(images[randomIndex]);
  }

  function handlePlayerChoice(e) {
    let btnValue = e.target.dataset.value;
    setPlayerChoice(btnValue);
    computerTurn();
    let imgSrc = e.target.src;
    setPlayerImage(imgSrc);
  }

  function checkWinner() {
    if (playerChoice != null && computerChoice != null) {
      if (playerChoice == computerChoice) {
        if (playerScore > 2 || computerScore > 2) {
          setIsFinished(true);
        }
      } else if (
        (playerChoice == 'paper' && computerChoice == 'rock') ||
        (playerChoice == 'rock' && computerChoice == 'scissors') ||
        (playerChoice == 'scissors' && computerChoice == 'paper')
      ) {
        setPlayerScore((prev) => prev + 1);
        if (playerScore > 2) {
          setIsFinished(true);
        }
      } else {
        setComputerScore((prev) => prev + 1);
        if (computerScore > 2) {
          setIsFinished(true);
        }
      }
    }
  }

  useEffect(checkWinner, [playerChoice]);

  function finishGame() {
    setComputerChoice(null);
    setPlayerChoice(null);
    setPlayerImage('');
    setComputerImage([]);
    setPlayerScore(0);
    setComputerScore(0);
  }
  useEffect(finishGame, [isFinished]);

  function restartGame() {
    window.location.reload();
    setIsFinished(false);
  }
  return !isFinished ? (
    <div className={gameStyle['game_container']}>
      <div className={gameStyle['game_box']}>
        <div className={gameStyle['player_choice']}>
          <p>
            Player: <br />
            <span style={{ color: '#026e6e' }}>({playerChoice})</span>
          </p>
          <div>{playerChoice && <img src={playerImage} alt='playerImg' />}</div>
        </div>
        <div className={gameStyle['computer_choice']}>
          <p>
            Computer: <br />
            <span style={{ color: '#026e6e' }}>({computerChoice})</span>
          </p>
          <div>
            {computerChoice && playerChoice && (
              <img src={computerImage} alt='pcImage' />
            )}
          </div>
        </div>
      </div>
      <div className={gameStyle['player_box']}>
        <h2>Player Choice:</h2>
        {images.map((img, i) => (
          <img
            key={i}
            onClick={handlePlayerChoice}
            className={gameStyle['choice_btn']}
            src={img}
            data-value={choices[i]}
            alt='png'
          />
        ))}

        <div className={gameStyle['score_content']}>
          <h3>Player score: {playerScore}</h3>
          <h3>Computer score: {computerScore}</h3>
        </div>
      </div>
    </div>
  ) : (
    <div className={gameStyle['popup_overlay']}>
      <div className={gameStyle['popup_box']}>
        <h1>Game Result</h1>
        <h2>Game Over!</h2>
        <button onClick={restartGame} className={gameStyle['restart_btn']}>
          Restart
        </button>
      </div>
    </div>
  );
}
