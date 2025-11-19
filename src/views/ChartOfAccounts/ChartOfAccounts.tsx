import { useState } from 'react';
import ListView from './../../components/ListView/ListView.tsx';
import { type iListViewGalleryItem } from './../../components/ListViewGallery/ListViewGallery.tsx';
import Edit from './../../assets/edit.svg';
import Trashcan from './../../assets/trashcan.svg';
import CreateNew from './../../assets/createNew.svg';
import accounts from './../../utils/tmpData.tsx';
import styles from './ChartOfAccounts.module.css';

const ChartOfAccounts = () => {
    const [openAside, setOpenAside] = useState<boolean>(false);

    const galleryHeaders = ['headerLeftOperation', 'Code', 'Account', 'Type', 'headerRightOperation'];
    const galleryColumns = ['One', 'Two', 'Three'];
    const galleryItems: iGalleryItem[] = accounts;

    const aside = <div className={styles.aside}>Placeholder</div>;

    const cb_handlerLeftHeaderOperation = () => {
        if (!openAside) setOpenAside(true);
    };

    return(
        <section className={styles.chartOfAccounts}>
            <ListView openAside={openAside}
                      aside={aside}
                      idForm='1'
                      ariaLabel='Chart of Accounts List View'
                      galleryHeaders={galleryHeaders}
                      galleryColumns={galleryColumns}
                      galleryItems={galleryItems}
                      leftHeaderImage={CreateNew}
                      cb_handlerLeftHeaderOperation={cb_handlerLeftHeaderOperation}

                      leftFirstOperationImage={Edit}
                      cb_handlerLeftOperation={() => {}}

                      rightFirstOperationImage={Trashcan}
                      cb_handlerRightOperation={() => {}} />
        </section>
    );
};

export default ChartOfAccounts;