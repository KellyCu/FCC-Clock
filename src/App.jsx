import React, { Component } from 'react';
import './App.css';
import { useState } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 1500, //time in seconds (25 minutes)
      timerRunning: false, //timer is not running
      timerLabel: "Session",
      timeLeftColor: "white",//Sets the color of the timer;
      breakLength: 5,
      sessionLength: 25,
    };
    this.interval = null; // We'll use this to store the interval ID for the countdown timer
  }

  incrementBreak = () => {
    this.setState((prevState) => ({
      breakLength: Math.min(prevState.breakLength + 1, 60), // Increment but it wont exceed 60 minutes
    }));
  };

  decrementBreak = () => {
    this.setState((prevState) => ({
      breakLength: Math.max(prevState.breakLength - 1, 1), // Decrement but it wont go below 1 minute
    }));
  };

  incrementSession = () => {
    this.setState((prevState) => ({
      timeLeft: Math.min(prevState.timeLeft + 60, 3600), // Increment but it wont exceed 60 minutes
      sessionLength: Math.min(prevState.sessionLength + 1, 60),
    }));
  };

  decrementSession = () => {
    this.setState((prevState) => ({
      timeLeft: Math.max(prevState.timeLeft - 60, 60), // Decrement but it wont go below 1 minute
      sessionLength: Math.max(prevState.sessionLength - 1, 1),//Diff display for the session
    }));
  };

  toggleTimer = () => {
    if (this.state.timerRunning) {
      clearInterval(this.interval); 
    } else {
      this.interval = setInterval(this.tick, 1000);
    }
    this.setState((prevState) => ({
      timerRunning: !prevState.timerRunning,
    }));
  };

  tick = () => {
    if (this.state.timeLeft > 0) {
      this.setState((prevState) => ({
        timeLeft: prevState.timeLeft - 1,
      }));

      if (this.state.timeLeft <= 60) {
        this.setState({
          timeLeftColor: "red",
        });
      }
      else {
        this.setState({
          timeLeftColor: "white",
        })
      }
    }
    else {
      const nextTimer = this.state.timerLabel === 'Session' ? 'Break' : 'Session';
      const timerLength = nextTimer === 'Session' ? this.state.sessionLength : this.state.breakLength;
  
      this.setState({
        timerLabel: nextTimer,
        timeLeft: timerLength * 60, // Set timeLeft to the next timer's length in seconds
      });

      var audio = document.getElementById('beep');
      audio.currentTime =0;
      audio.play();
    }
  };

  resetTimer = () => {
    clearInterval(this.interval);//to stop the timer
    this.setState ({
      timeLeft: 1500, //Resets the time to 25 minutes(1500)
      timerLabel: 'Session',
      timerRunning: false,
      breakLength: 5,
      sessionLength: 25,
    })
    var audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }
  render() {
    return (
      <section id="main">
        <div id="con">
          <div id="breakBox">
            <div id="break-label">Break Length</div>
            <div id="insideCon">
              <div id="break-decrement" onClick={this.decrementBreak}>-</div>
              <div id="break-length">{this.state.breakLength}</div>
              <div id="break-increment" onClick={this.incrementBreak}>+</div>
            </div>
          </div>

          <div id="sessionBox">
            <div id="session-label">Session Length</div>
            <div id="insideCon">
              <div id="session-decrement" onClick={this.decrementSession}>-</div>
              <div id="session-length">{this.state.sessionLength}</div>
              <div id="session-increment" onClick={this.incrementSession}>+</div>
            </div>
          </div>
        </div>

        <div id="disp">
          <div id="timer-label">{this.state.timerLabel}</div>
          <div id="time-left" style={{color:this.state.timeLeftColor}}>
            {this.formatTime(this.state.timeLeft)}
          </div>
        </div>
        <div id="btns">
          <button id="start_stop" onClick={this.toggleTimer}>
            {this.state.timerRunning ? 'Pause' : 'Start'}
          </button>
          <button id="reset" onClick={this.resetTimer}>
            Reset
          </button>
        </div>
        <audio src="https://cdn.freesound.org/previews/346/346573_5121236-lq.mp3" id="beep"></audio>
      </section>
    );
  }


  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  };
}

export default App;
