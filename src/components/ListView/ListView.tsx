import React, { useState, type MouseEvent } from 'react';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import Backdrop from './../Backdrop/Backdrop.tsx';
import ReverseControl from './../../assets/revControl.svg';
import ForwardControl from './../../assets/fwdControl.svg';
import Edit from './../../assets/edit.svg';
import Trashcan from './../../assets/trashcan.svg';
import ListViewGallery, { type iListViewGalleryItem} from './../ListViewGallery/ListViewGallery.tsx';
import styles from './ListView.module.css';

type tHandlerHeaderOperation = ((e: MouseEvent) => void) | undefined;
type tHandlerNotHeaderOperation = ((data: iListViewGalleryItem) => void)  | undefined;

export interface iListView {
    openAside: boolean;
    showControls?: boolean | undefined;
    aside?: React.ReactNode | undefined;
    idForm?: string | undefined;
    cb_handlerSubmitAside?: () => void | undefined;

    controlInterval: number;

    ariaLabel: string;
    galleryHeaders: string[];
    galleryItems: iListViewGalleryItem[];

    leftHeaderImage?: string | undefined;
    rightHeaderImage?: string | undefined;
    cb_handlerLeftHeaderOperation?: tHandlerHeaderOperation;
    cb_handlerRightHeaderOperation?: tHandlerHeaderOperation;

    leftFirstOperationImage?: string | undefined;
    rightFirstOperationImage?: string | undefined;
    rightSecondOperationImage?: string | undefined;
    cb_handlerLeftFirstOperation?: tHandlerNotHeaderOperation;
    cb_handlerRightFirstOperation?: tHandlerNotHeaderOperation;
    cb_handlerRightSecondOperation?: tHandlerNotHeaderOperation;

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
    const [controlInfo, setControlInfo] = useState(`${controlCount * controlInterval + 1}-${(controlCount * controlInterval + 1) + controlInterval - 1}`);

    const cb_increaseControlCount = (e: MouseEvent<HTMLButtonElement>) => {
//         if (controlInterval) {
//             if (endSlice + controlInterval <= galleryItems.length) {
                setControlCount(controlCount => controlCount + 1);
//             };
//         };
    };

    const cb_decreaseControlCount = (e: MouseEvent<HTMLButtonElement>) => {
//         if (controlInterval) {
//             if (startSlice - controlInterval >= 0) {
                setControlCount(controlCount => controlCount - 1);
//             };
//         };
    };

    const cb_controlInfo = (startSlice: number, endSlice: number, galleryLength: number) => {
        let info;
        switch (info) {
            case endSlice > galleryLength:

                break;
        }
    };

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
                            <strong>{controlInfo} of {galleryItems.length}</strong>
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
                                 galleryItems={galleryItems}

                                 controlCount={controlCount}
                                 controlInterval={controlInterval}

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
