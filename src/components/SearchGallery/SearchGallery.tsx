import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import Gallery from './../Gallery/Gallery.js';
import { type iGalleryItem } from './../Gallery/Gallery.js';
import styles from './SearchGallery.module.css';

interface iSearchGallery {
    items: iGalleryItem[];
    cb_handlerSelectEvent?: (id: string) => string | undefined;
};

function SearchGallery({...searchGalleryInputs}: iSearchGallery) {
    const {
        items,
        cb_handlerSelectEvent
    } = searchGalleryInputs;
    const initialItems: iGalleryItem[] = items ? items : [];

    const [searchValue, setSearchValue] = useState<string>('Search...');
    const [galleryItems, setGalleryItems] = useState<iGalleryItem[]>(initialItems);
    const [selected, setSelected] = useState<string>('');

    const handlerClick = () => {
        if (searchValue === 'Search...' ) setSearchValue('');
    };

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handlerBlur = () => {
        if (searchValue.trim() === '') setSearchValue('Search...');
    };

    useEffect(() => {
        if (searchValue.trim().toLowerCase() !== 'search...') {
            const searchTerm = searchValue.trim().toLowerCase();
            const filteredItems = initialItems.filter(item =>
                item.title.toLowerCase().includes(searchTerm) ||
                item.subtitle.toLowerCase().includes(searchTerm) ||
                item.id.toString().toLowerCase().includes(searchTerm)
            );
            setGalleryItems(filteredItems);
        } else {
            setGalleryItems(initialItems);
        };
    },[searchValue,initialItems]);

    return (
        <div data-testid='searchGallery' className={styles.search}>
            <div className={styles.inputArea}>
                <input type='text'
                       aria-label='User Input'
                       className={searchValue === 'Search...' ?
                                  styles.inputNotClicked :
                                  styles.inputClicked}
                       onClick={handlerClick}
                       onChange={handlerChange}
                       onBlur={handlerBlur}
                       value={searchValue} />
            </div>
            <div data-testid='galleryContainer' className={styles.searchGallery}>
                {galleryItems &&
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
