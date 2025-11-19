import { useState } from 'react';
import ListView from './../../components/ListView/ListView.tsx';
import Edit from './../../assets/edit.svg';
import CreateNew from './../../assets/createNew.svg';
import accounts from './../../utils/tmpData.tsx';
import styles from './ChartOfAccounts.module.css';

const ChartOfAccounts = ({width, height}) => {
    const [openAside, setOpenAside] = useState<boolean>(false);

    const galleryHeaders = ['headerLeftOperation', 'Code', 'Account', 'Type'];
    const galleryColumns = ['One', 'Two', 'Three'];
    const galleryItems = accounts;

    const aside = <div>Placeholder</div>;

    const handlerClick = () => {};

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
                      leftFirstOperationImage={Edit}
                      cb_handlerLeftFirstOperation={handlerClick} />
        </section>
    );
};

export default ChartOfAccounts;