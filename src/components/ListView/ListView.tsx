import React, { useState } from 'react';
import Backdrop from './../Backdrop/Backdrop.tsx';
import Edit from './../../assets/edit.svg';
import Trashcan from './../../assets/trashcan.svg';
import ListViewGallery, { type iListViewGallery, type iListViewGalleryItem} from './../ListViewGallery/ListViewGallery.tsx';
import styles from './ListView.module.css';

interface iListView extends iListViewGallery {
    openAside: boolean;
    aside?: React.ReactNode | undefined;
    idForm?: string | undefined;
    cb_handlerSubmitAside?: () => void | undefined;
};

function ListView ({...listViewInputs}: iListView) {
    const {
        openAside,
        aside,
        idForm,
        cb_handlerSubmitAside,
        ariaLabel,
        galleryHeaders,
        galleryItems,
        leftHeaderImage,
        rightHeaderImage,
        cb_handlerLeftHeaderOperation,
        cb_handlerRightHeaderOperation,
        leftFirstOperationImage,
        rightFirstOperationImage,
        rightSecondOperationImage,
        cb_handlerLeftFirstOperation,
        cb_handlerRightFirstOperation,
        cb_handlerRightSecondOperation
    } = listViewInputs;

    return(
        <section data-testid='List View Component' className={styles.listViews}>
            {openAside &&
                <form role='form' onSubmit={cb_handlerSubmitAside} className={styles.aside} id={idForm}>
                    {aside}
                </form>
            }
            <Backdrop backdrop={openAside} loader={false}>
                <ListViewGallery ariaLabel={ariaLabel}
                                 galleryHeaders={galleryHeaders}
                                 galleryItems={galleryItems}

                                 leftHeaderImage={leftHeaderImage}
                                 rightHeaderImage={rightHeaderImage}
                                 cb_handlerLeftHeaderOperation={cb_handlerLeftHeaderOperation}
                                 cb_handlerRightHeaderOperation={cb_handlerRightHeaderOperation}

                                 leftFirstOperationImage={leftFirstOperationImage}
                                 cb_handlerLeftFirstOperation={cb_handlerLeftFirstOperation}

                                 rightFirstOperationImage={rightFirstOperationImage}
                                 rightSecondOperationImage={rightSecondOperationImage}
                                 cb_handlerRightFirstOperation={cb_handlerRightFirstOperation}
                                 cb_handlerRightSecondOperation={cb_handlerRightSecondOperation} />
            </Backdrop>
        </section>
    );
};

export default ListView;
