// import HeaderManagement from '../HeaderManagement/HeaderManagement.js';
import Gallery from './../Gallery/Gallery.tsx';
import { type iGallery } from './../Gallery/Gallery.tsx'
import { type iGalleryItem } from './../Gallery/Gallery.tsx';
import { constants } from './../../utils/constants.tsx';
import styles from './VerticalGallery.module.css';

interface iVerticalGallery extends iGallery {
    gallery: boolean;
    actionItems: boolean;
    area: React.ReactNode;
    verticalGalleryTitle: string;
};

function VerticalGallery({...verticalGalleryInputs}: iVerticalGallery) {
    const {
        verticalGalleryTitle,
        gallery,
        actionItems,
        area,
        title,
        subtitle,
        select,
        enableSelect,
        events,
        bodyStyle,
        galleryItems,
        verticalGallery,
        mainBodyAlt,
        cb_handlerLeftOperation,
        cb_handlerRightOperation,
        cb_handlerSelectEvent,
        _static
    } = verticalGalleryInputs;
    const items: iGalleryItem[] | null = galleryItems ? galleryItems : [];

//     {props.actionItems &&
//         <HeaderManagement leftFirstBtn={props.leftFirstBtn}
//                           leftSecondBtn={props.leftSecondBtn}
//                           leftThirdBtn={props.leftThirdBtn}
//                           leftFourthBtn={props.leftFourthBtn}
//                           rightFirstBtn={props.rightFirstBtn}
//                           rightSecondBtn={props.rightSecondBtn}
//                           rightThirdBtn={props.rightThirdBtn}
//                           bgColor={constants.TAN}
//                           selected={select} />
//     }

    return (
        <article data-testid='verticalGallery' className={gallery ? styles.verticalGallery : styles.verticalGalleryArea}>
            <section data-testid='body' className={gallery ? styles.bodyGallery : styles.bodyArea}>
                <div className={styles.title}
                     style={{background: constants.DARK_GRADIENT}}>
                    {verticalGalleryTitle}
                </div>
                {gallery &&
                    <Gallery title={title}
                             subtitle={subtitle}
                             select={select}
                             enableSelect={enableSelect}
                             events={events}
                             bodyStyle={bodyStyle}
                             galleryItems={items}
                             verticalGallery={verticalGallery}
                             mainBodyAlt={mainBodyAlt}
                             cb_handlerLeftOperation={cb_handlerLeftOperation}
                             cb_handlerRightOperation={cb_handlerRightOperation}
                             cb_handlerSelectEvent={cb_handlerSelectEvent}
                             _static={_static} />
                }
                {area}
            </section>
        </article>
    );
};

export default VerticalGallery;
