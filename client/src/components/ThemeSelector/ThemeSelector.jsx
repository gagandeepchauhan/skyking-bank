import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from './ThemeSelector.module.css';

const StyleProps = [
    'text-color',
    'bg-color',
    'link-color',
    'border',
    'btn-border',
    'btn-text-color',
    'btn-bg-color'
];

const ThemeSelector = () => {
    const [darkTheme, setDarkTheme] = useState(true);

    const changeTheme = (theme, root, rootStyles) => {
        for (let styleProp of StyleProps) {
            root.style.setProperty(`--primary-${styleProp}`, rootStyles.getPropertyValue(`--${theme}-${styleProp}`));
        }
    }

    const switchTheme = () => {
        const root = document.querySelector(':root');
        const rootStyles = getComputedStyle(root);

        if (darkTheme) {
            changeTheme('dark', root, rootStyles);
        } else {
            changeTheme('light', root, rootStyles);
        }
    }

    useEffect(() => {
        switchTheme();
    }, [darkTheme]);

    return (
        <div className={styles.themeSelector}>
            <button
                className='sky-round-btn'
                onClick={() => setDarkTheme(prev => !prev)}
            >
                {darkTheme
                    ? <i className="fa-solid fa-moon"></i>
                    : <i className="fa-solid fa-sun"></i>
                }
            </button>
        </div>
    )
};

export default ThemeSelector;