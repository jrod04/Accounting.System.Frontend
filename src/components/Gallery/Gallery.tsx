import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Gallery.module.css';

export interface iGalleryItem {
    id: string;
    title: string;
    subtitle: string;
    color?: string;
    itemClicked?: 'Right' | 'Left' | null
    showRightOperation?:boolean;
    showLeftOperation?: boolean;
    activateRightOperation?: boolean;
    activateLeftOperation?: boolean;
    data?: React.FC;
    imgRightOperation?: string;
    imgLeftOperation?: string;
};

interface iGallery {
    title: boolean;
    subtitle: boolean;
    select: string;
    enableSelect: boolean;
    events: boolean;
    bodyStyle: 'columns' | 'rows';
    galleryItems: iGalleryItem[];
    verticalGallery: boolean;
    mainBodyAlt?: boolean;
    _static?: boolean;
    cb_handlerLeftOperation?: (data: iGalleryItem) => void;
    cb_handlerRightOperation?: (data: iGalleryItem) => void;
    cb_handlerSelectEvent?: (id: string) => void;
};

interface iHandler {
  (e: React.SyntheticEvent): void;
};

interface iEventTargetId extends EventTarget {
    id: string;
};

function Gallery({title, subtitle, select, enableSelect, events, bodyStyle, galleryItems,
                  verticalGallery, mainBodyAlt, cb_handlerLeftOperation, cb_handlerRightOperation,
                  cb_handlerSelectEvent, _static}: iGallery) {
    const [selected, setSelected] = useState<string>(select);
    const items = galleryItems ? galleryItems as iGalleryItem[] : [] as iGalleryItem[];

    const columnStyle = bodyStyle === 'columns' ? styles.bodyColumns : styles.card;
    const rowStyle = bodyStyle === 'rows' ? styles.bodyRows : styles.card;
    const eventStyle = events ? {border: 'none'} : {};

    const handlerRightOperation: iHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        const data = {...items.filter(item => parseInt(item.id) === parseInt(id))};

        if (data[0] !== undefined) data[0].itemClicked = 'Right';
        if (cb_handlerRightOperation && data[0] !== undefined) cb_handlerRightOperation(data[0]);
    };

    const handlerLeftOperation: iHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        const data = {...items.filter(item => parseInt(item.id) === parseInt(id))};

        if (data[0] !== undefined) data[0].itemClicked = 'Left';
        if (cb_handlerLeftOperation && data[0] !== undefined) cb_handlerLeftOperation(data[0]);
    };

    const handlerSetSelected: iHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const id: string = (e.target as HTMLElement).id;
        if (cb_handlerSelectEvent) {
            cb_handlerSelectEvent(id);
            setSelected(id);
        };
    };

    useEffect(() => {
        setSelected(select);
    },[select]);

    let i: number = 0;

    return(
    <>
        {(items[0] && items[0] !== undefined) && items.map((item) =>
            <div className={`${bodyStyle === 'columns' ? columnStyle : ''} ${bodyStyle === 'rows' ? rowStyle : ''}`.trim()}
                 style={eventStyle}
                 key={item.id ? item.id : ++i}
                 data-testid='gallery'>

                <div className={`${(['columns', 'rows'].includes(bodyStyle)) ? styles.mainBody : ''} ${(verticalGallery || mainBodyAlt) ? styles.mainBodyAlt : ''}`.trim()}
                      style={(enableSelect && item.id.toString() === selected.toString()) ?
                             {backgroundColor: 'rgba(0,0,0,0.3)',
                                 border: '1px solid rgba(0,0,0,0.1)',
                                 height: '100%',
                                 width: '100%'} : {}}>
                    {
                        item.showLeftOperation &&
                            <button className={styles.leftOperation}
                                    onClick={item.activateLeftOperation ?
                                             handlerLeftOperation :
                                             (e) => {e.preventDefault()}}
                                    id={item.id}
                                    data-name={item.title}>
                                <img src={item.imgLeftOperation}
                                     alt='Button'
                                     className={styles.imgLeftOperation} />
                            </button>
                    }

                    {
                        (title || subtitle) &&
                            <button className={`${bodyStyle === 'columns' ? columnStyle : ''} ${bodyStyle === 'rows' ? styles.events : ''} ${_static ? styles.static : ''} ${verticalGallery ? styles.card : ''}`.trim()}
                                    id={item.id}
                                    data-name={item.title}
                                    onClick={handlerSetSelected}
                                    style={{backgroundColor: item.color}}>
                                    {item.title}<br />
                                    {item.subtitle}
                            </button>
                    }

                    {
                        item.showRightOperation &&
                            <button className={styles.rightOperation}
                                    onClick={item.activateRightOperation ?
                                             handlerRightOperation :
                                             (e) => {e.preventDefault()}}
                                    id={item.id}
                                    data-name={item.title}>
                                <img src={item.imgRightOperation}
                                     alt='Right Operation'
                                     className={styles.imgRightOperation} />
                            </button>
                    }
                </div>

                {
                    item.data &&
                        <div className={styles.data}>
                            <item.data />
                        </div>
                }
            </div>
        )}
    </>
    );
};

export default Gallery;
