import Board from "./Board";
import Square from "./Square";
import { useState, useEffect } from "react";
import Navbar from "../Containers/Navbar";
import { auth, logout } from "./firebase";
import { Button } from "react-bootstrap";

var c = 0;
const defaultSquares = () => new Array(9).fill(null);

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function JogoGalo() {
  function refreshPage() {
    window.location.reload(false);
  }

  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const isComputerTurn =
      squares.filter((square) => square !== null).length % 2 === 1;
    const linesThatAre = (a, b, c) => {
      return lines.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };

    const emptyIndexes = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);
    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;

    if (playerWon) {
      setWinner("x");
    } else if (computerWon) {
      setWinner("o");
    } else if (c == 5) {
      setWinner("empate");
    }

    const putComputerAt = (index) => {
      let newSquares = squares;
      newSquares[index] = "o";
      setSquares([...newSquares]);
    };

    setTimeout(() => {
      if (isComputerTurn) {
        const winingLines = linesThatAre("o", "o", null);
        if (winingLines.length > 0) {
          const winIndex = winingLines[0].filter(
            (index) => squares[index] === null
          )[0];

          putComputerAt(winIndex);
          return;
        }

        const linesToBlock = linesThatAre("x", "x", null);
        if (linesToBlock.length > 0) {
          const blockIndex = linesToBlock[0].filter(
            (index) => squares[index] === null
          )[0];
          putComputerAt(blockIndex);
          return;
        }

        const linesToContinue = linesThatAre("o", null, null);
        if (linesToContinue.length > 0) {
          putComputerAt(
            linesToContinue[0].filter((index) => squares[index] === null)[0]
          );
          return;
        }

        const randomIndex =
          emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
        putComputerAt(randomIndex);
      }
    }, 1500);
  }, [squares]);

  function handleSquareClick(index) {
    c++;
    console.log(c);
    const isPlayerTurn =
      squares.filter((square) => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = "x";
      setSquares([...newSquares]);
    }
  }

  return (
    <div>
      <div className="frame">
        <h1 className="green">Jogo do Galo</h1>
        <p className="blue">
          Clique num quadrado para começar a jogar. Não se esqueça que vai jogar
          com as cruzes (<b>X</b>).
        </p>

        <main>
          <Board>
            {squares.map((square, index) => (
              <Square
                x={square === "x" ? 1 : 0}
                o={square === "o" ? 1 : 0}
                onClick={() => handleSquareClick(index)}
              />
            ))}
          </Board>

          {!!winner && winner === "x" && (
            <div className="result green">
              <p className="white">Ganhou! </p>
              <Button className="btn btnFillWhite" onClick={refreshPage}>
                Recomeçar
              </Button>
            </div>
          )}
          {!!winner && winner === "o" && (
            <div className="result red">
              <p className="white">Perdeu...</p>
              <Button className="btn btnFillWhite" onClick={refreshPage}>
                Recomeçar
              </Button>
            </div>
          )}
          {!!winner && winner === "empate" && (
            <div className="result empate">
              <p className="white">Empatou</p>
              <Button className="btn btnFillWhite" onClick={refreshPage}>
                Recomeçar
              </Button>
            </div>
          )}
        </main>
      </div>

      <Navbar ativo={"jogos"} />
    </div>
  );
}

/* function trocaGalo(verifica) {
  if (verifica) {
   this.JogarGalo
  }
} */
