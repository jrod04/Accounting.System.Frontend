import { useState } from 'react';
import JournalEntryCard from './../../components/JournalEntryCard/JournalEntryCard.tsx';
import styles from './LedgerView.module.css';

const LedgerView = () => {
    const [numberEntries,setNumberEntries] = useState<number>(1);


    const form = <form className={styles.frmEntries}>

    </form>

    return(
        <article className={styles.ledger}>
            <JournalEntryCard width={500} dropdownValues={[]} />
        </article>
    );
};

export default LedgerView;