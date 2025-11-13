// import { Link } from 'react-router-dom';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Cog from './../../assets/cog.svg';
import styles from './Navigation.module.css';

const Navigation = ({title}: {title: string}) => {
//     const settings: readonly string[] = ['/logout:Log Out'];
//     TODO: Update settings container

    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const [test, setTest] = useState<boolean>(false);

    const handlerClick = () => {
        setOpenSettings(!openSettings);
    };

    const settingsContainer: React.ReactNode =
        <div data-testid='settingsContainer' className={styles.settingsContainer}>
            Settings Placeholder
        </div>;

    useEffect(() => {
        const handlerOutsideClick = (e: MouseEvent) => {
            if (e.target) {
                if ((e.target as HTMLElement).title === 'Settings') return;
            };
            setOpenSettings(false);
        };

        window.addEventListener('click', handlerOutsideClick);

        return () => {
            window.removeEventListener('click', handlerOutsideClick);
        };
    },[]);

    return(
        <nav className={styles.nav}>
            <div data-testid='title' className={`${styles.navPart} ${styles.title}`} title='title'>
                {title}
            </div>
            <div className={`${styles.navPart} ${styles.utils}`}>
                {openSettings && settingsContainer}
                <button onClick={handlerClick}
                        style={{backgroundImage: `url("${Cog}")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '20px 20px',
                                backgroundPosition: 'center left 10px'}}
                        title='Settings Button'
                        className={styles.settings} />
            </div>
        </nav>
    );
};

export default Navigation;
