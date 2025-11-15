import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Gallery from './../Gallery/Gallery.js';
import { type iGalleryItem } from './../Gallery/Gallery.js';
import styles from './SearchGallery.module.css';

type tRefInputProps = React.ComponentPropsWithRef<'input'>;

interface iSearchGallery {
    items: iGalleryItem[];
    message: string;
    refInputProps: tRefInputProps;
    cb_handlerSelectEvent: (id: string) => string | undefined;
};

function SearchGallery({...searchGalleryInputs}: iSearchGallery) {
    const {
        items,
        message,
        refInputProps,
        cb_handlerSelectEvent
    } = searchGalleryInputs;
    const initialItems: iGalleryItem[] = items ? items : [];

    const [searchValue, setSearchValue] = useState<string>(message);
    const [galleryItems, setGalleryItems] = useState<iGalleryItem[]>(initialItems);
    const [selected, setSelected] = useState<string>('');

    const refSearchValue = useRef<HTMLInputElement | null>(null);

    const handlerClick = () => {
        if (searchValue.slice(0,6) === 'Search') setSearchValue('');
    };

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        if (refSearchValue &&
            refSearchValue.current &&
            refSearchValue.current.value &&
            refSearchValue.current.value.slice(0,6).toLowerCase().trim() !== 'search') {
                const searchTerm = refSearchValue.current.value.toLowerCase();
                const filteredItems = initialItems.filter(item =>
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.id.toString().toLowerCase().includes(searchTerm)
                );
                setGalleryItems(filteredItems);
        } else {
            setGalleryItems(initialItems);
        };
    },[refSearchValue.current?.value]);

    return (
        <div className={styles.search}>
            <div className={styles.inputArea}>
                <input type='text'
                       className={['', 'Search'].includes(searchValue) ? styles.inputNotClicked : styles.inputClicked}
                       ref={refSearchValue}
                       onClick={handlerClick}
                       onChange={handlerChange}
                       value={searchValue} />
            </div>
            <div className={styles.searchGallery}>
                {galleryItems.length > 0 &&
                    <Gallery galleryItems={galleryItems}
                             title={true}
                             subtitle={true}
                             enableSelect={false}
                             verticalGallery={true}
                             events={false}
                             bodyStyle='columns'
                             cb_handlerSelectEvent={cb_handlerSelectEvent} />
                }
                {items.length === 0 && <em>No results found!</em>}
            </div>
        </div>
    );
};

export default SearchGallery;
