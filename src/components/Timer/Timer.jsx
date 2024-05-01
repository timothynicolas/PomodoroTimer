//REACT HOOKS
import React, { useState, useEffect } from "react";

//ASSETS
import FocusTime from "../../assets/FocusTime.mp3";
import BreakTime from "../../assets/BreakTime.mp3";

//CSS

import style from "./Timer.module.css";

export default function Timer() {

    //TIMERS OF FOCUS TIME AND BREAK TIME
        const [time, setTime] = useState({ 
            minutes: 25, 
            seconds: 0 
        });

        const [breakTime, setBreakTime] = useState({
            minutes: 5,
            seconds: 0
        })
    //

    //TOGGLERS BETWEEN FOCUS STATE AND BREAK STATE
        const [isFocusActive, setFocusIsActive] = useState(false);
        const [isBreakActive, setIsBreakActive] = useState(false);
    //
    
    //NUMBER OF POMODOROS FINISHED
        const [pomodorosFinished, setPomodorosFinished] = useState(0);
    //
    

    useEffect(() => {
        let timerInterval;
        let breakInterval;


        if (isFocusActive) {
            timerInterval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime.seconds === 0) {
                        if (prevTime.minutes === 0) {
                            clearInterval(timerInterval);
                            handleTimerCompletion();        
                            return prevTime; 
                        }
                        return { minutes: prevTime.minutes - 1, seconds: 59 };
                    } else {
                        return { ...prevTime, seconds: prevTime.seconds - 1 };
                    }
                });
            }, 1000);
        }

        if (isBreakActive) {
            breakInterval = setInterval(() => {
                setBreakTime(prevBreakTime => {
                    if (prevBreakTime.seconds === 0) {
                        if (prevBreakTime.minutes === 0) {
                            clearInterval(breakInterval);
                            handleBreakCompletion();
                            return prevBreakTime; 
                        }
                        return { minutes: prevBreakTime.minutes - 1, seconds: 59 };
                    } else {
                        return { ...prevBreakTime, seconds: prevBreakTime.seconds - 1 };
                    }
                });
            }, 1000);
        }
        
        
        return () => {
            clearInterval(timerInterval)
            clearInterval(breakInterval)
        }; 
    }, [isFocusActive]); 

    function handleTimerCompletion() {
        playFocusAlarm();
        console.log(`Focus Time Finished ${pomodorosFinished/2}`);
        setTime({
            minutes: 25,
            seconds:0
        })
        setFocusIsActive(false);
        setIsBreakActive(true); 
    }

    function handleBreakCompletion(){
        playBreakAlarm();
        console.log(`Break Time Finished ${pomodorosFinished/2}` );
        setBreakTime({
            minutes: 5,
            seconds: 0
        })
        setIsBreakActive(false);
        setPomodorosFinished(prevPomodorosFinished => prevPomodorosFinished + 1)
    }

    function initializePomodoro() {
        setFocusIsActive(!isFocusActive); 
    }

    function resetPomodoro(){
        setTime({minutes: 25, seconds: 0})
        setFocusIsActive(false)
    }

    //PLAYS AUDIO WHEN TIMER RUNS OUT
    function playFocusAlarm() {
        const audio = new Audio(FocusTime); 
        audio.play();
    }

    function playBreakAlarm() {
        const audio = new Audio(BreakTime); 
        audio.play();
    }

    //FORMAT TIMER NUMBERS

    function formatToTwoDigits(number){
        if(number < 10){
            return (`0${number}`);
        }else{
            return number;
        }
    }
    

    return (
        <div className={`container ${style.timerContainer}`}>
            <h1>Timer</h1>

            {(!isFocusActive && !isBreakActive) ? 
                <div>
                    <h1>{formatToTwoDigits(time.minutes)} : {formatToTwoDigits(time.seconds)} </h1> 
                </div> 
                : 
                (isFocusActive) ? 
                <div>
                    <h1>{formatToTwoDigits(time.minutes)} : {formatToTwoDigits(time.seconds)}</h1>
                </div> 
                : 
                <div>
                    <h1>{formatToTwoDigits(breakTime.minutes)} : {formatToTwoDigits(breakTime.seconds)}</h1>
                </div>
                
            }
            
            <button className="btn btn-primary" onClick={initializePomodoro}>{isFocusActive ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
            <button className="btn btn-danger" onClick={resetPomodoro}><i className="fa-solid fa-rotate-left"></i></button>
            <p>Number of Pomodoros Finished: {pomodorosFinished / 2}</p>
            
        </div>
    );
}
