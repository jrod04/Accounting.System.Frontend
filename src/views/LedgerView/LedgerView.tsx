import { useState } from 'react';
import AcctDoubleEntryCard from './../../components/AcctDoubleEntryCard/AcctDoubleEntryCard.tsx';
import styles from './LedgerView.module.css';

const LedgerView = () => {
    const [numberEntries,setNumberEntries] = useState<number>(1);


    const form = <form className={styles.frmEntries}>

    </form>

    return(
        <article className={styles.ledger}>
            <AcctDoubleEntryCard width={500} dropdownValues={[]} />
        </article>
    );
};

export default LedgerView;