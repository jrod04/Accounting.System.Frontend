import styles from './AcctDoubleEntryCard.module.css';

const AcctDoubleEntryCard = () => {
    return(
        <section aria-label='Accounting Double Entry Card' className={styles.card}>
            <div className={styles.container}>
                <div className={styles.debit}>
                    <select name='debitEntry' className={styles.entry}>
                        <option value='placeholder'>Placeholder</option>
                    </select>
                    <input aria-label='Debit Entry Textbox'
                           name='debit'
                           type='number'
                           step='0.01' />
                </div>
                <div className={styles.debit}>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.credit}>
                    <select name='creditEntry' className={styles.entry}>
                        <option value='placeholder'>Placeholder</option>
                    </select>
                    <input aria-label='Credit Entry Textbox'
                           name='credit'
                           type='number'
                           step='0.01' />
                </div>
                <div className={styles.credit}>

                </div>
            </div>
        </section>
    );
};

export default AcctDoubleEntryCard;