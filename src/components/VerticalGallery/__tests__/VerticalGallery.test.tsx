import { beforeEach, afterEach, describe, test, expect, assert } from 'vitest';
import { screen, render } from '@testing-library/react';
import { type iGalleryItem } from './../../Gallery/Gallery.tsx';
import VerticalGallery from './../VerticalGallery.tsx';

let items: iGalleryItem[] = [{id: '1', title: 'Reliable Rental Properties in Michigan', subtitle: 'LLC'},
                             {id: '2', title: 'Reliable Rental Properties in North Carolina', subtitle: 'LLC'}];
let rerender: any;

describe('Vertical gallery component with gallery=true', () => {
    beforeEach(() => {
        const renderResult = render(<VerticalGallery galleryItems={items}
                                                     verticalGalleryTitle='Vertical Gallery'
                                                     title={true}
                                                     gallery={true}
                                                     area={false}
                                                     verticalGallery={true}
                                                     events={false}
                                                     actionItems={false}
                                                     subtitle={true}
                                                     bodyStyle='columns'
                                                     enableSelect={false} />);
        rerender = renderResult.rerender;
    });

    afterEach(() => {
        items = [{id: '1', title: 'Reliable Rental Properties in Michigan', subtitle: 'LLC'},
                 {id: '2', title: 'Reliable Rental Properties in North Carolina', subtitle: 'LLC'}];
    });

    test('Header management bar displays with each button', () => {
        rerender(<VerticalGallery galleryItems={items}
                                  verticalGalleryTitle='Vertical Gallery'
                                  title={true}
                                  subtitle={true}
                                  gallery={true}
                                  area={false}
                                  verticalGallery={true}
                                  events={false}
                                  actionItems={true}
                                  bodyStyle='columns'
                                  enableSelect={false} />);
        const headerManagement = screen.getByTestId('headerManagement');
        expect(headerManagement).toBeInTheDocument();
    });

    test('Vertical gallery displays', () => {
        const verticalGallery = screen.getByTestId('verticalGallery');
        expect(verticalGallery).toBeInTheDocument();
    });

    test('Vertical gallery title displays', () => {
        const verticalGalleryTitle = screen.getByText('Vertical Gallery');
        expect(verticalGalleryTitle).toBeInTheDocument();
    });

    test('Vertical gallery displays title and subtitle for each galleryItem', async () => {
        const titleSubtitle = await screen.findByText('Reliable Rental Properties in MichiganLLC');
        expect(titleSubtitle).toBeInTheDocument();
    });

    test('Vertical gallery displays with Gallery component', () => {
        const galleries = screen.getAllByTestId('gallery');
        expect(galleries).toHaveLength(2);
    });

    test('Vertical gallery displays bodyGallery and not bodyArea', () => {
        const body = screen.getByTestId('body');
        expect(body).toHaveAttribute(
            'class',
            expect.stringContaining('bodyGallery')
        );
        expect(body).not.toHaveAttribute(
            'class',
            expect.stringContaining('bodyArea')
        );
    });

    test('Vertical gallery displays bodyArea and not bodyGallery', () => {
        rerender(<VerticalGallery galleryItems={items}
                                 verticalGalleryTitle='Vertical Gallery'
                                 title={true}
                                 verticalGallery={true}
                                 gallery={false}
                                 area={<div>Area</div>}
                                 events={false}
                                 actionItems={false}
                                 subtitle={true}
                                 bodyStyle='columns'
                                 enableSelect={false} />);
        const body = screen.getByTestId('body');
        expect(body).toHaveAttribute(
            'class',
            expect.stringContaining('bodyArea')
        );
        expect(body).not.toHaveAttribute(
            'class',
            expect.stringContaining('bodyGallery')
        );
    });
});