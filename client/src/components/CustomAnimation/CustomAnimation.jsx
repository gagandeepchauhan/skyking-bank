import React, { useEffect } from 'react';
import { useContext } from 'react';
import styles from './CustomAnimation.module.css';
import { Context as AuthContext } from '../../contexts/AuthContext';
import TypeWriterEffect from 'react-typewriter-effect';


const Title = 'Welcome to skybank';
const Description = "Hi, there! It's just a simple demonstration of how bank works, it has nothing to do with any real bank related operations.";

const CustomAnimation = () => {
    const { addAnimTimestamp } = useContext(AuthContext);

    useEffect(() => {
        let timeout = setTimeout(() => {
            addAnimTimestamp();
        }, 2200 + 50 * (2 * Title.length + Description.length));
        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [])

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
                <div className='py-4'>
                    <TypeWriterEffect
                        textStyle={{ textAlign: "center", fontSize: "1.1rem", lineHeight: "30px" }}
                        startDelay={200 + 100 * Title.length}
                        cursorColor="var(--primary-text-color)"
                        text={Description}
                        typeSpeed={50}
                    />
                </div>
            </div>
        </div>
    )
};

export default CustomAnimation;