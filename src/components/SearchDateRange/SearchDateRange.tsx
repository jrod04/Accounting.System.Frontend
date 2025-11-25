import { useState, type MouseEvent, type ChangeEvent } from 'react';
import Button from './../Button/Button.tsx';
import styles from './SearchDateRange.module.css';

interface iSearchDateRange {
    cb_handlerClick: (e: MouseEvent<HTMLButtonElement>) => void;
    cb_handlerCheckError: (e: MouseEvent<HTMLButtonElement>, error: string) => void;
};

const SearchDateRange = ({...searchDateRangeInputs}: iSearchDateRange) => {
    const {
        cb_handlerClick,
        cb_handlerCheckError,
    } = searchDateRangeInputs;

    const [error, setError] = useState<string>('');

    const handlerClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (error === 'fromDate') {
            cb_handlerCheckError(e, 'fromDate');
        } else if (error === 'toDate') {
            cb_handlerCheckError(e, 'toDate');
        } else {
            cb_handlerClick(e);
        };
    };

    const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const ariaLabel = e.target.ariaLabel;
        if (ariaLabel === 'fromDate') {
            const fromDate = new Date(e.target.value);
            const toDate = (document.querySelector('[aria-label="toDate"]') as HTMLInputElement)?.value ?
                           new Date((document.querySelector('[aria-label="toDate"]') as HTMLInputElement)?.value) :
                           undefined;
            if (fromDate && toDate) {
               if (fromDate > toDate) {
                   setError('fromDate')
               } else {
                   setError('');
               };
            };
        } else if (ariaLabel === 'toDate') {
            const toDate = new Date(e.target.value);
            const fromDate = (document.querySelector('[aria-label="fromDate"]') as HTMLInputElement)?.value ?
                             new Date((document.querySelector('[aria-label="fromDate"]') as HTMLInputElement)?.value) :
                             undefined;
            if (toDate && fromDate) {
               if (toDate < fromDate) {
                   setError('toDate')
               } else {
                   setError('');
               };
            };
        };
    };

    return(
        <form role='form' aria-label='Search Date Range Container' className={styles.container}>
            <label htmlFor='fromDate'><strong>From:</strong></label>&nbsp;&nbsp;
            <input aria-label='fromDate'
                   className={error === 'fromDate' ? styles.fromDateError : ''}
                   type='date'
                   onChange={handlerOnChange} />
            <label htmlFor='toDate'><strong>To:</strong></label>&nbsp;&nbsp;
            <input aria-label='toDate'
                   className={error === 'toDate' ? styles.toDateError : ''}
                   type='date'
                   onChange={handlerOnChange} />
            <Button ariaLabel='Search Date Range Button'
                    input={true}
                    id='searchDateRange'
                    value='Search'
                    width={75}
                    cb_handlerClick={handlerClick} />
        </form>
    );
};

export default SearchDateRange;
