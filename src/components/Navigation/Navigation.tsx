// import { Link } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import Cog from './../../assets/cog.svg';
import styles from './Navigation.module.css';

const Navigation = ({title}: {title: string}) => {
    const [openSettings, setOpenSettings] = useState<boolean>(false);
//     const settings: readonly string[] = ['/logout:Log Out'];
//     TODO: Update settings container

    const handlerClick = () => {
        setOpenSettings(!openSettings);
    };

    window.addEventListener('click', function(e: Event) {
        if ((e.target as HTMLElement).title === 'Settings') return;
        setOpenSettings(false);
    });

    const settingsContainer: React.ReactNode =
        <div data-testid='settingsContainer' className={styles.settingsContainer}>
            Settings Placeholder
        </div>;



    return(
        <nav className={styles.nav}>
            <div className={`${styles.navPart} ${styles.title}`} >
                {title}
            </div>
            {openSettings && settingsContainer}
            <div className={`${styles.navPart} ${styles.utils}`}>
            <button aria-label='Settings Button' className={styles.settings} onClick={handlerClick}>
                <img src={Cog} className={styles.cog} alt='Settings Button Image' title='Settings' />
            </button>
            </div>
        </nav>


    );
};

export default Navigation;
