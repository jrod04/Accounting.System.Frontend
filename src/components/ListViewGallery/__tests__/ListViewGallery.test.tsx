import { type MouseEvent } from 'react';
import { beforeEach, describe, expect, test, vi, type MockedFunction } from 'vitest';
import createUser from './../../../utils/createUser.tsx';
import { screen, render } from '@testing-library/react';
import ListViewGallery, { type iListViewGalleryItem } from './../ListViewGallery.tsx';
import Trashcan from './../../../assets/trashcan.svg';

let rerender: any, user: any;
const handlerHeaderClick: MockedFunction<(e: MouseEvent) => string> | undefined = vi.fn(
    (e: MouseEvent) => {
        const id: string | undefined = (e.target as HTMLButtonElement).id;
        return id;
    }
);
const handlerNotHeaderClick: MockedFunction<(data: iListViewGalleryItem) => string> | undefined = vi.fn(
    (data: iListViewGalleryItem) => {
        const id: string = data.id;
        return id;
    }
);
const galleryHeaders: string[] = ['Header 1'];
const galleryItems: iListViewGalleryItem[] = [{id: '1', One: 'Data 1'}];

beforeEach(() => {
    user = createUser();
    handlerHeaderClick.mockClear();
    handlerNotHeaderClick.mockClear();
    const renderResult = render(<ListViewGallery ariaLabel='List View Gallery'
                                                 galleryHeaders={galleryHeaders}
                                                 galleryItems={galleryItems}
                                                 rightFirstOperationImage={Trashcan}
                                                 cb_handlerRightFirstOperation={handlerNotHeaderClick} />);
    rerender = renderResult.rerender;
});

describe('ListViewGallery component', () => {
    test('List view gallery displayed, name checks aria-label', () => {
        const listViewGallery = screen.getByRole('table', { name: 'List View Gallery' });
        expect(listViewGallery).toBeInTheDocument();
    });

    test('List view gallery displays correct header data', () => {
        const header = screen.getByText('Header 1');
        expect(header).toBeInTheDocument();
    });

    test('List view gallery displays correct column data', () => {
        const column = screen.getByText('Data 1');
        expect(column).toBeInTheDocument();
    });

    test('List view gallery right first operation calls successfully', async () => {
        const button = screen.getByRole('button', { name: 'Right First Operation-1' });
        await user.click(button);
        expect(handlerNotHeaderClick).toBeCalledTimes(1);
    });

    test('List view gallery right second operation calls successfully', async () => {
        rerender(<ListViewGallery ariaLabel='List View Gallery'
                                  galleryHeaders={galleryHeaders}
                                  galleryItems={galleryItems}
                                  rightSecondOperationImage={Trashcan}
                                  cb_handlerRightSecondOperation={handlerNotHeaderClick} />);
        const button = screen.getByRole('button', { name: 'Right Second Operation-1' });
        await user.click(button);
        expect(handlerNotHeaderClick).toBeCalledTimes(1);
    });

    test('List view gallery left first operation calls successfully', async () => {
        rerender(<ListViewGallery ariaLabel='List View Gallery'
                                  galleryHeaders={galleryHeaders}
                                  galleryItems={galleryItems}
                                  leftFirstOperationImage={Trashcan}
                                  cb_handlerLeftFirstOperation={handlerNotHeaderClick} />);
        const button = screen.getByRole('button', { name: 'Left First Operation-1' });
        await user.click(button);
        expect(handlerNotHeaderClick).toBeCalledTimes(1);
    });

    test('List view gallery displays correct styles.headerLeftOperation class', () => {
        const galleryHeaders: string[] = ['headerLeftOperation'];

        rerender(<ListViewGallery ariaLabel='List View Gallery'
                                  galleryHeaders={galleryHeaders}
                                  galleryItems={galleryItems}
                                  leftHeaderImage={Trashcan}
                                  cb_handlerLeftHeaderOperation={handlerHeaderClick} />);
        const headers = screen.getByRole('button', {name: 'headerLeftOperation'} );
        expect(headers).toHaveAttribute(
            'class',
            expect.stringContaining('headerLeftOperation')
        );
    });

    test('List view gallery displays correct styles.headerRightOperation class', () => {
        const galleryHeaders: string[] = ['headerRightOperation'];

        rerender(<ListViewGallery ariaLabel='List View Gallery'
                                  galleryHeaders={galleryHeaders}
                                  galleryItems={galleryItems}
                                  rightHeaderImage={Trashcan}
                                  cb_handlerRightHeaderOperation={handlerHeaderClick} />);
        const headers = screen.getByRole('button', {name: 'headerRightOperation'} );
        expect(headers).toHaveAttribute(
            'class',
            expect.stringContaining('headerRightOperation')
        );
    });
});