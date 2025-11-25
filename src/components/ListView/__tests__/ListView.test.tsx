import { useState } from 'react';
import { beforeEach, describe, expect, test, vi, } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
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

describe('List View component', () => {
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
                                              controlInterval={0} />)
        rerender = renderResult.rerender;
    });

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

    beforeEach((context) => {
        user = createUser();
        handlerClick.mockClear();

        if (context.task.name === 'On user click, aside opens') {
            cleanup();
            return;
        };

        rerender(<ListView openAside={openAside}
                           aside={aside}
                           idForm='1'
                           ariaLabel='List View'
                           galleryHeaders={galleryHeaders}
                           galleryItems={galleryItems}
                           searchValue='Search...'
                           showControls={true}
                           controlInterval={15}
                           leftFirstOperationImage={Edit}
                           cb_handlerLeftFirstOperation={handlerClick} />);
    });

    test('On showControls=true, control container is shown', () => {
        const controlContainer = screen.getByTestId('controlContainer');
        expect(controlContainer).toBeInTheDocument();
    });

    test('On showControls=true, control counter is shown', () => {
        const controlCounter = screen.getByTestId('controlCounter');
        expect(controlCounter).toBeInTheDocument();
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

    test('On user click, aside opens', async () => {
        const TestWrapper = () => {
            const [openAside, setOpenAside] = useState<boolean>(false);

            const handlerToggleAside = () => {
                setOpenAside(!openAside);
            };

            return(<ListView openAside={openAside}
                             aside={aside}
                             idForm='1'
                             ariaLabel='List View'
                             galleryHeaders={galleryHeaders}
                             galleryItems={galleryItems}
                             searchValue='Search...'
                             showControls={true}
                             controlInterval={15}
                             leftFirstOperationImage={Edit}
                             cb_handlerLeftFirstOperation={handlerToggleAside} />);
        };

        render(<TestWrapper />)

        const button = screen.getByRole('button', { name: 'Left First Operation-1'});
        await user.click(button);

        const asideForm = screen.getByRole('form', { name: 'Aside Form' });
        expect(asideForm).toHaveAttribute(
            'class',
            expect.stringContaining('aside')
        );
    });
});