import React, { useState, useRef, useEffect, type MouseEvent, type ChangeEvent, type RefObject } from 'react';
import Button from './../Button/Button.tsx';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import InputSearchTextbox from './../InputSearchTextbox/InputSearchTextbox.tsx';
import CreateNew from './../../assets/createNew.svg';
import MagnifyingGlass from './../../assets/magnifyingGlass.svg';
import accounts from './../../utils/tmpData.tsx';
import styles from './JournalEntryCard.module.css';

interface iEntryData {
    account: string | undefined;
    amount: number | undefined;
};

interface iResultData {
    debits: iEntryData[] | [];
    credits: iEntryData[] | [];
};

const JournalEntryCard = ({width, dropdownValues}: {width: number, dropdownValues: [] | undefined}) => {
    const [results, setResults] = useState<iResultData>({debits: [], credits: []});
    const [searchValue, setSearchValue] = useState<string>('Search for account...');
    const [totalDebitAmount, setTotalDebitAmount] = useState<number>(0);
    const [totalCreditAmount, setTotalCreditAmount] = useState<number>(0);
    const [balanced, setBalanced] = useState<boolean>(false);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const refAccount = useRef<HTMLInputElement | null>(null);
    const refAmount = useRef<HTMLInputElement | null>(null);

    let finalDropdownValues = dropdownValues && dropdownValues?.length > 0 ?
       dropdownValues :
       accounts.map(account => ({
           id: account.id,
           value: account.One + ' - ' + account.Two
    }));

    finalDropdownValues = ['','search for account...'].includes(searchValue.trim().toLowerCase()) ?
        finalDropdownValues :
        finalDropdownValues.filter(value => value.value.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));

    const sumTotal = (values: number[]) => {
        const initValue = 0;
        const finalValue = values.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initValue
        );
        return finalValue;
    };

    const cb_handlerSetSearchValue = (searchValue: string) => {
        console.log(searchValue);
        setSearchValue(searchValue);
    };

    const cb_handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const cb_handlerOnFocus = (e: MouseEvent<HTMLInputElement>) => {
        if (e.target.value.toLowerCase().trim() === 'search for account...') setSearchValue('');
    };

    const cb_handlerOnBlur = (e: MouseEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === '') setSearchValue('Search for account...');
    };

    const handlerAddDebit = () => {
        //TODO: One fcn and call in addDebit/Credit => utility fcn
        //TODO: Check if selected searchValue exists, if not: error
        //TODO: Check if entry textbox contains only numerical and . figures, etc., if not: error
        //TODO: Check if entry already exists
        const entry = {
            account: refAccount ? refAccount.current?.value : undefined,
            amount:  refAmount ? Number(refAmount.current?.value) : undefined
        };

        if (entry.account && entry.amount) {
            setResults(prevResults => ({
                ...prevResults,
                debits: prevResults.debits ? [...prevResults.debits, entry] : []
            }));
            setSearchValue('');
            refAmount.current.value = '';
        };
    };

   const handlerAddCredit = () => {
        //TODO: Check if selected searchValue exists, if not: error
        //TODO: Check if entry textbox contains only numerical and . figures, etc., if not: error
        const entry = {
            account: refAccount ? refAccount.current?.value : undefined,
            amount:  refAmount ? Number(refAmount.current?.value) : undefined
        };

        if (entry.account && entry.amount) {
            setResults(prevResults => ({
                ...prevResults,
                credits: prevResults.credits ? [...prevResults.credits, entry] : [entry]
            }));
            setSearchValue('');
            refAmount.current.value = '';
        };
    };

    const handlerClickAttachment = () => {
        const fileInput = document.getElementById('attachments');
        fileInput?.click();
    };

    const handlerOnChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target?.files ? Array.from(e.target.files) : [];
        setFileNames(fileList.map(file => file.name));
    };

    const debitElements = results.debits.map((debit, index) => (
        <tr key={`debit-${index}`}>
            <td className={styles.tblAccount}>{debit.account}</td>
            <td className={styles.tblAmount}>{debit.amount}</td>
            <td></td>
            <td className={styles.tblOperation}></td>
        </tr>
    ));

    const creditElements = results.credits.map((credit, index) => (
        <tr key={`credit-${index}`}>
            <td className={styles.tblAccount}>{credit.account}</td>
            <td></td>
            <td className={styles.tblAmount}>{credit.amount}</td>
            <td className={styles.tblOperation}></td>
        </tr>
    ));

    const entries = <table className={styles.table}>
            <thead>
                <tr>
                    <th>Account</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th className={styles.tblOperation}></th>
                </tr>
            </thead>
        <tbody>
            {debitElements}
            {creditElements}
            <tr>
                <td className={(results.debits.length > 0 || results.credits.length > 0) ? styles.totalAmount : ''}>
                    {(results.debits.length > 0 || results.credits.length > 0) ? <em>Total</em> : ''}
                </td>
                <td className={(results.debits.length > 0 || results.credits.length > 0) ? styles.totalAmount : ''}>
                    {(results.debits.length > 0 || results.credits.length > 0) ?
                        <span style={{color: !balanced ? 'rgba(199,0,57,1)' : 'rgba(0,0,0,1)'}}>
                            {sumTotal(results.debits.map(debit => Number(debit.amount)))}
                        </span> :
                         ''
                    }
                </td>
                <td className={(results.debits.length > 0 || results.credits.length > 0)  ? styles.totalAmount : ''}>
                    {(results.debits.length > 0 || results.credits.length > 0) ?
                        <span style={{color: !balanced ? 'rgba(199,0,57,1)' : 'rgba(0,0,0,1)'}}>
                            {sumTotal(results.credits.map(credit => Number(credit.amount)))}
                        </span> :
                        ''
                    }
                </td>
                <td className={(results.debits.length > 0 || results.credits.length > 0) ? styles.totalAmount : ''}></td>
            </tr>
        </tbody>
    </table>

    useEffect(() => {
        setTotalDebitAmount(sumTotal(results.debits.map(debit => Number(debit.amount))));
        setTotalCreditAmount(sumTotal(results.credits.map(credit => Number(credit.amount))));
    },[results]);

    useEffect(() => {
        setBalanced(totalDebitAmount === totalCreditAmount);
    },[totalDebitAmount, totalCreditAmount]);

    return(
        <section aria-label='Accounting Double Entry Card'
                 className={styles.card}
                 style={{width: `${width}px`}}>
            <div className={styles.title}>
                Journal Entry
            </div>
            <div className={styles.date}>
                <input aria-label='Date Textbox'
                       type='date' />
            </div>
            <div className={styles.entries}>
                <div className={styles.accountButton}>
                    <ButtonIcon icon={MagnifyingGlass}
                                ariaLabel='Search Accounts Icon'
                                alt='Search Icon'
                                title='Search Icon'
                                height={20}
                                width={20} />
                </div>
                <div className={styles.accountContainer}>
                    <InputSearchTextbox ariaLabel='Account Search Textbox'
                                        searchValue={searchValue}
                                        dropdownValues={finalDropdownValues}
                                        dropdownWidth={218}
                                        dropdownHeight={190}
                                        showImage={false}
                                        ref={refAccount}
                                        cb_handlerOnChange={cb_handlerOnChange}
                                        cb_handlerOnFocus={cb_handlerOnFocus}
                                        cb_handlerOnBlur={cb_handlerOnBlur}
                                        cb_handlerSetSearchValue={cb_handlerSetSearchValue} />
                </div>
                <div className={styles.entryContainer}>
                    $&nbsp;
                    <input aria-label='Entry Textbox'
                           name='credit'
                           className={styles.entryAmount}
                           type='number'
                           step='0.01'
                           ref={refAmount} />
                </div>
                <div className={styles.entryButtonContainer}>
                    <Button id='debitEntryButton'
                            ariaLabel='Debit Entry'
                            value='Debit'
                            width={50}
                            cb_handlerClick={handlerAddDebit} />
                    <Button id='creditEntryButton'
                            ariaLabel='Credit Entry'
                            value='Credit'
                            width={50}
                            cb_handlerClick={handlerAddCredit} />
                </div>
            </div>
            <div className={styles.results}>
                {entries}
            </div>
            <div className={styles.notes}>
                Notes:&nbsp;&nbsp;
                <textarea name='notes'></textarea>
            </div>
            <div className={styles.inputFile}>
                <Button id='attachmentsButton'
                        ariaLabel='Attachments'
                        value='Attachments'
                        width={100}
                        cb_handlerClick={handlerClickAttachment} />
                &nbsp;&nbsp;
                <div className={styles.fileNames}>
                    {(fileNames.length > 0) &&
                        fileNames.map(fileName => (
                            <li key={fileName}>
                                {fileName}
                            </li>
                            ))
                    }
                </div>
                <input type='file'
                       name='attachments'
                       id='attachments'
                       onChange={handlerOnChangeFiles}
                       multiple />
            </div>
            <div>
                <div className={styles.submissionButtonContainer}>
                    <Button id='cancelEntryButton'
                            ariaLabel='Cancel Button'
                            value='Cancel'
                            width={50}
                            cb_handlerClick={() => {}} />
                    <Button id='submitEntryButton'
                            ariaLabel='Submit Button'
                            value='Submit'
                            width={50}
                            cb_handlerClick={() => {}} />
                </div>
            </div>
        </section>
    );
};

export default JournalEntryCard;
