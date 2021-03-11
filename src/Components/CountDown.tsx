import React, {useContext} from "react";
import {CountdownContext} from "../contexts/CountdownContext";

import styles from '../styles/components/CountDown.module.css';

export function CountDown() {

    const { 
        hasFinished, 
        isActive, 
        minutes, 
        seconds, 
        progress, 
        resetCountDown, 
        startCountDown 
    } = useContext(CountdownContext);
    
    // Variables for layout
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');
    
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            
            { hasFinished ? (
                <>
                    <button
                        className={styles.countdownButton}
                        disabled >
                        Ciclo encerrado&nbsp;<img src="icons/check.svg" alt="checked" />
                    </button>
                    <div className={styles.countdownButtonBarCompleted} />
                </>
            ) : (
                <>
                    {
                        !isActive ?
                            <button
                                type="button"
                                className={styles.countdownButton}
                                onClick={startCountDown}>
                                Iniciar um Ciclo
                            </button>
                            :
                            <>
                                <button
                                    type="button"
                                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                    onClick={resetCountDown}>
                                    Abandonar ciclo&nbsp;<img src="icons/close.svg" alt="checked" />
                                </button>
                                <div className={styles.countdownButtonBarShadow} />
                                <div className={styles.countdownButtonBar} style={{ width: `${progress}px` }} />
                            </>
                    }
                </>
            ) }
        </div>
    )    
}
