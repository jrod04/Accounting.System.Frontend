import Navigation from './../../components/Navigation/Navigation.tsx';
// import Gallery from './../../components/Gallery/Gallery.js';
import Backdrop from './../../components/Backdrop/Backdrop.tsx';
import Card from './../../components/Card/Card.tsx';
import CreateNew from './../../assets/CreateNew.svg';
import styles from './MainView.module.css';

// <Gallery bodyRows={true}
//          enableSelect={true}
//          select='1'
//          title={true}
//          subtitle={true}
//          galleryItems={[{id: '1', title: 'Title', subtitle: 'SubTitle'},
//                         {id: '2', title: 'Title', subtitle: 'Subtitle'}]} />

const MainView = () => {
    return(
        <>
            <Backdrop backdrop={false} loader={false}>
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
                    <div className={styles.cards}>
                        <Card area='Reliable Rental Properties in Michigan, LLC' />
                    </div>
                </section>
            </Backdrop>
        </>
  );
};

export default MainView;