import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import CreateNew from './../../assets/createNew.svg';
import MagnifyingGlass from './../../assets/magnifyingGlass.svg';
import styles from './AcctDoubleEntryCard.module.css';

const AcctDoubleEntryCard = ({width}) => {
    return(
        <section aria-label='Accounting Double Entry Card'
                 className={styles.card}
                 style={{width: `${width}px`}}>
            <div className={styles.titles}>
                <div className={styles.titleContainer}>
                    <ButtonIcon icon={CreateNew}
                                height={20}
                                width={20} />
                    Debits
                </div>
                <div className={styles.titleContainer}>
                    <ButtonIcon icon={CreateNew}
                        height={20}
                        width={20} />
                    Credits
                </div>
            </div>
            <div className={styles.entryContainer}>
                <div className={styles.debitContainer}>
                    <div className={styles.buttons}>
                        <ButtonIcon icon={MagnifyingGlass}
                                    height={20}
                                    width={20} />
                    </div>
                    <div className={styles.subContainer}>
                        <label htmlFor='debitEntry'></label>
                        <select name='debitEntry' className={styles.accountOptions}>
                            <option value='placeholder'>Placeholder</option>
                        </select>
                    </div>
                    <div className={styles.subContainer}>
                        <input aria-label='Debit Entry Textbox'
                               name='debit'
                               className={styles.entryAmount}
                               type='number'
                               step='0.01' />
                    </div>
                </div>
                <div className={styles.creditContainer}>
                    <div className={styles.buttons}>
                        <ButtonIcon icon={MagnifyingGlass}
                                    height={20}
                                    width={20} />
                    </div>
                    <div className={styles.subContainer}>
                        <select name='creditEntry' className={styles.accountOptions}>
                            <option value='placeholder'>Placeholder</option>
                        </select>
                    </div>
                    <div className={styles.subContainer}>
                        <input aria-label='Credit Entry Textbox'
                               name='credit'
                               className={styles.entryAmount}
                               type='number'
                               step='0.01' />
                    </div>
                </div>
            </div>
            <div className={styles.notes}>
                Notes:&nbsp;&nbsp;
                <textarea name='notes'></textarea>
            </div>
        </section>
    );
};

export default AcctDoubleEntryCard;