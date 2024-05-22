import React, { useEffect } from 'react';
import './index.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PHRASES } from './phrases.js';
import { SYMBOLS } from './symbols.js';

const NUMBER_OF_GUESSES = 1;
const MAX_LINE_WIDTH = 30;

const WordleApp = () => {
    let guessesRemaining = NUMBER_OF_GUESSES;
    let currentGuess = [];
    let nextLetter = 0;
    //let rightGuessString = PHRASES[Math.floor(Math.random() * PHRASES.length)].toLowerCase();
    let currentPuzzleNum = 0;
    let rightGuessString = PHRASES[currentPuzzleNum].toLowerCase();
    for (let i = 0; i < rightGuessString.length; i++) {
        currentGuess[i] = '';
    }
    let stringTranslation = [];
    for (let i = 0; i < 26; i++) {
        let nextSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        if (!stringTranslation.includes(nextSymbol)) {
            stringTranslation[i] = nextSymbol;
        } else {
            i -= 1;
        }
    }
    let rowMap = [];
    let posMap = [];
    let hintOrder = [];
    for (let i = 0; i < rightGuessString.length; i++) {
        if (rightGuessString[i].match(/[A-Za-z]/gi) && !hintOrder.includes(rightGuessString[i])) {
            hintOrder.push(rightGuessString[i]);
        }
    }
    let currentHint = 0;

    function setupInfo(phraseNum) {
        guessesRemaining = NUMBER_OF_GUESSES;
        currentGuess = [];
        nextLetter = 0;
        currentPuzzleNum = phraseNum;
        rightGuessString = PHRASES[currentPuzzleNum].toLowerCase();
        for (let i = 0; i < rightGuessString.length; i++) {
            currentGuess[i] = '';
        }
        stringTranslation = [];
        for (let i = 0; i < 26; i++) {
            let nextSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            if (!stringTranslation.includes(nextSymbol)) {
                stringTranslation[i] = nextSymbol;
            } else {
                i -= 1;
            }
        }
        rowMap = [];
        posMap = [];
        hintOrder = [];
        for (let i = 0; i < rightGuessString.length; i++) {
            if (rightGuessString[i].match(/[A-Za-z]/gi) && !hintOrder.includes(rightGuessString[i])) {
                hintOrder.push(rightGuessString[i]);
            }
        }
        currentHint = 0;
    }

    function setActive() {
        //document.write(this.classList);
        nextLetter = parseInt(this.id);
        //let thisRow = document.getElementsByClassName("letter-row")[rowMap[nextLetter]];

        for (const row of document.getElementsByClassName("letter-row")) {
            for (const ch of row.children) {
                if (ch.classList.contains('selected')) {
                    ch.classList.remove('selected');
                }
                if (ch.classList.contains('similar')) {
                    ch.classList.remove('similar');
                }
                if (parseInt(ch.id) === parseInt(this.id)) {
                    ch.classList.add('selected');
                } else if (rightGuessString[parseInt(ch.id)] === rightGuessString[parseInt(this.id)]) {
                    ch.classList.add('similar');
                }
            }
        }
    }

    function clearBoard() {
        for (const row of document.getElementsByClassName('letter-row')) {
            for (const ch of row.children) {
                if (ch.classList.contains('letter-box') && !ch.children[0].classList.contains('hinted') && !ch.children[0].classList.contains('correct') && ch.children[0].textContent !== '') {
                    ch.children[0].textContent = '';
                    currentGuess[parseInt(ch.id)] = '';
                }
            }
        }
        nextLetter = 0;
        while (nextLetter < rightGuessString.length && (document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains('space-box') || document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].children[0].textContent !== '')) {
            nextLetter += 1;
        }
        setActive.call(document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]]);
        checkBoard.call();
        for (const k of document.getElementsByClassName('keyboard-button')) {
            k.disabled = false;
        }
        for (const row of document.getElementsByClassName('letter-row')) {
            for (const ch of row.children) {
                if (ch.classList.contains('letter-box') && ch.children[0].textContent !== '') {
                    document.getElementById(ch.children[0].textContent.toLowerCase()).disabled = true;
                }
            }
        }
    }

    function checkBoard() {
        for (const row of document.getElementsByClassName('letter-row')) {
            for (const ch of row.children) {
                if (ch.classList.contains('letter-box') && !ch.children[0].classList.contains('hinted')) {
                    ch.children[0].classList.remove('incorrect');
                    ch.children[0].classList.remove('correct');
                    if (currentGuess[parseInt(ch.id)] !== '') {
                        if (currentGuess[parseInt(ch.id)] === rightGuessString[parseInt(ch.id)]) {
                            ch.children[0].classList.add('correct');
                            if (hintOrder.includes(currentGuess[parseInt(ch.id)])) {
                                hintOrder.splice(hintOrder.indexOf(currentGuess[parseInt(ch.id)]), 1);
                            }
                        } else {
                            ch.children[0].classList.add('incorrect');
                        }
                    }
                }
            }
        }
    }

    function giveHint() {
        if (currentHint < hintOrder.length) {
            for (const row of document.getElementsByClassName('letter-row')) {
                for (const ch of row.children) {
                    if (ch.classList.contains('letter-box') && hintOrder[currentHint] === rightGuessString[ch.id]) {
                        ch.children[0].classList.remove('incorrect');
                        ch.children[0].classList.remove('correct');
                        ch.children[0].classList.add('hinted');
                        if (ch.children[0].textContent !== '') {
                            document.getElementById(ch.children[0].textContent).disabled = false;
                        }
                        ch.children[0].textContent = hintOrder[currentHint];
                        currentGuess[parseInt(ch.id)] = hintOrder[currentHint];
                        document.getElementById(ch.children[0].textContent).disabled = true;
                    }
                }
            }
        } else {
            toast.error("No hints left!");
            return;
        }
        currentHint += 1;
        while (nextLetter < rightGuessString.length && (document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains('space-box') || document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].children[0].textContent !== '')) {
            nextLetter += 1;
        }
        
        if (nextLetter < rightGuessString.length) {
            let rowNum = rowMap[nextLetter];
            let row = document.getElementsByClassName("letter-row")[rowNum];
            setActive.call(row.children[posMap[nextLetter]]);
        }
    }

    useEffect(() => {
        initBoard();

        // Add event listener for keyup
        document.addEventListener("keyup", handleKeyUp);

        // Add event listener for click on keyboard
        const keyboardCont = document.getElementById("keyboard-cont");
        keyboardCont.addEventListener("click", handleClick);

        // Cleanup function
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
            keyboardCont.removeEventListener("click", handleClick);
        };
    });

    const initBoard = () => {
        let splitPhrase = rightGuessString.split(" ");
        let rowSeparation = [];
        let rowWords = "";
        for (const word of splitPhrase) {
            if (rowWords.length + word.length > MAX_LINE_WIDTH) {
                rowSeparation.push(rowWords.trim());
                rowWords = "";
            } 
            rowWords += word + " ";
        }
        rowSeparation.push(rowWords.trim());
        //document.write(rowSeparation);

        let board = document.getElementById("game-board");
        board.innerHTML = '';
        
        let row = document.createElement("div");
        row.className = "letter-row";

        let idCounter = 0;
        for (let i = 0; i < rowSeparation.length; i++) {
            for (let j = 0; j < rowSeparation[i].length; j++) {
                if (rowSeparation[i][j] === ' ') { 
                    let box = document.createElement("div");
                    box.className = "space-box";
                    row.appendChild(box);
                    currentGuess[idCounter] = ' ';
                    //rightGuessLength -= 1;
                } else if (rowSeparation[i][j] === ',' || rowSeparation[i][j] === '.' || rowSeparation[i][j] === '\'' || rowSeparation[i][j] === '!' || rowSeparation[i][j] === '?' || rowSeparation[i][j] === ':' || rowSeparation[i][j] === '-') {
                    let letter = document.createElement("div");
                    letter.className = "filler-letter-area";
                    letter.textContent = rowSeparation[i][j];
                    let symbol = document.createElement("div");
                    symbol.className = "filler-symbol-area";
                    let box = document.createElement("div");
                    box.className = "filler-letter-box";
                    box.id = idCounter;
                    box.appendChild(letter);
                    box.appendChild(symbol);
                    row.appendChild(box);
                    currentGuess[idCounter] = rowSeparation[i][j];
                } else {
                    let letter = document.createElement("div");
                    letter.className = "letter-area";
                    let symbol = document.createElement("div");
                    symbol.className = "symbol-area";
                    symbol.textContent = stringTranslation[rowSeparation[i].charCodeAt(j)-'a'.charCodeAt(0)];
                    let box = document.createElement("div");
                    box.className = "letter-box";
                    box.onclick = setActive;
                    box.id = idCounter;
                    box.appendChild(letter);
                    box.appendChild(symbol);
                    row.appendChild(box);
                }
                rowMap[idCounter] = i;
                posMap[idCounter] = j;
                idCounter += 1;
            }
            if (i !== rowSeparation.length - 1) {
                currentGuess[idCounter] = ' ';
                rowMap[idCounter] = i;
                posMap[idCounter] = posMap[idCounter-1];
                idCounter += 1;
            }
            board.appendChild(row);
            row = document.createElement("div");
            row.className = "letter-row";

        }
        setActive.call(document.getElementsByClassName("letter-row")[0].children[posMap[nextLetter]]);
    }

    const deleteLetter = () => {
        let rows = document.getElementsByClassName("letter-row");
        let letter = '';
        for (const row of rows) {
            for (const ch of row.children) {
                if (ch.classList.contains('selected') || ch.classList.contains('similar')) {
                    if (!ch.children[0].classList.contains('hinted') && !ch.children[0].classList.contains('correct')) {
                        letter = ch.children[0].textContent.toLowerCase();
                        ch.children[0].textContent = '';
                        currentGuess[parseInt(ch.id)] = '';
                        ch.children[0].classList.remove('incorrect')
                    }
                }
            }
        }
        if (letter !== '') {
            document.getElementById(letter).disabled = false;
        }
    }

    const checkGuess = () => {
        let guessString = "";
        for (const val of currentGuess) {
            guessString += val;
        }
        if (guessString.length !== rightGuessString.length) {
            toast.error("Not enough letters");
            return;
        } else if (guessString === rightGuessString) {
            toast.success("You guessed right!");
            checkBoard.call();
            guessesRemaining = 0;
            document.getElementsByClassName('check-button')[0].disabled = true;
            document.getElementsByClassName('clear-button')[0].disabled = true;
            document.getElementsByClassName('hint-button')[0].disabled = true;
            return;
        } else {
            toast.error("Not quite...");
            return;
        }
    }

    const insertLetter = (pressedKey) => {
        if (nextLetter === rightGuessString.length) {
            return;
        }
        pressedKey = pressedKey.toLowerCase();

        let rows = document.getElementsByClassName("letter-row");

        for (const row of rows) {
            for (const ch of row.children) {
                if (ch.classList.contains('selected') || ch.classList.contains('similar')) {
                    if (ch.children[0].classList.contains('correct')) {
                        return;
                    } else if (ch.children[0].textContent !== '') {
                        ch.children[0].classList.remove('incorrect');
                        document.getElementById(ch.children[0].textContent.toLowerCase()).disabled = false;
                    }
                    ch.children[0].textContent = pressedKey;
                    currentGuess[parseInt(ch.id)] = pressedKey;
                }
            }
        }

        while (nextLetter < rightGuessString.length && (document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains('space-box') || document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].children[0].textContent !== '')) {
            nextLetter += 1;
        }
        
        if (nextLetter < rightGuessString.length) {
            let rowNum = rowMap[nextLetter];
            let row = document.getElementsByClassName("letter-row")[rowNum];
            setActive.call(row.children[posMap[nextLetter]]);
        }

        document.getElementById(pressedKey).disabled = true;
        
    }

    const handleKeyUp = (e) => {
        if (guessesRemaining === 0) {
            return;
        }

        let pressedKey = String(e.key);

        if (pressedKey === "ArrowLeft") {
            if (nextLetter - 1 >= 0) {
                nextLetter -= 1;
                if (document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains("space-box") || document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains("filler-letter-box")) {
                    nextLetter -= 1;
                }
                if (document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains("space-box") || document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains("filler-letter-box")) {
                    nextLetter -= 1;
                }
                setActive.call(document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]]);
            }
            return;
        }

        if (pressedKey === "ArrowRight") {
            nextLetter += 1;
            while (nextLetter < rightGuessString.length && (currentGuess[nextLetter] === ' ' || document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains('space-box') || document.getElementsByClassName("letter-row")[rowMap[nextLetter]].children[posMap[nextLetter]].classList.contains("filler-letter-box"))) {
                nextLetter += 1;
            }
            if (nextLetter < rightGuessString.length) {
                let rowNum = rowMap[nextLetter];
                let row = document.getElementsByClassName("letter-row")[rowNum];
                setActive.call(row.children[posMap[nextLetter]]);
            } else {
                nextLetter = rightGuessString.length - 1;
            }
            return;
        }

        if (pressedKey === "Backspace") {
            deleteLetter();
            return;
        }

        if (pressedKey === "Enter") {
            checkGuess();
            return;
        }

        let found = pressedKey.match(/[a-z]/gi);
        if (!found || found.length > 1) {
            return;
        } else {
            if (document.getElementById(pressedKey).disabled === false) {
                insertLetter(pressedKey);
            } else {
                return;
            }
        }
    }

    const handleClick = (e) => {
        const target = e.target;

        if (target.classList.contains('letter-area')) {
            
            target.classList.add('selected');
        }

        if (target.classList.contains('check-button')) {
            checkBoard.call();
        }

        if (target.classList.contains('hint-button')) {
            giveHint.call();
        }

        if (target.classList.contains('clear-button')) {
            clearBoard.call();
        }

        if (!target.classList.contains("keyboard-button")) {
            return;
        }
        let key = target.textContent;

        if (key === "Del") {
            key = "Backspace";
        }

        document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
    }

    const updateNewPuzzle = () => {
        currentPuzzleNum = parseInt(currentPuzzleNum);
        if (Number.isInteger(currentPuzzleNum) && currentPuzzleNum < PHRASES.length) {
            setupInfo(currentPuzzleNum);
            initBoard();
            clearBoard();
        }
        else {
            toast.error("Enter a valid number between 1 and " + (PHRASES.length - 1));
        }
        document.getElementById('new-puzzle-button').blur();
    }

    const handleChange = event => {
        currentPuzzleNum = event.target.value;
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <div className='full-page'>
                <div className='header-area'>
                    <h1> Quotogram </h1>
                    <div className='change-puzzle'>
                        <input type='text' id='new-puzzle-num' onChange={handleChange}/>
                        <button onClick={updateNewPuzzle} id='new-puzzle-button' >Change Puzzle!</button>
                    </div>
                </div>
                <div id="game-board">
                    {/* Game board content goes here */}
                </div>
                <div id="keyboard-cont">
                <div className="first-row">
                        <button className="keyboard-button" id='q'>q</button>
                        <button className="keyboard-button" id='w'>w</button>
                        <button className="keyboard-button" id='e'>e</button>
                        <button className="keyboard-button" id='r'>r</button>
                        <button className="keyboard-button" id='t'>t</button>
                        <button className="keyboard-button" id='y'>y</button>
                        <button className="keyboard-button" id='u'>u</button>
                        <button className="keyboard-button" id='i'>i</button>
                        <button className="keyboard-button" id='o'>o</button>
                        <button className="keyboard-button" id='p'>p</button>
                    </div>
                    <div className="second-row">
                        <button className="keyboard-button" id='a'>a</button>
                        <button className="keyboard-button" id='s'>s</button>
                        <button className="keyboard-button" id='d'>d</button>
                        <button className="keyboard-button" id='f'>f</button>
                        <button className="keyboard-button" id='g'>g</button>
                        <button className="keyboard-button" id='h'>h</button>
                        <button className="keyboard-button" id='j'>j</button>
                        <button className="keyboard-button" id='k'>k</button>
                        <button className="keyboard-button" id='l'>l</button>
                    </div>
                    <div className="third-row">
                        <button className="keyboard-button">Del</button>
                        <button className="keyboard-button" id='z'>z</button>
                        <button className="keyboard-button" id='x'>x</button>
                        <button className="keyboard-button" id='c'>c</button>
                        <button className="keyboard-button" id='v'>v</button>
                        <button className="keyboard-button" id='b'>b</button>
                        <button className="keyboard-button" id='n'>n</button>
                        <button className="keyboard-button" id='m'>m</button>
                        <button className="keyboard-button">Enter</button>
                    </div>
                    <div className='fourth-row'>
                        <button className='keyboard-button check-button'>Check</button>
                        <button className='keyboard-button hint-button'>Hint</button>
                        <button className='keyboard-button clear-button'>Clear</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WordleApp;