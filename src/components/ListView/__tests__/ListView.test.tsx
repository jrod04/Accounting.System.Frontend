import { beforeEach, describe, expect, test, vi, type MockedFunction } from 'vitest';
import { screen, render } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import ListView from './../ListView.tsx';
import { type iListViewGalleryItem } from './../../ListViewGallery/ListViewGallery.tsx';
import Edit from './../../../assets/edit.svg';

let openAside = false;
const handlerClick = vi.fn(() => !openAside );
const galleryHeaders: string[] = ['Header 1'];
const galleryItems: iListViewGalleryItem[] = [{id: '1', One: 'Data 1'}];
let rerender: any;

beforeEach(() => {
    handlerClick.mockClear();
    const aside = <section>Test the aside.</section>;
    const renderResult = render(<ListView openAside={openAside}
                                          aside={aside}
                                          idForm='1'
                                          ariaLabel='List View'
                                          galleryHeaders={galleryHeaders}
                                          galleryItems={galleryItems}
                                          showControls={false}
                                          controlInterval={0}
                                          leftFirstOperationImage={Edit}
                                          cb_handlerLeftFirstOperation={handlerClick} />)
    rerender = renderResult.rerender;
});

describe('ListView component', () => {
    test('List view displays', () => {
        const listView = screen.getByTestId('List View Component');
        expect(listView).toBeInTheDocument();
    });

    test('On init, aside view is hidden', () => {
        const listView = screen.getByTestId('List View Component');
        const aside = screen.queryByRole('form');
        expect(aside).toBeNull();
    });

//      TODO: Research this issue. Vitest does not successfully pass img strings down more than one child
//     test('On user click, aside opens', async () => {
//         const aside = <section>Test the aside.</section>;
//         const user = createUser();
//         const button = screen.getByRole('button', { name: 'Left First Operation-1'} )
//         await user.click(button);
//         const openAside = handlerClick.mock.results[0]?.value;
//         rerender(<ListView openAside={openAside}
//                            aside={aside}
//                            idForm='1'
//                            ariaLabel='List View'
//                            galleryHeaders={galleryHeaders}
//                            galleryItems={galleryItems}
//                            showControls={false}
//                            controlInterval={0}
//                            leftFirstOperationImage={Edit}
//                            cb_handlerLeftFirstOperation={handlerClick} />)
//
//         const asideForm = screen.getByRole('form');
//         expect(asideForm).toHaveAttribute(
//             'class',
//             expect.stringContaining('aside')
//         );
//     });

    test('', () => {

    });

});