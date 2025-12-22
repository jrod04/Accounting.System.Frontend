import React, { useState, useRef, useEffect, type MouseEvent, type FocusEvent, type ChangeEvent } from 'react';
import Button from './../Button/Button.tsx';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import InputSearchTextbox from './../InputSearchTextbox/InputSearchTextbox.tsx';
import CreateNew from './../../assets/createNew.svg';
import MagnifyingGlass from './../../assets/magnifyingGlass.svg';
import Trashcan from './../../assets/trashcan.svg';
import accounts from './../../utils/tmpData.tsx';
import {sumTotal, insertCommas} from './../../utils/helpers.tsx';
import styles from './JournalEntryCard.module.css';

interface iEntryData {
    account: string | undefined;
    amount: number | undefined;
};

interface iResultData {
    debits: iEntryData[] | [];
    credits: iEntryData[] | [];
};

type tResultKey = keyof iResultData;

type tDropdownValue = {
    id: string;
    value: string;
};

interface iJournalEntryCard {
    width: number;
    dropdownValues: tDropdownValue[] | undefined;
    cb_handlerCancel: () => void;
    cb_handlerSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
};

type tErrors = {
    account: string;
    amount: string;
    entryExists: string;
};

const JournalEntryCard = ({...journalCardEntryProps}: iJournalEntryCard) => {
    const {
        width,
        dropdownValues,
        cb_handlerSubmit,
        cb_handlerCancel
    } = journalCardEntryProps;

    const [results, setResults] = useState<iResultData>({debits: [], credits: []});
    const [searchValue, setSearchValue] = useState<string>('Search for account...');
    const [totalDebitAmount, setTotalDebitAmount] = useState<number>(0);
    const [totalCreditAmount, setTotalCreditAmount] = useState<number>(0);
    const [balanced, setBalanced] = useState<boolean>(false);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [errors, setErrors] = useState<tErrors>({account: '', amount: '', entryExists: ''});

    const refDate = useRef<HTMLInputElement | null>(null);
    const refAccount = useRef<HTMLInputElement | null>(null);
    const refAmount = useRef<HTMLInputElement | null>(null);

    let finalDropdownValues: tDropdownValue[] = dropdownValues && dropdownValues?.length > 0 ?
       dropdownValues :
       accounts.map(account => ({
           id: account.id,
           value: account.One + ' - ' + account.Two
    }));

    finalDropdownValues = ['','search for account...'].includes(searchValue.trim().toLowerCase()) ?
        finalDropdownValues :
        finalDropdownValues.filter(value => value.value.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));

    const cb_handlerSetSearchValue = (searchValue: string) => {
        setSearchValue(searchValue);
    };

    const cb_handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const cb_handlerOnFocus = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === 'Search for account...') setSearchValue('');
    };

    const cb_handlerOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === '') setSearchValue('Search for account...');
    };

    const cb_handlerDeleteEntry = (e: MouseEvent<HTMLButtonElement>) => {
        const id = ((e.target as HTMLButtonElement).dataset.id);
        if (!id) return;

        const [rawType, account] = id.split(':');
        if (!account) return;

        const type: tResultKey = rawType === 'debits' ? 'debits' : 'credits';
        const otherType: tResultKey = rawType === 'debits' ? 'credits' : 'debits';

        setResults(prevResults => ({
                debits: type === 'debits' ? prevResults.debits.filter(result => result.account !== account) : prevResults.debits,
                credits: type === 'credits' ? prevResults.credits.filter(result => result.account !== account) : prevResults.credits
            })
        );
    };

    const handlerSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        cb_handlerSubmit(e);
    };

    const handlerClickAttachment = () => {
        const fileInput = document.getElementById('attachments');
        fileInput?.click();
    };

    const handlerOnChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target?.files ? Array.from(e.target.files) : [];
        // TODO: Add directory to fileName
        setFileNames(fileList.map(file => file.name));
    };

    const handlerOnChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        if (refAmount.current) {
            const newAmount = refAmount.current.value.replace(/[a-zA-Z ]/, '');
            refAmount.current.value = newAmount;
            setErrors({amount: '', account: '', entryExists: ''});
        };
    };

    const checkEntries = () => {
        const localErrors = {amount: '', account: '', entryExists: ''};
        let errorCheck = false;

        // Check if valid account exists
        if (finalDropdownValues && (finalDropdownValues.filter(value => value.value === refAccount.current?.value).length === 0)) {
            localErrors.account = 'Account does not exist.';
            errorCheck = true;
        };

        // Check if entry textbox contains only numerical and . figures, etc., if not: error
        const amountPattern = /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/;
        if (refAmount.current?.value) {
            if (!amountPattern.test(refAmount.current.value)) {
                localErrors.amount = 'Must be: 123,456.78.';
                errorCheck = true;
            };
        };

        // Check if journal entry already exists in the current context
        const existingDebitAccount = results.debits.filter(result => result.account === refAccount.current?.value).length > 0;
        const existingCreditAccount = results.credits.filter(result => result.account === refAccount.current?.value).length > 0;
        if (existingDebitAccount || existingCreditAccount) {
            localErrors.entryExists = 'That account already exists in the journal entries.';
            errorCheck = true;
        };

        if (errorCheck) {
            setErrors(localErrors);
            return true;
        };
    };

    const handlerAddDebit = () => {
        const error = checkEntries();
        if (error) return;

        const entry = {
            account: refAccount ? refAccount.current?.value : '',
            amount:  refAmount ? Number(Number(refAmount.current?.value.replace(/,/g, '')).toFixed(2)) : 0
        };

        if (entry.account && entry.amount) {
            setResults(prevResults => ({
                ...prevResults,
                debits: [...prevResults.debits, entry]
            }));
            setSearchValue('');

            if (refAmount.current) refAmount.current.value = '';

            setErrors({amount: '', account: '', entryExists: ''});
        };
    };

   const handlerAddCredit = () => {
        const error = checkEntries();
        if (error) return;

        const entry = {
            account: refAccount ? refAccount.current?.value : '',
            amount:  refAmount ? Number(Number(refAmount.current?.value.replace(/,/g, '')).toFixed(2)) : 0
        };

        if (entry.account && entry.amount) {
            setResults(prevResults => ({
                ...prevResults,
                credits: [...prevResults.credits, entry]
            }));
            setSearchValue('');

            if (refAmount.current) refAmount.current.value = '';

            setErrors({amount: '', account: '', entryExists: ''});
        };
    };

    const debitElements = results.debits.map((debit, index) => (
        <tr key={`debits:${index}`}>
            <td className={styles.tblAccount}>{debit.account}</td>
            <td className={styles.tblAmount}>{insertCommas(Number(debit.amount))}</td>
            <td></td>
            <td className={styles.tblOperation}>
                <ButtonIcon icon={Trashcan}
                            ariaLabel='Delete debit entry'
                            alt='Trashcan Icon'
                            title='Delete Journal Entry'
                            height={20}
                            width={20}
                            id={`debits:${debit.account}`}
                            cb_handlerClick={cb_handlerDeleteEntry} />
            </td>
        </tr>
    ));

    const creditElements = results.credits.map((credit, index) => (
        <tr key={`credits:${index}`}>
            <td className={styles.tblAccount}>{credit.account}</td>
            <td></td>
            <td className={styles.tblAmount}>{insertCommas(Number(credit.amount))}</td>
            <td className={styles.tblOperation}>
                <ButtonIcon icon={Trashcan}
                            ariaLabel='Delete credit entry'
                            alt='Trashcan Icon'
                            title='Delete Journal Entry'
                            height={20}
                            width={20}
                            id={`credits:${credit.account}`}
                            cb_handlerClick={cb_handlerDeleteEntry} />
            </td>
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
                            {insertCommas(sumTotal(results.debits.map(debit => debit.amount ? debit.amount : 0)))}
                        </span> :
                         ''
                    }
                </td>
                <td className={(results.debits.length > 0 || results.credits.length > 0)  ? styles.totalAmount : ''}>
                    {(results.debits.length > 0 || results.credits.length > 0) ?
                        <span style={{color: !balanced ? 'rgba(199,0,57,1)' : 'rgba(0,0,0,1)'}}>
                            {insertCommas(sumTotal(results.credits.map(credit => credit.amount ? credit.amount : 0)))}
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

    useEffect(() => {
        if (refAccount.current) refAccount.current.value = searchValue;
    },[searchValue]);

    return(
        <section aria-label='Journal Entry Card'
                 className={styles.card}
                 style={{width: `${width}px`}}>
            <div className={styles.title}>
                Journal Entry
            </div>
            <div className={styles.date}>
                <input aria-label='Date Textbox'
                       type='date'
                       ref={refDate} />
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
                                        errors={errors.account}
                                        dropdownValues={finalDropdownValues}
                                        showImage={false}
                                        ref={refAccount}
                                        cb_handlerOnChange={cb_handlerOnChange}
                                        cb_handlerOnFocus={cb_handlerOnFocus}
                                        cb_handlerOnBlur={cb_handlerOnBlur}
                                        cb_handlerSetSearchValue={cb_handlerSetSearchValue} />
                </div>
                <div className={styles.entryContainer}>
                    <input aria-label='Amount Entry Textbox'
                           name='amountTextbox'
                           className={styles.entryAmount}
                           type='text'
                           onChange={handlerOnChangeAmount}
                           autoComplete='off'
                           ref={refAmount} />
                    {errors.amount &&
                        <div data-testid='Amount error container'
                             className={styles.errors}
                             style={{color: 'rgba(199,0,57,1)'}}>
                             {errors.amount}
                        </div>
                    }
                </div>
                <div className={styles.entryButtonContainer}>
                    <Button id='debitEntryButton'
                            ariaLabel='Debit Entry Button'
                            value='Debit'
                            width={50}
                            cb_handlerClick={handlerAddDebit} />
                    <Button id='creditEntryButton'
                            ariaLabel='Credit Entry Button'
                            value='Credit'
                            width={50}
                            cb_handlerClick={handlerAddCredit} />
                </div>
            </div>
            <div className={styles.results}>
                {entries}
                {errors.entryExists &&
                    <div aria-label='Entry exists error container'
                         className={styles.entryExistsContainer}>
                         {errors.entryExists}
                    </div>
                }
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
                            ariaLabel='Journal Entry Cancel Button'
                            value='Cancel'
                            width={50}
                            cb_handlerClick={cb_handlerCancel} />
                    <Button id='submitEntryButton'
                            ariaLabel='Journal Entry Submit Button'
                            value='Submit'
                            width={50}
                            cb_handlerClick={handlerSubmit} />
                </div>
            </div>
        </section>
    );
};

export default JournalEntryCard;
