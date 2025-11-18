import { useState } from 'react';
import Navigation from './../../components/Navigation/Navigation.tsx';
import VerticalGallery from './../../components/VerticalGallery/VerticalGallery.tsx';
import Backdrop from './../../components/Backdrop/Backdrop.tsx';
import Card from './../../components/Card/Card.tsx';
import CreateNew from './../../assets/CreateNew.svg';
import Notify from './../../components/Notify/Notify.tsx';
import InputTextbox from './../../components/InputTextbox/InputTextbox.tsx';
import Button from './../../components/Button/Button.tsx';
import styles from './MainView.module.css';

const MainView = () => {
    const items = [{id: '1', title: 'Reliable Rental Properties in Michigan, LLC', subtitle: ''},
                  {id: '2', title: 'Reliable Rental Properties in North Carolina, LLC', subtitle: ''}];

    const [notify, setNotify] = useState<boolean>(false);
    const [addBusiness, setAddBusiness] = useState<boolean>(false);

    const cb_handlerCloseNotify = (): void => {
        setNotify(false);
    };

    const handlerToggleAddBusiness = (): void => {
        setAddBusiness(!addBusiness);
    };

    const cb_handlerToggleAddBusiness = handlerToggleAddBusiness;

    const frmAddBusinessArea = <form className={styles.frmAddBusiness}>
        <div className={styles.frmInputArea}>
            <InputTextbox ariaLabel='' width={175} direction='column' errors='' />

        </div>
        <div className={styles.frmButtons}>
            <Button id='1' value='Cancel' width={75} cb_handlerOperation={cb_handlerToggleAddBusiness} />
            <Button id='1' value='Submit' width={75} cb_handlerOperation={() => {}} />
        </div>
    </form>;

    const cards = items.map(item =>
       <div className={styles.cards}>
            <Card area={item.title}/>
       </div>
    );

   return(
        <>
            <Backdrop backdrop={addBusiness} loader={false}>
                {notify &&
                    <Notify stat='success' message='Success!' cb_handlerCloseNotify={cb_handlerCloseNotify} />
                }
                <section className={styles.mainView}>
                    <div className={styles.nav}>
                        <Navigation title='Accounting Suite' />
                    </div>
                    <div className={styles.create}>
                        <button className={styles.createNew} onClick={handlerToggleAddBusiness}>
                            <img src={CreateNew} alt='Add Business' title='Add Business'/>
                        </button>
                        <em>Add Business</em>
                    </div>
                    <hr />
                    <div className={styles.cardsContainer}>
                        {cards}
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