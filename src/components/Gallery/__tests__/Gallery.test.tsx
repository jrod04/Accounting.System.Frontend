import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import Gallery from './../Gallery.tsx';
import { type iGalleryItem } from './../Gallery.tsx';


describe('Gallery component', () => {
    let items: iGalleryItem[] = [{id: '1', title: 'Title', subtitle: 'Subtitle'}];

    test('Gallery shown', () => {
        render(<Gallery galleryItems={items}
                        title={true}
                        subtitle={true}
                        select='1'
                        enableSelect={false}
                        bodyStyle='columns'
                        events={false}
                        verticalGallery={false} />);
        const gallery = screen.getByTestId('gallery');
        expect(gallery).toBeInTheDocument();
    });


    test('Gallery title and subtitle shown', () => {
        render(<Gallery galleryItems={items}
                        title={true}
                        subtitle={true}
                        select='1'
                        enableSelect={false}
                        bodyStyle='columns'
                        events={false}
                        verticalGallery={false} />);
        const btn: HTMLButtonElement = screen.getByRole('button');
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

        const user = createUser();

        const cb_handlerLeftOperation = vi.fn((data) => {
            return data;
        });

        const cb_handlerRightOperation = vi.fn((data) => {
            return data;
        });

        render(<Gallery galleryItems={items}
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
                expect(cb_handlerLeftOperation.mock.results[0].value).toEqual({
                    id: '1',
                    title: 'Title',
                    subtitle: 'Subtitle',
                    showLeftOperation: true,
                    showRightOperation: true,
                    activateLeftOperation: true,
                    activateRightOperation: true,
                    itemClicked: 'Left'
                });
            };
        };

        if (buttons[2]) {
            const rightButton: HTMLButtonElement = buttons[2];
            await user.click(rightButton);
            expect(cb_handlerRightOperation).toHaveBeenCalledTimes(1);
            if (cb_handlerRightOperation.mock.results[0]) {
                expect(cb_handlerRightOperation.mock.results[0].value).toEqual({
                    id: '1',
                    title: 'Title',
                    subtitle: 'Subtitle',
                    showLeftOperation: true,
                    showRightOperation: true,
                    activateLeftOperation: true,
                    activateRightOperation: true,
                    itemClicked: 'Right'
                });
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
        render(<Gallery galleryItems={items}
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
});
