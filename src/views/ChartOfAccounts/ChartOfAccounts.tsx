import { useState, useEffect, type MouseEvent, type ChangeEvent, type FocusEvent } from 'react';
import ListView from './../../components/ListView/ListView.tsx';
import { type iListViewGalleryItem } from './../../components/ListViewGallery/ListViewGallery.tsx';
import UtilityContainer from './../../components/UtilityContainer/UtilityContainer.tsx';
import InputSearchTextbox from './../../components/InputSearchTextbox/InputSearchTextbox.tsx';
import ButtonIcon from './../../components/ButtonIcon/ButtonIcon.tsx';
import Edit from './../../assets/edit.svg';
import Trashcan from './../../assets/trashcan.svg';
import CreateNew from './../../assets/createNew.svg';
import accounts from './../../utils/tmpData.tsx';
import constants from './../../utils/constants.tsx';
import styles from './ChartOfAccounts.module.css';

const ChartOfAccounts = () => {
    const [openAside, setOpenAside] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('Search...');

    const galleryHeaders = ['headerLeftOperation', 'Code', 'Account', 'Type', 'headerRightOperation'];
    const galleryColumns = ['One', 'Two', 'Three'];
    const [galleryItems, setGalleryItems] = useState<iListViewGalleryItem[]>(accounts);

    const aside = <div className={styles.aside}>Placeholder</div>;

    const cb_handlerAddAccount = () => {
        if (!openAside) setOpenAside(true);
    };

    const cb_handlerLeftFirstOperation = () => {
        if (!openAside) setOpenAside(true);
    };

    const cb_handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const cb_handlerOnFocus = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.toLowerCase().trim() === 'search...') {
           setSearchValue('');
           console.log(e);
        };
    };

    const cb_handlerOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === '') setSearchValue('Search...');
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

    useEffect(() => {
        if (searchValue !== 'Search...') {
            const filteredItems = accounts.filter(account => account.Two.toLowerCase().includes(searchValue.toLowerCase()));
            setGalleryItems(filteredItems);
        };
    },[searchValue]);

    return(
        <section className={styles.chartOfAccounts}>
            <UtilityContainer label='Chart of Accounts'
                              height={20}
                              width={0}
                              justifyContent='flex-end'
                              bgColor={constants.LIGHT_GRAY}
                              inputContainers={inputContainers}
                              border='none' />
            <ListView openAside={openAside}
                      aside={aside}
                      idForm='1'
                      ariaLabel='Chart of Accounts List View'
                      galleryHeaders={galleryHeaders}
                      galleryColumns={galleryColumns}
                      galleryItems={galleryItems}

                      leftFirstOperationImage={Edit}
                      cb_handlerLeftFirstOperation={cb_handlerLeftFirstOperation}

                      rightFirstOperationImage={Trashcan} />
        </section>
    );
};

export default ChartOfAccounts;