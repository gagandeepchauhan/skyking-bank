import React, { useEffect } from 'react';
import { useContext } from 'react';
import styles from './CustomAnimation.module.css';
import { Context as AuthContext } from '../../contexts/AuthContext';
import TypeWriterEffect from 'react-typewriter-effect';
import { useState } from 'react';
import sound from '../../assets/sound.mp3';


const Title = 'Welcome to skybank';
const Description = "Hi, there! It's just a simple demonstration of how bank works, it has nothing to do with any real bank related operations.";

const CustomAnimation = () => {
    const { addAnimTimestamp } = useContext(AuthContext);
    const [startAnim, setStartAnim] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        let timeout;
        timeout = setTimeout(() => {
            setShowBtn(true);
        }, 600 + 100 * (Title.length));
        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [])

    useEffect(() => {
        let timeout;
        if (startAnim) {
            let audio = new Audio(sound);
            audio.play();
            timeout = setTimeout(() => {
                audio.pause();
            }, 600 + 50 * (Description.length));
            timeout = setTimeout(() => {
                audio.pause();
                addAnimTimestamp();
            }, 2100 + 50 * (Description.length));
        }
        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [startAnim])

    return (
        <div className={styles.container}>
            <div className='container text-center'>
                <div>
                    <TypeWriterEffect
                        textStyle={{ textAlign: "center", fontSize: "3rem" }}
                        startDelay={100}
                        cursorColor="transparent"
                        text={Title}
                        typeSpeed={100}
                    />
                </div>
                {showBtn && !startAnim &&
                    <div className='mt-3'>
                        <button
                            onClick={() => setStartAnim(true)}
                            className='sky-btn'
                        >
                            Go ahead
                        </button>
                    </div>
                }
                {startAnim &&
                    <div className='py-4'>
                        <TypeWriterEffect
                            textStyle={{ textAlign: "center", fontSize: "1.1rem", lineHeight: "30px" }}
                            startDelay={150}
                            cursorColor="var(--primary-text-color)"
                            text={Description}
                            typeSpeed={50}
                        />
                    </div>
                }
            </div>
        </div>
    )
};

export default CustomAnimation;