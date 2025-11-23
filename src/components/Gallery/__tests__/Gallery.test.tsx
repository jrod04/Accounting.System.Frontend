import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import Gallery from './../Gallery.tsx';
import { type iGalleryItem } from './../Gallery.tsx';

let rerender: any, user: any;
let items: iGalleryItem[] = [{id: '1', title: 'Title', subtitle: 'Subtitle'}];
const cb_handlerLeftOperation = vi.fn((data: iGalleryItem) => {
    const id: string = data.id;
    return id;
});

const cb_handlerRightOperation = vi.fn((data: iGalleryItem) => {
    const id: string = data.id;
    return id;
});

beforeEach(() => {
    user = createUser();
    cb_handlerLeftOperation.mockClear();
    cb_handlerRightOperation.mockClear();
    const renderResult = render(<Gallery galleryItems={items}
                                         title={true}
                                         subtitle={true}
                                         select='1'
                                         enableSelect={false}
                                         bodyStyle='columns'
                                         events={false}
                                         verticalGallery={false} />);
    rerender = renderResult.rerender;

});

describe('Gallery component', () => {
    test('Gallery shown', () => {
        const gallery = screen.getByTestId('gallery');
        expect(gallery).toBeInTheDocument();
    });

    test('Gallery title and subtitle shown', () => {
        const btn = screen.getByRole('button', { name: 'gallery-1' });
        expect(btn.textContent).toBe('TitleSubtitle');
    });

    test('Gallery functions shown, activated, clicked and return correct values', async () => {
        items = [{id: '1',
                  title: 'Title',
                  subtitle: 'Subtitle',
                  showLeftOperation: true,
                  showRightOperation: true,
                  activateLeftOperation: true,
                  activateRightOperation: true
        }];

        rerender(<Gallery galleryItems={items}
                          title={true}
                          subtitle={true}
                          select='1'
                          enableSelect={false}
                          bodyStyle='columns'
                          events={false}
                          verticalGallery={false}
                          cb_handlerLeftOperation={cb_handlerLeftOperation}
                          cb_handlerRightOperation={cb_handlerRightOperation} />);

        const buttons: HTMLButtonElement[] = screen.getAllByRole('button');

        if (buttons[0]) {
            const leftButton: HTMLButtonElement = buttons[0];

            const result = await user.click(leftButton);
            expect(cb_handlerLeftOperation).toHaveBeenCalledTimes(1);
            if (cb_handlerLeftOperation.mock.results[0]) {
                expect(cb_handlerLeftOperation.mock.results[0]?.value).toEqual('1');
            };
        };

        if (buttons[2]) {
            const rightButton: HTMLButtonElement = buttons[2];
            await user.click(rightButton);
            expect(cb_handlerRightOperation).toHaveBeenCalledTimes(1);
            if (cb_handlerRightOperation.mock.results[0]) {
                expect(cb_handlerLeftOperation.mock.results[0]?.value).toEqual('1');
            };
        };
    });

    interface iBodyStyle {
        bodyStyle: 'columns' | 'rows';
        expected: 'bodyColumns' | 'bodyRows'
    };

    const tests: iBodyStyle[] = [
       { bodyStyle: 'columns', expected: 'bodyColumns'},
       { bodyStyle: 'rows', expected: 'bodyRows' }
    ];

    test.each(tests)('Checking for expected classNames for specific styles', ({ bodyStyle, expected }) => {
        rerender(<Gallery galleryItems={items}
                          title={true}
                          subtitle={true}
                          select='1'
                          enableSelect={false}
                          bodyStyle={bodyStyle}
                          events={false}
                          verticalGallery={false} />
        );

        const gallery = screen.getByTestId('gallery');
        expect(gallery).toHaveClass(new RegExp('.*' + expected.toLowerCase() + '.*', "i"));
    });

    test('Left operation does not click when not activated', async () => {
        let items: iGalleryItem[] = [{id: '1', title: 'Title', subtitle: 'Subtitle', showLeftOperation: true}];

        rerender(<Gallery galleryItems={items}
                          title={true}
                          subtitle={true}
                          select='1'
                          enableSelect={false}
                          bodyStyle='columns'
                          events={false}
                          verticalGallery={false} />);

        const buttons = screen.getAllByRole('button');

            const leftButton = buttons[0];

            const result = await user.click(leftButton);
            expect(cb_handlerLeftOperation).toHaveBeenCalledTimes(0);
    });

    test('Right operation does not click when not activated', async () => {
        let items: iGalleryItem[] = [{id: '1', title: 'Title', subtitle: 'Subtitle', showRightOperation: true}];

        rerender(<Gallery galleryItems={items}
                          title={true}
                          subtitle={true}
                          select='1'
                          enableSelect={false}
                          bodyStyle='columns'
                          events={false}
                          verticalGallery={false} />);

        const buttons = screen.getAllByRole('button');

            const leftButton = buttons[1];

            const result = await user.click(leftButton);
            expect(cb_handlerRightOperation).toHaveBeenCalledTimes(0);


    });

});
