import { useState, useRef, useEffect, type MouseEvent } from 'react';
import Navigation from './../../components/Navigation/Navigation.tsx';
import VerticalGallery from './../../components/VerticalGallery/VerticalGallery.tsx';
import Backdrop from './../../components/Backdrop/Backdrop.tsx';
import Card from './../../components/Card/Card.tsx';
import CreateNew from './../../assets/CreateNew.svg';
import Notify from './../../components/Notify/Notify.tsx';
import InputTextbox from './../../components/InputTextbox/InputTextbox.tsx';
import Button from './../../components/Button/Button.tsx';
import ButtonIcon from './../../components/ButtonIcon/ButtonIcon.tsx';
import ChartOfAccounts from './../../views/ChartOfAccounts/ChartOfAccounts.tsx';
import LedgerIcon from './../../assets/ledger.svg';
import ChartOfAccountsIcon from './../../assets/chartOfAccounts.svg';
import FinancialStatementsIcon from './../../assets/financialStatements.svg';
import Home from './../../assets/home.svg';

import LedgerView from './../LedgerView/LedgerView.tsx';

import styles from './MainView.module.css';

const items = [{id: '1', title: 'Reliable Rental Properties in Michigan, LLC', subtitle: ''},
              {id: '2', title: 'Reliable Rental Properties in North Carolina, LLC', subtitle: ''}];

const MainView = () => {
    const [notify, setNotify] = useState<boolean>(false);
    const [addBusiness, setAddBusiness] = useState<boolean>(false);
    const [view, setView] = useState<string>('Home');

    const refInputTextbox = useRef<HTMLInputElement | null>(null);

    const cb_handlerCloseNotify = (): void => {
        setNotify(false);
    };

    const handlerToggleAddBusiness = (): void => {
        setAddBusiness(!addBusiness);
    };

    const cb_handlerToggleAddBusiness = handlerToggleAddBusiness;

    const handlerSetView = (e: MouseEvent<HTMLButtonElement>) => {
        console.log(e);
        setView((e.target as HTMLButtonElement).title);
    };

    const frmAddBusinessArea = <form className={styles.frmAddBusiness}>
        <div className={styles.frmInputArea}>
            <InputTextbox ariaLabel='' width={175} direction='column' errors='' ref={refInputTextbox} />
        </div>
        <div className={styles.frmButtons}>
            <Button ariaLabel='Add Business Form Cancel Button'
                    id='1'
                    value='Cancel'
                    width={75}
                    cb_handlerClick={cb_handlerToggleAddBusiness} />
            <Button ariaLabel='Add Business Form Submit Button'
                    id='1'
                    value='Submit'
                    width={75}
                    cb_handlerClick={() => {}} />
        </div>
    </form>;

    const cards = items.map(item =>
       <div className={styles.cards} key={item.title}>
            <Card area={<button className={styles.cardButton}
                                onClick={handlerSetView}
                                title={item.title}>{item.title}</button>} />
       </div>
    );

    const businessName = !['Home', 'Chart Of Accounts', 'Add Business'].includes(view) ? ` - ${view}` : '';

    useEffect(() => {
        if (refInputTextbox.current) refInputTextbox.current.focus();
    });
//                         {view === 'Home' && cards}
//                         {view === 'Chart of Accounts' && <ChartOfAccounts />}
   return(
        <>
            <Backdrop backdrop={addBusiness} loader={false}>
                {notify &&
                    <Notify stat='success' message='Success!' cb_handlerCloseNotify={cb_handlerCloseNotify} />
                }
                <div className={styles.nav}>
                    <Navigation title={`Accounting Suite${businessName}`} />
                </div>

                <section className={styles.mainView}>
                    <div className={styles.options}>
                        <ButtonIcon ariaLabel='Home Icon Button'
                                    icon={Home}
                                    width={30}
                                    height={30}
                                    alt='Home'
                                    title='Home'
                                    value='Home'
                                    textSide='right'
                                    addTextSpace='right'
                                    cb_handlerClick={handlerSetView} />
                        {['Home', 'Chart of Accounts', 'Add Business'].includes(view) &&
                            <div className={styles.suboptions}>
                                <ButtonIcon ariaLabel='Add Business Icon Button'
                                            icon={CreateNew}
                                            width={25}
                                            height={25}
                                            alt='Add Business'
                                            title='Add Business'
                                            value='Add Business'
                                            textSide='right'
                                            addTextSpace='right'
                                            cb_handlerClick={cb_handlerToggleAddBusiness} />
                                <ButtonIcon ariaLabel='Chart of Accounts Icon Button'
                                            icon={ChartOfAccountsIcon}
                                            width={25}
                                            height={25}
                                            alt='Chart of Accounts'
                                            title='Chart of Accounts'
                                            value='Chart of Accounts'
                                            textSide='right'
                                            addTextSpace='right'
                                            cb_handlerClick={handlerSetView} />
                            </div>
                        }
                        {!['Home', 'Chart of Accounts', 'Add Business'].includes(view) &&
                            <>
                                <ButtonIcon ariaLabel='Ledger Icon Button'
                                            icon={LedgerIcon}
                                            width={30}
                                            height={30}
                                            alt='Ledger'
                                            title='Ledger'
                                            value='Ledger'
                                            textSide='right'
                                            addTextSpace='right'
                                            cb_handlerClick={ () => {} } />
                                <ButtonIcon ariaLabel='Financial Statements'
                                            icon={FinancialStatementsIcon}
                                            width={30}
                                            height={30}
                                            alt='Financial Statements'
                                            title='Financial Statements'
                                            value='Financial Statements'
                                            textSide='right'
                                            addTextSpace='right'
                                            cb_handlerClick={ ()=>{} } />
                            </>
                        }
                    </div>
                    <div className={styles.mainContainer}>
                        {view === 'Home' && cards}
                        {view === 'Chart of Accounts' && <ChartOfAccounts />}
                    </div>
                    {addBusiness &&
                        <section className={styles.frmVerticalGallery}>
                            <VerticalGallery galleryItems={items}
                                             verticalGalleryTitle='Enter Business Name'
                                             title={true}
                                             subtitle={true}
                                             gallery={false}
                                             verticalGallery={true}
                                             events={false}
                                             actionItems={false}
                                             area={frmAddBusinessArea}
                                             bodyStyle='columns'
                                             enableSelect={false} />
                        </section>
                    }
                </section>
            </Backdrop>
        </>
  );
};

export default MainView;

//TODO: Add refInputTextbox to addBusinessVerticalGallery