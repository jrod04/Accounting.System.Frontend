import { useState } from 'react';
import Navigation from './../../components/Navigation/Navigation.tsx';
import VerticalGallery from './../../components/VerticalGallery/VerticalGallery.tsx';
import Backdrop from './../../components/Backdrop/Backdrop.tsx';
import Card from './../../components/Card/Card.tsx';
import CreateNew from './../../assets/CreateNew.svg';
import Notify from './../../components/Notify/Notify.tsx';
import styles from './MainView.module.css';

const items = [{id: '1', title: 'Reliable Rental Properties in Michigan, LLC', subtitle: ''},
              {id: '2', title: 'Reliable Rental Properties in North Carolina, LLC', subtitle: ''}];

const MainView = () => {
    const [notify, setNotify] = useState<boolean>(false);

    const cb_handlerCloseNotify = (): void => {
        setNotify(false);
    };

    const cards = items.map(item =>
       <div className={styles.cards}>
            <Card area={item.title} />
       </div>
    );

   return(
        <>
            <Backdrop backdrop={false} loader={false}>
                <Notify stat='sucess' message='Success!' cb_handlerCloseNotify={cb_handlerCloseNotify} />
                <section className={styles.mainView}>
                    <div className={styles.nav}>
                        <Navigation title='Accounting Suite' />
                    </div>
                    <div className={styles.create}>
                        <button className={styles.createNew}>
                            <img src={CreateNew} alt='Add Business' title='Add Business'/>
                        </button>
                        <em>Add Business</em>
                    </div>
                    <hr />
                    <div className={styles.cardsContainer}>
                        {cards}
                    </div>
                    <section className={styles.verticalGallery}>
                        <VerticalGallery galleryItems={items}
                                         verticalGalleryTitle='Vertical Gallery'
                                         title={true}
                                         gallery={true}
                                         verticalGallery={true}
                                         events={false}
                                         actionItems={false}
                                         area={false}
                                         subtitle={true}
                                         bodyStyle='columns'
                                         enableSelect={false} />
                    </section>

                </section>
            </Backdrop>
        </>
  );
};

export default MainView;