import React, { useState, useEffect, type MouseEvent, memo } from 'react';
import { type iListView } from './../ListView/ListView.tsx';
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

type tOMITiListViewGallery = Omit<iListViewGallery, 'ariaLabel' | 'controlCount' | 'controlInterval' | 'galleryHeaders' |
                                                    'searchValue' | 'cb_controlInfo'>;

interface iListViewGalleryRow extends tOMITiListViewGallery {
    item: iListViewGalleryItem;
};

const ListViewGalleryRow = ({...listViewGalleryRowInputs}: iListViewGalleryRow) => {
    const {
        item,
        galleryItems,
        leftFirstOperationImage,
        rightFirstOperationImage,
        rightSecondOperationImage,
        cb_handlerLeftFirstOperation,
        cb_handlerRightFirstOperation,
        cb_handlerRightSecondOperation,
    } = listViewGalleryRowInputs;

    let i = 0;

    const handlerRightFirstOperation = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        const data = {...galleryItems.filter(item => parseInt(item.id) === parseInt(id))};

        if (data[0]) data[0].itemClicked = 'Right First';
        if (cb_handlerRightFirstOperation && data[0]) cb_handlerRightFirstOperation(data[0]);
    };

    const handlerRightSecondOperation = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        const data = {...galleryItems.filter(item => parseInt(item.id) === parseInt(id))};

        if (data[0]) data[0].itemClicked = 'Right Second';
        if (cb_handlerRightSecondOperation && data[0]) cb_handlerRightSecondOperation(data[0]);
    };

    const handlerLeftOperation = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        const data = {...galleryItems.filter(item => parseInt(item.id) === parseInt(id))};

        if (data[0]) data[0].itemClicked = 'Left';
        if (cb_handlerLeftFirstOperation && data[0]) cb_handlerLeftFirstOperation(data[0]);
    };

    const columns = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
    const galleryColumns: string[] = [];

    columns.forEach(column => {
        if (column in item) galleryColumns.push(column);
    });

    let idItem = Number(item.id);

    const row =
        <>
            <td>
                {leftFirstOperationImage &&
                    <>
                        <button aria-label={`Left First Operation-${item?.id}`}
                                className={styles.leftOperation}
                                onClick={handlerLeftOperation}
                                data-column-one={item?.One}
                                data-column-two={item?.Two}
                                id={item?.id} />
                        <img src={leftFirstOperationImage}
                             className={styles.leftOperationImg} />
                    </>
                }
            </td>
            {galleryColumns.map(column =>
                <td key={`data-${++idItem}`} className={styles.data}>
                    {item[column as keyof iListViewGalleryItem] ? item[column as keyof iListViewGalleryItem] : ''}
                </td>
            )}
            {rightFirstOperationImage &&
                <td className={styles.rightFirstOperation}>
                    <button aria-label={`Right First Operation-${item?.id}`}
                            className={styles.rightOperation}
                            onClick={handlerRightFirstOperation}
                            data-column-one={item?.One}
                            data-column-two={item?.Two}
                            id={item?.id} />
                    <img src={rightFirstOperationImage} />
                </td>
            }
            {rightSecondOperationImage &&
                <td className={styles.rightSecondOperation}>
                    <button aria-label={`Right Second Operation-${item?.id}`}
                            className={styles.rightOperation}
                            onClick={handlerRightSecondOperation}
                            id={item?.id}
                            data-column-one={item?.One}
                            data-column-two={item?.Two} />
                    <img src={rightSecondOperationImage} />
                </td>
            }
        </>;

    return (
        <>{row}</>
    )
};

type tOMITiListView = Omit<iListView, 'openAside' | 'showControls' | 'aside' | 'idForm' | 'cb_handlerSubmitAside'>;

export interface iListViewGallery extends tOMITiListView {
    controlCount: number;
    cb_controlInfo: (startSlice: number, endSlice: number, galleryLength: number) => void;
};

const ListViewGallery = ({...listViewGalleryInputs}: iListViewGallery) => {
    const {
        ariaLabel,
        galleryHeaders,
        galleryItems,

        searchValue,
        controlCount,
        controlInterval,
        cb_controlInfo,

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

    const [startSlice, setStartSlice] = useState<number>(controlCount * controlInterval + 1);
    const [endSlice, setEndSlice] = useState<number>((controlCount * controlInterval + 1) + controlInterval - 1);
    const [filteredItems, setFilteredItems] = useState<iListViewGalleryItem[]>(galleryItems.slice(controlCount * controlInterval + 1, (controlCount * controlInterval + 1) + controlInterval - 1));

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

    useEffect(() => {
        if (['',  'search...'].includes(searchValue.trim().toLowerCase())) {
            const newStartSlice: number = controlCount * controlInterval;
            const newEndSlice: number = (controlCount * controlInterval) + controlInterval;
            setStartSlice(newStartSlice);
            setEndSlice(newEndSlice);
        } else {
            const filteredItems: iListViewGalleryItem[] = galleryItems.filter(item => {
                const sValue = searchValue.trim().toLowerCase();
                const itemOne = item.One.trim().toLowerCase()
                const itemTwo = item.Two?.trim().toLowerCase();
                const itemThree = item.Three?.trim().toLowerCase();
                return (itemOne.includes(sValue) || itemTwo?.includes(sValue) || itemThree?.includes(sValue));
            });
            setFilteredItems(filteredItems);
        };
    },[controlCount, controlInterval, searchValue]);

    useEffect(() => {
        if (['',  'search...'].includes(searchValue.trim().toLowerCase())) {
            const filteredItems = galleryItems.slice(startSlice, endSlice);
            setFilteredItems(filteredItems);
            cb_controlInfo(startSlice, endSlice, galleryItems.length);
        };
    },[startSlice, endSlice]);

    return (
        <table aria-label={ariaLabel} className={styles.mainBody}>
            <thead className={styles.thead}>
                <tr className={styles.row}>
                    {headerView}
                </tr>
            </thead>
            <tbody>
                {filteredItems.map(item => (
                    <tr key={`row-${item.id}`} className={styles.row}>
                        <ListViewGalleryRow item={item}
                                            galleryItems={filteredItems}
                                            leftFirstOperationImage={leftFirstOperationImage}
                                            rightFirstOperationImage={rightFirstOperationImage}
                                            rightSecondOperationImage={rightSecondOperationImage}
                                            cb_handlerLeftFirstOperation={cb_handlerLeftFirstOperation}
                                            cb_handlerRightFirstOperation={cb_handlerRightFirstOperation}
                                            cb_handlerRightSecondOperation={cb_handlerRightSecondOperation} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListViewGallery;
