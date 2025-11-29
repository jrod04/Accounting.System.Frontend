import { useState, useRef, useEffect, type MouseEvent, type ChangeEvent } from 'react';
import ListView from './../../components/ListView/ListView.tsx';
import { type iListViewGalleryItem } from './../../components/ListViewGallery/ListViewGallery.tsx';
import UtilityContainer from './../../components/UtilityContainer/UtilityContainer.tsx';
import InputSearchTextbox from './../../components/InputSearchTextbox/InputSearchTextbox.tsx';
import InputTextbox from './../../components/InputTextbox/InputTextbox.tsx';
import ButtonIcon from './../../components/ButtonIcon/ButtonIcon.tsx';
import Button from './../../components/Button/Button.tsx';
import Edit from './../../assets/edit.svg';
import Trashcan from './../../assets/trashcan.svg';
import CreateNew from './../../assets/createNew.svg';
import accounts from './../../utils/tmpData.tsx';
import constants from './../../utils/constants.tsx';
import styles from './ChartOfAccounts.module.css';

const ChartOfAccounts = () => {
    const [openAside, setOpenAside] = useState<boolean>(false);
    const [operation, setOperation] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('Search...');

    const galleryHeaders = ['headerLeftOperation', 'Code', 'Account', 'Type', 'headerRightOperation'];
    const [galleryItems, setGalleryItems] = useState<iListViewGalleryItem[]>(accounts);

    const refSearchAccounts = useRef<HTMLInputElement | null>(null);

    const cb_handlerAddAccount = () => {
        if (!openAside) setOpenAside(true);
        setOperation('Add Account')
    };

    const cb_handlerLeftFirstOperation = () => {
        if (!openAside) setOpenAside(true);
        setOperation('Edit Account');
    };

    const cb_handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const cb_handlerOnFocus = (e: MouseEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).value.toLowerCase().trim() === 'search...') setSearchValue('');
    };

    const cb_handlerOnBlur = (e: MouseEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).value.trim() === '') setSearchValue('Search...');
    };

    // TODO
    const cb_handlerSearchDateRange = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    // TODO
    const cb_handlerCheckError = (e: MouseEvent<HTMLButtonElement>, error: string) => {
        e.preventDefault();
    };

    const inputContainers = [
        <div className={styles.inputContainers}>
            <InputSearchTextbox ariaLabel='Chart of Accounts Search'
                                textboxWidth={200}
                                textboxHeight={15}
                                iconWidth={25}
                                iconHeight={25}
                                showImage={true}
                                searchValue={searchValue}
                                ref={refSearchAccounts}
                                cb_handlerOnChange={cb_handlerOnChange}
                                cb_handlerOnFocus={cb_handlerOnFocus}
                                cb_handlerOnBlur={cb_handlerOnBlur} />
            <ButtonIcon ariaLabel='Add Account Icon'
                        icon={CreateNew}
                        width={25}
                        height={25}
                        alt='Add Account'
                        title='Add Account'
                        value=''
                        cb_handlerClick={cb_handlerAddAccount} />
        </div>
    ];

    const handlerCancelAside = () => {
        setOpenAside(false);
        setOperation('');
    };

    const aside = <div className={styles.aside}>
        <div className={styles.title}
             style={{backgroundColor: constants.LIGHT_GRAY}}>
            {operation}
        </div>
        <div className={styles.body}>
            <InputTextbox ariaLabel='Code'
                          width={175}
                          direction='column'
                          errors='' />
            <InputTextbox ariaLabel='Account'
                          width={175}
                          direction='column'
                          errors='' />
            <InputTextbox ariaLabel='Type'
                          width={175}
                          direction='column'
                          errors='' />
        </div>
        <div className={styles.asideBtns}>
            <Button ariaLabel='Form Cancel Button'
                    id='1'
                    value='Cancel'
                    width={75}
                    cb_handlerClick={handlerCancelAside} />
            <Button ariaLabel='Form Submit Button'
                    id='1'
                    value='Submit'
                    width={75}
                    cb_handlerClick={() => {}} />
        </div>
    </div>;

    return(
        <section className={styles.chartOfAccounts}>
            <UtilityContainer backdrop={openAside}
                              ariaLabel='Chart of Accounts'
                              height={40}
                              width={0}
                              justifyContent='flex-end'
                              bgColor={constants.LIGHT_GRAY}
                              inputContainers={inputContainers}
                              border='none' />
            <ListView openAside={openAside}
                      aside={aside}
                      showControls={true}
                      controlInterval={15}
                      searchValue={searchValue}
                      idForm='1'
                      ariaLabel='Chart of Accounts List View'
                      galleryHeaders={galleryHeaders}
                      galleryItems={galleryItems}

                      leftFirstOperationImage={Edit}
                      cb_handlerLeftFirstOperation={cb_handlerLeftFirstOperation}

                      rightFirstOperationImage={Trashcan} />
        </section>
    );
};

export default ChartOfAccounts;