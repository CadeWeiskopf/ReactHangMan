import React from 'react';
import './index.css';
import './index';

//var head = 'o';
//var arm1 = '\\';
//var arm2 = '/';
//var body = '|';
//var leg1 = '/';
//var leg2 = '\\';
var head = '';
var arm1 = '';
var arm2 = '';
var body = '';
var leg1 = '';
var leg2 = '';
var man = ['', '', '', '', '', ''];
var manChars = ['o', '|', '\\', '/', '/', '\\'];
var guessCount = 0;
var lettersGuessed = [];
const inputRef = React.createRef();

class StyledForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {words: this.props.words, answer: '', answerDisplay: '', answerDisplayMsg: '', guesses: ''};

        this.handleClickInput = this.handleClickInput.bind(this);
        this.handleClickNew = this.handleClickNew.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
    }

    handleClickInput() {
        var doc = document.getElementById('guess');
        doc.select();
    }

    handleGuess() {
        var correctGuess = false;
        var inLettersGuessed = false;
        for (var c of lettersGuessed) {
            if (c == inputRef.current.value.toLowerCase().trim()) {
                inLettersGuessed = true;
            }
        }

        if (inLettersGuessed) {
            return;
        }

        lettersGuessed.push(inputRef.current.value);

        if (this.state.answer.length == 0) {
            // no game
            return;
        }

        if (guessCount === 6) {
            // game over
            return;
        }
        
        inputRef.current.value = inputRef.current.value.trim();
        this.setState({guesses: this.state.guesses + ' ' + inputRef.current.value});

        // update letter board
        var s = this.state.results;
        for (var i = 0; i < this.state.answer.length; i++) {
            if (this.state.answer[i] == inputRef.current.value.toLowerCase()) {
                // show letters
                if (i == 0) {
                    s = this.state.answer[i] + s.substring(1);
                } else {
                    s = s.substring(0, i * 2) + this.state.answer[i] + s.substring(i * 2 + 1);
                }
                correctGuess = true;
            }
        }
        this.setState({results: s});

        // check if all letters are revealed
        var done = !(s.indexOf('_') > -1);
        if (!done) {
            // check if user guessed the whole answer
            done = inputRef.current.value.toLowerCase() == this.state.answer;
            if (done) {
                for (var i = 0; i < this.state.answer.length; i++) {
                    // show letters
                    if (i == 0) {
                        s = this.state.answer[i] + s.substring(1);
                    } else {
                        s = s.substring(0, i * 2) + this.state.answer[i] + s.substring(i * 2 + 1);
                    }
                }
                this.setState({results: s});
            }
        }

        if (!correctGuess) {
            man[guessCount] = manChars[guessCount];
            guessCount++;
        }

        if (done || guessCount === 6) {
            // game over
            var answerString = '';
            for (const c of this.state.answer) {
                answerString += c + ' ';
            }
            answerString.trim();
            this.setState({answerDisplay: answerString, guesses: ''});
            if (done) {
                this.setState({answerDisplayMsg: 'You Won :D'});
            } else {
                this.setState({answerDisplayMsg: 'You Lost :('});
            }
        }
    }

    handleClickNew() {
        var word = this.props.words[Math.floor(Math.random() * this.props.words.length)];
        var result = "";
        for (const c of word) {
            result += '_ ';
        }
        this.setState({results: result, answer: word, answerDisplay: '', answerDisplayMsg: '', guesses: ''});
        guessCount = 0;
        man = ['', '', '', '', '', ''];
        lettersGuessed = [];
    }

    render() {
        return (
            <>
            <h2 className='hangmantop'>&nbsp;</h2>
            <h2 className='hangman'>&nbsp;{man[0]}</h2>
            <h2 className='hangman'>&nbsp;{man[2]}{man[1]}{man[3]}</h2>
            <h2 className='hangman'>&nbsp;{man[4]}{man[5]}</h2>
            <h2 className='hangman'>&nbsp;</h2>
            <form className='forms'>
                <input ref={inputRef} id='guess' className='inputs' type='text' name='name' autoComplete='off' onClick={this.handleClickInput} />
                <div>
                    <input className='buttons' type='button' value='GUESS' onClick={this.handleGuess} />
                    <input className='buttons' type='button' value='NEW' onClick={this.handleClickNew} />
                </div>
            </form>
            <div className='outputs'>&nbsp;</div>
            <div className='outputs'>&nbsp;{this.state.answerDisplay}</div>
            <div className='outputs'>&nbsp;{this.state.results}</div>
            <div>&nbsp;</div>
            <div className='outputs'>&nbsp;{this.state.answerDisplayMsg}</div>
            <div className='outputs'>{this.state.guesses}</div>
            </>
        );
    }
}

export default StyledForm;
export {man};