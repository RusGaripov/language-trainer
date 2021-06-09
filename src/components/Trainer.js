import React, { useState } from "react";
import styles from "./Trainer.module.css";
import Ellipse from "../images/Ellipse.png";
import Ellipse2 from "../images/Ellipse2.png";

export const Trainer = () => {
  const phraseRussian = ["Она", "ест", "яблоко,", "a", "они", "идут", "домой"];
  const listItems = phraseRussian.map((word, index) => (
    <li className={styles.boxWords__list__item} key={index}>
      {word}
    </li>
  ));

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [clicked, setClicked] = useState(false);

  const [boards, setBoards] = useState([
    "are",
    "is",
    "eating",
    "an",
    "apple",
    "and",
    "they",
    "She",
    "going",
    "home",
  ]);

  const rightPhrase = [
    "She",
    "is",
    "eating",
    "an",
    "apple",
    "and",
    "they",
    "are",
    "going",
    "home",
  ];

  const firstVersion = [
    "She",
    "is",
    "eating",
    "an",
    "apple",
    "and",
    "they",
    "are",
    "going",
    "home",
  ];

  const [array, setArray] = useState([]);

  const dragStartHandler = (board) => {
    setCurrentBoard(board);
  };

  const dragEndHandler = (e, index) => {
    boards.splice(index, 1);
    boards.push("");
    document.getElementById(
      boards.length - 1 - array.length
    ).style.backgroundColor = "#E6E6E6";

    setArray([...array, currentBoard]);
    if (boards[index] !== rightPhrase[array.length]) {
    }
  };

  const check = () => {
    setClicked(true);
    let count = 0;
    let num;
    for (let i = 0; i < boards.length; i++) {
      if (document.getElementById(i).innerText === "") {
        document.getElementById(i).style.backgroundColor = "#ffffff";
        count += 1;
        if (count === 1) num = i;
      }
    }
    boards.splice(num, count);
    setBoards([...boards, ...array]);
    setArray([]);
    document.getElementById(1).style.transition = "all 2s";

    for (let i = 0; i < boards.length; i++) {
      if (boards[i] !== rightPhrase[i]) setIsChecked(false);
    }
    setBoards([
      "are",
      "is",
      "eating",
      "an",
      "apple",
      "and",
      "they",
      "She",
      "going",
      "home",
    ]);
  };

  const listItemsEnglish = boards.map((board, index) => (
    <li
      className={styles.foreignBox__list__item}
      id={index}
      key={index}
      draggable={true}
      onDragStart={(e) => dragStartHandler(board)}
      onDragEnd={(e) => dragEndHandler(e, index)}
    >
      {board}
    </li>
  ));

  const line = array.map((one, index) => (
    <li
      className={styles.foreignBox__list__item2}
      key={index}
      draggable={true}
      value={index + 1}
    >
      {one}
    </li>
  ));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Translate this sentence</h3>
      <div className={styles.ellipseGroup}>
        <div className={styles.top}>
          <img src={Ellipse} className={styles.ellipse} alt="Ellipse" />
          <div className={styles.boxWords}>
            <ul className={styles.boxWords__list}>{listItems}</ul>
          </div>
        </div>
        <img src={Ellipse2} className={styles.ellipse2} alt="Ellipse2" />
      </div>
      <div className={styles.linesGroup}>
        <div className={styles.line}></div>
        <div className={styles.line}>{line}</div>
        <div className={styles.line}></div>
      </div>

      <ul className={styles.foreignBox__list}>{listItemsEnglish}</ul>
      <div className={styles.btnBlock}>
        {clicked && !isChecked && (
          <div className={styles.alert}>Something wrong!</div>
        )}
        <button className={styles.btn} onClick={check}>
          Check
        </button>
      </div>
    </div>
  );
};
