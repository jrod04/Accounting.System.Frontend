// import { Link } from 'react-router-dom';
// import React from 'react';
import { useState } from 'react';
import Cog from './../../assets/cog.svg';
import styles from './Navigation.module.css';

const Navigation = ({title}: {title: string}) => {
    const [openSettings, setOpenSettings] = useState<boolean>(false);
//     const settings: readonly string[] = ['/logout:Log Out'];

    window.addEventListener('click', function(e: Event) {
        if ((e.target as HTMLElement).title === 'Settings') return;
        setOpenSettings(false);
    });

    return(
        <nav className={styles.nav}>
            <div className={`${styles.navPart} ${styles.title}`} >
                {title}
            </div>
            <div className={`${styles.navPart} ${styles.utils}`}>
                {openSettings &&
                    <div className={styles.settingsContainer}>

                    </div>
                }
                <button className={styles.settings}>
                    <img src={Cog} className={styles.cog} alt='Settings' title='Settings' />
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
