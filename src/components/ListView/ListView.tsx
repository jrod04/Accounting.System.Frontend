import React, { useState, type MouseEvent } from 'react';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import Backdrop from './../Backdrop/Backdrop.tsx';
import ReverseControl from './../../assets/revControl.svg';
import ForwardControl from './../../assets/fwdControl.svg';
import Edit from './../../assets/edit.svg';
import Trashcan from './../../assets/trashcan.svg';
import ListViewGallery, { type iListViewGallery, type iListViewGalleryItem} from './../ListViewGallery/ListViewGallery.tsx';
import styles from './ListView.module.css';

interface iListView extends iListViewGallery {
    openAside: boolean;
    showControls?: boolean | undefined;
    controlInterval: number;
    aside?: React.ReactNode | undefined;
    idForm?: string | undefined;
    cb_handlerSubmitAside?: () => void | undefined;
};

function ListView ({...listViewInputs}: iListView) {
    const {
        openAside,
        showControls,
        controlInterval=10,
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

    const [controlCount, setControlCount] = useState<number>(0);

    const cb_increaseControlCount = (e: MouseEvent<HTMLButtonElement>) => {
        if (endSlice && controlInterval) {
            if (endSlice + controlInterval <= galleryItems.length) {
                setControlCount(controlCount => controlCount + 1);
            };
        };
    };

    const cb_decreaseControlCount = (e: MouseEvent<HTMLButtonElement>) => {
        if (startSlice && controlInterval) {
            if (startSlice - controlInterval >= 0) {
                setControlCount(controlCount => controlCount - 1);
            };
        };
    };

    const startSlice: number = controlCount * controlInterval + 1;
    const endSlice: number = startSlice + controlInterval - 1;
    const filteredGalleryItems: iListViewGalleryItem[] = galleryItems.slice(startSlice - 1, endSlice);

    return(
        <section data-testid='List View Component' className={styles.listViews}>
            {openAside &&
                <form role='form' onSubmit={cb_handlerSubmitAside} className={styles.aside} id={idForm}>
                    {aside}
                </form>
            }
            <Backdrop backdrop={openAside} loader={false}>
                {showControls &&
                    <div className={styles.controls}>
                        <ButtonIcon ariaLabel='Back Control Icon'
                                    icon={ReverseControl}
                                    width={15}
                                    height={15}
                                    alt='Back Control'
                                    title='Back Control'
                                    value='Previous'
                                    textSide='right'
                                    cb_handlerClick={cb_decreaseControlCount} />
                        <div className={styles.controlCounter}>
                            <strong>{startSlice}-{endSlice} of {galleryItems.length}</strong>
                        </div>
                        <ButtonIcon ariaLabel='Forward Control Icon'
                                    icon={ForwardControl}
                                    width={15}
                                    height={15}
                                    alt='Forward Control'
                                    title='Forward Control'
                                    value='Next'
                                    textSide='left'
                                    cb_handlerClick={cb_increaseControlCount} />
                    </div>

                }
                <ListViewGallery ariaLabel={ariaLabel}
                                 galleryHeaders={galleryHeaders}
                                 galleryItems={filteredGalleryItems}

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
