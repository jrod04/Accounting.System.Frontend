import { beforeEach, describe, expect, test, vi, type MockedFunction } from 'vitest';
import createUser from './../../../utils/createUser.tsx';
import { screen, render } from '@testing-library/react';
import ListViewGallery, { type iListViewGalleryItem } from './../ListViewGallery.tsx';
import Trashcan from './../../../assets/trashcan.svg';

let rerender: any, user: any;
const handlerClick: MockedFunction<(data: iListViewGalleryItem) => string> | undefined = vi.fn(
    (data: iListViewGalleryItem) => {
        const id: string = data.id;
        return id;
    });
const galleryHeaders: string[] = ['Header 1'];
const galleryColumns: string[] = ['One'];
const galleryItems: iListViewGalleryItem[] = [{id: '1', One: 'Data 1'}];

beforeEach(() => {
    user = createUser();
    handlerClick.mockClear();
    const renderResult = render(<ListViewGallery ariaLabel='List View Gallery'
                                                 galleryHeaders={galleryHeaders}
                                                 galleryColumns={galleryColumns}
                                                 galleryItems={galleryItems}
                                                 rightFirstOperationImage={Trashcan}
                                                 cb_handlerRightFirstOperation={handlerClick} />);
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
        expect(handlerClick).toBeCalledTimes(1);
    });

    test('List view gallery right second operation calls successfully', async () => {
        rerender(<ListViewGallery ariaLabel='List View Gallery'
                                  galleryHeaders={galleryHeaders}
                                  galleryColumns={galleryColumns}
                                  galleryItems={galleryItems}
                                  rightSecondOperationImage={Trashcan}
                                  cb_handlerRightSecondOperation={handlerClick} />);
        const button = screen.getByRole('button', { name: 'Right Second Operation-1' });
        await user.click(button);
        expect(handlerClick).toBeCalledTimes(1);
    });

    test('List view gallery left first operation calls successfully', async () => {
        rerender(<ListViewGallery ariaLabel='List View Gallery'
                                  galleryHeaders={galleryHeaders}
                                  galleryColumns={galleryColumns}
                                  galleryItems={galleryItems}
                                  leftOperationImage={Trashcan}
                                  cb_handlerLeftFirstOperation={handlerClick} />);
        const button = screen.getByRole('button', { name: 'Left First Operation-1' });
        await user.click(button);
        expect(handlerClick).toBeCalledTimes(1);
    });

    test('List view gallery displays correct styles.headerLeftOperation class', () => {
        const galleryHeaders: string[] = ['headerLeftOperation'];
        const galleryColumns: string[] = ['One'];

        rerender(<ListViewGallery ariaLabel='List View Gallery'
                                  galleryHeaders={galleryHeaders}
                                  galleryColumns={galleryColumns}
                                  galleryItems={galleryItems}
                                  leftHeaderImage={Trashcan}
                                  cb_handlerLeftHeaderOperation={handlerClick} />);
        const headers = screen.getByRole('button', {name: 'headerLeftOperation'} );
        expect(headers).toHaveAttribute(
            'class',
            expect.stringContaining('headerLeftOperation')
        );
    });

    test('List view gallery displays correct styles.headerRightOperation class', () => {
        const galleryHeaders: string[] = ['headerRightOperation'];
        const galleryColumns: string[] = ['One'];

        rerender(<ListViewGallery ariaLabel='List View Gallery'
                                  galleryHeaders={galleryHeaders}
                                  galleryColumns={galleryColumns}
                                  galleryItems={galleryItems}
                                  rightHeaderImage={Trashcan}
                                  cb_handlerRightHeaderOperation={handlerClick} />);
        const headers = screen.getByRole('button', {name: 'headerRightOperation'} );
        expect(headers).toHaveAttribute(
            'class',
            expect.stringContaining('headerRightOperation')
        );
    });

    test('', () => {

    });
});