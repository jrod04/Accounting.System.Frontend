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
            <div className={`${styles.navPart} ${styles.utils}`}>
                {openSettings && settingsContainer}
                <button aria-label='Settings Button'
                        src={Cog}
                        alt='Settings Button'
                        title='Settings'
                        className={styles.settings}
                        onClick={handlerClick} />
            </div>
        </nav>


    );
};

export default Navigation;
