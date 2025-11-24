import { beforeEach, describe, expect, test, vi, type MockedFunction } from 'vitest';
import { screen, render } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import ListView from './../ListView.tsx';
import { type iListViewGalleryItem } from './../../ListViewGallery/ListViewGallery.tsx';
import Edit from './../../../assets/edit.svg';

let rerender: any, user: any;
let openAside = false;

const handlerClick = vi.fn(() => {});

const galleryHeaders: string[] = ['Header 1'];
let galleryItems: iListViewGalleryItem[] = [];
for (let i = 1; i < 32; i++) {
    galleryItems.push({id: `${i}`, One: `Data ${i}`});
};
const aside = <section>Test the aside.</section>;

beforeEach(() => {
    user = createUser();
    handlerClick.mockClear();
    const renderResult = render(<ListView openAside={openAside}
                                          aside={aside}
                                          idForm='1'
                                          ariaLabel='List View'
                                          galleryHeaders={galleryHeaders}
                                          galleryItems={galleryItems}
                                          searchValue={'Search...'}
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

    test('On showControls=false, controls are hidden', () => {
        const controls = screen.queryByTestId('listViewControls');
        expect(controls).toBeNull();
    });

    test('On showControls=true, control container is shown', () => {
        rerender(<ListView openAside={openAside}
                           aside={aside}
                           idForm='1'
                           ariaLabel='List View'
                           galleryHeaders={galleryHeaders}
                           galleryItems={galleryItems}
                           searchValue={'Search...'}
                           showControls={true}
                           controlInterval={0} />);
        const controlContainer = screen.getByTestId('controlContainer');
        expect(controlContainer).toBeInTheDocument();
    });

    test('On showControls=true, control counter is shown', () => {
        rerender(<ListView openAside={openAside}
                           aside={aside}
                           idForm='1'
                           ariaLabel='List View'
                           galleryHeaders={galleryHeaders}
                           galleryItems={galleryItems}
                           searchValue={'Search...'}
                           showControls={true}
                           controlInterval={0} />);
        const controlCounter = screen.getByTestId('controlCounter');
        expect(controlCounter).toBeInTheDocument();
    });

    beforeEach(() => {
       rerender(<ListView openAside={openAside}
                   aside={aside}
                   idForm='1'
                   ariaLabel='List View'
                   galleryHeaders={galleryHeaders}
                   galleryItems={galleryItems}
                   searchValue={'Search...'}
                   showControls={true}
                   controlInterval={15} />);
    });

    test('On showControls=true, control back button is shown', () => {
        const backButton = screen.getByRole('button', { name: 'Back Control Button' });
        expect(backButton).toBeInTheDocument();
    });

    test('On showControls=true, control forward button is shown', () => {
        const fwdButton = screen.getByRole('button', { name: 'Forward Control Button' });
        expect(fwdButton).toBeInTheDocument();
    });

    test('controlCounter has the correct init values 0-controlInterval', async () => {
        const backButton = screen.getByRole('button', { name: 'Back Control Button' } );
        const controlInfo = screen.getByTestId('controlCounter');
        expect(controlInfo.textContent).toBe('1-15 of 31');
    });

    test('Clicking fwdButton increases the start and end values by the controlInterval and clicking backButton reverses it', async () => {
        const controlInfo = screen.getByTestId('controlCounter');
        const fwdButton = screen.getByRole('button', { name: 'Forward Control Button' } );
        const backButton = screen.getByRole('button', { name: 'Back Control Button' })
        await user.click(fwdButton);
        expect(controlInfo.textContent).toBe('16-30 of 31');
        await user.click(backButton);
        expect(controlInfo.textContent).toBe('1-15 of 31');
    });

    test('Clicking backButton does not decrease the counter when controlCounter === 0', async () => {
        const controlInfo = screen.getByTestId('controlCounter');
        const backButton = screen.getByRole('button', { name: 'Back Control Button' })
        await user.click(backButton);
        expect(controlInfo.textContent).toBe('1-15 of 31');
    });

    test('Clicking fwdButton does not increase the counter when it would exceed the gallery length', async () => {
        const controlInfo = screen.getByTestId('controlCounter');
        const fwdButton = screen.getByRole('button', { name: 'Forward Control Button' } );
        await user.click(fwdButton);
        await user.click(fwdButton);
        expect(controlInfo.textContent).toBe('31-31 of 31');
    });

//      TODO: Research this issue. Vitest does not successfully pass img strings down more than one child
//     test('On user click, aside opens', async () => {
//         const button = screen.getByRole('button', { name: 'Left First Operation-1'} )
//         await user.click(button);
//         expect(handlerClick).toHaveBeenCalledTimes(1);
//         rerender(<ListView openAside={true}
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
//         const asideForm = screen.getByRole('form', { name: 'Aside form' });
//         expect(asideForm).toHaveAttribute(
//             'class',
//             expect.stringContaining('aside')
//         );
//     });
});