import React from 'react';
import styles from './Card.module.css';

interface iCard {
    area: React.ReactNode;
};

const Card = ({area}: iCard) => {
    return(
        <section data-testid='card' className={styles.card}>
            {area}
        </section>
    );
};

export default Card;