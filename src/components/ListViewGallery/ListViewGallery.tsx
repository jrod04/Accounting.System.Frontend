import React, { useState, type MouseEvent } from 'react';
import styles from './ListViewGallery.module.css';

type tListViewGalleryItemKeys = keyof iListViewGalleryItem;

export interface iListViewGalleryItem {
    id: string;
    One: string;
    Two?: string | undefined;
    Three?: string | undefined;
    Four?: string | undefined;
    Five?: string | undefined;
    Six?: string | undefined;
    Seven?: string | undefined;
    itemClicked?: string | undefined;
};

type tHandlerHeaderOperation = ((e: MouseEvent) => void) | undefined;
type tHandlerNotHeaderOperation = ((data: iListViewGalleryItem) => void)  | undefined;

export interface iListViewGallery {
    ariaLabel: string;
    galleryHeaders: string[];
    galleryColumns: string[];
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

function ListViewGallery({...listViewGalleryInputs}: iListViewGallery) {
    const {
        ariaLabel,
        galleryHeaders,
        galleryColumns,
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
    } = listViewGalleryInputs;

    const ddHeaders = ['headerLeftOperation',
                       'Column 1',
                       'Column 2',
                       'Column 3',
                       'Column 4',
                       'Column 5',
                       'Column 6',
                       'Column 7',
                       'headerRightOperation'];

    const items = galleryItems ? galleryItems : [];
    const headers = galleryHeaders ? galleryHeaders : ddHeaders;
    const columns = galleryColumns ? galleryColumns : ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

    const handlerRightFirstOperation = (e: MouseEvent) => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        const data = {...items.filter(item => parseInt(item.id) === parseInt(id))};

        if (data[0]) data[0].itemClicked = 'Right First';
        if (cb_handlerRightFirstOperation && data[0]) cb_handlerRightFirstOperation(data[0]);
    };

    const handlerRightSecondOperation = (e: MouseEvent) => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        const data = {...items.filter(item => parseInt(item.id) === parseInt(id))};

        if (data[0]) data[0].itemClicked = 'Right Second';
        if (cb_handlerRightSecondOperation && data[0]) cb_handlerRightSecondOperation(data[0]);
    };

    const handlerLeftOperation = (e: MouseEvent) => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        const data = {...items.filter(item => parseInt(item.id) === parseInt(id))};

        if (data[0]) data[0].itemClicked = 'Left';
        if (cb_handlerLeftFirstOperation && data[0]) cb_handlerLeftFirstOperation(data[0]);
    };

    const headerView: React.ReactNode = headers.map(header => (
        <th key={header}
            aria-label='Table Headers'
            className={['headerLeftOperation', 'headerRightOperation'].includes(header) ? styles.headerOperation : styles.headers}>
            {header.includes('Operation') ?
                 <button aria-label={header}
                         className={header === 'headerLeftOperation' ? styles.headerLeftOperation : styles.headerRightOperation}
                         onClick={header === 'headerLeftOperation' ? cb_handlerLeftHeaderOperation : cb_handlerRightHeaderOperation}>
                    <img src={header === 'headerLeftOperation' ? leftHeaderImage : rightHeaderImage} />
                 </button> :
                 header
             }
        </th>
    ));

    let i = 0;
    return (
        <table aria-label={ariaLabel} className={styles.mainBody}>
            <thead className={styles.thead}>
                <tr className={styles.row}>
                    {headerView}
                </tr>
            </thead>
            <tbody>
                {items[0] && items.map(item => (
                    <tr key={`listViewGallery-${item.id}`} className={styles.row}>
                        <td>
                            {leftFirstOperationImage &&
                                <>
                                    <button aria-label={`Left First Operation-${item.id}`}
                                            className={styles.leftOperation}
                                            onClick={handlerLeftOperation}
                                            data-column-one={item.One}
                                            data-column-two={item.Two}
                                            id={item.id} />
                                    <img src={leftFirstOperationImage}
                                         className={styles.leftOperationImg} />
                                </>
                            }
                        </td>
                        {columns.map(column =>
                            <td key={`${item[column as keyof iListViewGalleryItem]}-${++i}`} className={styles.data}>
                                {item[column as keyof iListViewGalleryItem]}
                            </td>
                        )}
                        {rightFirstOperationImage &&
                            <td className={styles.rightFirstOperation}>
                                <button aria-label={`Right First Operation-${item.id}`}
                                        className={styles.rightOperation}
                                        onClick={handlerRightFirstOperation}
                                        data-column-one={item.One}
                                        data-column-two={item.Two}
                                        id={item.id} />
                                <img src={rightFirstOperationImage} />
                            </td>
                        }
                        {rightSecondOperationImage &&
                            <td className={styles.rightSecondOperation}>
                                <button aria-label={`Right Second Operation-${item.id}`}
                                        className={styles.rightOperation}
                                        onClick={handlerRightSecondOperation}
                                        id={item.id}
                                        data-column-one={item.One}
                                        data-column-two={item.Two} />
                                <img src={rightSecondOperationImage} />
                            </td>
                        }
                    </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ListViewGallery;
