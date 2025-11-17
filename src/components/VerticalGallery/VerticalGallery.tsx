import HeaderManagement from './../HeaderManagement/HeaderManagement.tsx';
import Gallery from './../Gallery/Gallery.tsx';
import { type iGallery } from './../Gallery/Gallery.tsx'
import { type iGalleryItem } from './../Gallery/Gallery.tsx';
import { type tHandler } from './../HeaderManagement/HeaderManagement.tsx';
import constants from './../../utils/constants.tsx';
import styles from './VerticalGallery.module.css';

interface iVerticalGallery extends iGallery {
    gallery: boolean;
    actionItems: boolean;
    area: React.ReactNode;
    verticalGalleryTitle: string;
    leftFirstBtn?: tHandler | undefined;
    leftSecondBtn?: tHandler | undefined;
    leftThirdBtn?: tHandler | undefined;
    leftFourthBtn?: tHandler | undefined;
    rightFirstBtn?: tHandler | undefined;
    rightSecondBtn?: tHandler | undefined;
    rightThirdBtn?: tHandler | undefined;
};

function VerticalGallery({ ...verticalGalleryInputs }: iVerticalGallery) {
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
        _static,
        leftFirstBtn,
        leftSecondBtn,
        leftThirdBtn,
        leftFourthBtn,
        rightFirstBtn,
        rightSecondBtn,
        rightThirdBtn
    } = verticalGalleryInputs;
    const items: iGalleryItem[] | null = galleryItems ? galleryItems : [];

    return (
        <article data-testid='verticalGallery' className={verticalGallery ? styles.verticalGallery : styles.verticalGalleryArea}>
            <section data-testid='body' className={gallery ? styles.bodyGallery : styles.bodyArea}>
                <div className={styles.title}
                    style={{ background: constants.DARK_GRADIENT }}>
                    {verticalGalleryTitle}
                </div>
                {actionItems &&
                    <HeaderManagement leftFirstBtn={leftFirstBtn}
                                      leftSecondBtn={leftSecondBtn}
                                      leftThirdBtn={leftThirdBtn}
                                      leftFourthBtn={leftFourthBtn}
                                      rightFirstBtn={rightFirstBtn}
                                      rightSecondBtn={rightSecondBtn}
                                      rightThirdBtn={rightThirdBtn}
                                      bgColor={constants.TAN}
                                      selected={select} />
                }
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
