import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Gallery from './../Gallery.tsx';
import { type iGalleryItem } from './../Gallery.tsx';

describe('Gallery component', () => {
    let items: iGalleryItem[] = [{id: '1', title: 'Title', subtitle: 'Subtitle'}];

    test('Gallery presence, title shown, subtitle shown', () => {
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

        const btn: HTMLButtonElement = screen.getByRole('button');
        expect(btn.textContent).toBe('TitleSubtitle');
    });

    test('Gallery functions shown, activated and clicked', async () => {
        const handlerLeftClick = vi.fn();
        const handlerRightClick = vi.fn();

        items = [{id: '1',
                  title: 'Title',
                  subtitle: 'Subtitle',
                  showLeftOperation: true,
                  showRightOperation: true,
                  activateLeftOperation: true,
                  activateRightOperation: true
        }];

        render(<Gallery galleryItems={items}
                        title={true}
                        subtitle={true}
                        select='1'
                        enableSelect={false}
                        bodyStyle='columns'
                        events={false}
                        verticalGallery={false}
                        cb_handlerLeftOperation={handlerLeftClick}
                        cb_handlerRightOperation={handlerRightClick} />);

        const buttons: HTMLButtonElement[] = screen.getAllByRole('button');

        if (buttons[0]) {
            const leftButton: HTMLButtonElement = buttons[0];
            await userEvent.click(leftButton);
            expect(handlerLeftClick).toHaveBeenCalledTimes(1);
        };

        if (buttons[2]) {
            const rightButton: HTMLButtonElement = buttons[2];
            await userEvent.click(rightButton);
            expect(handlerRightClick).toHaveBeenCalledTimes(1);
        };

});


});
