import styles from './Card.module.css';

const Card = ({area}: any) => {
    return(
        <section data-testid='card' className={styles.card}>
            {area}
        </section>
    );
};

export default Card;