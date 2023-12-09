import React, { useEffect, useState } from 'react';
import paper from '../../public/images/paper.png';
import rock from '../../public/images/rock.png';
import scissors from '../../public/images/scissors.png';
import gameStyle from './Game.module.css';
import ResultModal from './ResultModal';
const choices = ['rock', 'paper', 'scissors'];
const images = [rock, paper, scissors];
export function Game({ setStart }) {
  const [playerImage, setPlayerImage] = useState('');
  const [computerImage, setComputerImage] = useState([]);
  const [playerChoice, setPlayerChoice] = useState(null);
  let [playerScore, setPlayerScore] = useState(0);
  const [computerChoice, setComputerChoice] = useState(null);
  let [computerScore, setComputerScore] = useState(0);
  const [gameState, setGameState] = useState(false);
  const [resultText, setResultText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  function handlePlayerChoice(e) {
    const btnValue = e.target.dataset.value;
    setPlayerChoice(btnValue);
    const img = e.target.src;
    setPlayerImage(img);
    setGameState((prev) => !prev);

    let randomIndex = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex]);
    setComputerImage(images[randomIndex]);
  }

  function checkWinner() {
    if (playerChoice !== null && computerChoice !== null) {
      if (playerChoice === computerChoice) {
        // console.log('Draw!');
      } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
      ) {
        setPlayerScore((prev) => prev + 1);
      } else {
        setComputerScore(computerScore + 1);
      }
    }

    (playerScore > 2 || computerScore > 2) && finishGame();
  }
  useEffect(checkWinner, [gameState]);

  function finishGame() {
    playerScore > computerScore
      ? setResultText(`Player Won!`)
      : setResultText(`Computer Won!`);

    setIsFinished(!false);

    setPlayerImage('');
    setComputerImage([]);
    setPlayerChoice(null);
    setPlayerScore(0);
    setComputerChoice(null);
    setComputerScore(0);
    setGameState(false);
  }

  function restartGame() {
    setIsFinished(!true);
    setStart(!true);
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
            className={gameStyle['choice_btn']}
            src={img}
            data-value={choices[i]}
            alt='png'
            onClick={handlePlayerChoice}
          />
        ))}

        <div className={gameStyle['score_content']}>
          <h3>Player score: {playerScore}</h3>
          <h3>Computer score: {computerScore}</h3>
        </div>
      </div>
    </div>
  ) : (
    <ResultModal restartGame={restartGame} resultText={resultText} />
  );
}
