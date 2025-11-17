import { beforeEach, afterEach, describe, test, expect, vi, type MockedFunction } from 'vitest';
import { screen, render } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import { type iGalleryItem } from './../../Gallery/Gallery.tsx';
import SearchGallery from './../SearchGallery.tsx';

let rerender: any, user: any;
const handlerClick: MockedFunction<(id: string) => string> | undefined = vi.fn((id: string) => id);
let items: iGalleryItem[] = [
    { id: '1', title: 'Title 1', subtitle: 'Subtitle 1' },
    { id: '2', title: 'Title 2', subtitle: 'Subtitle 2' }
];

beforeEach(() => {
    items = [
        { id: '1', title: 'Title 1', subtitle: 'Subtitle 1' },
        { id: '2', title: 'Title 2', subtitle: 'Subtitle 2' }
    ];
    user = createUser();
    handlerClick.mockClear();
    const renderResult = render(<SearchGallery items={items} cb_handlerSelectEvent={handlerClick} />);
    rerender = renderResult.rerender;
});

describe('Search gallery component', () => {
    test('Search gallery shown', () => {
        const searchGallery = screen.getByTestId('searchGallery');
        expect(searchGallery).toBeInTheDocument();
    });

    test('Search Gallery with <input /> displayed', () => {
        const userInput: HTMLInputElement = screen.getByRole('textbox', { name: 'User Input' });
        expect(userInput).toBeInTheDocument();
    });

    test('Search gallery init with "Search..." in <input />', () => {
        const userInput: HTMLInputElement = screen.getByRole('textbox', { name: 'User Input'});
        expect(userInput.value).toBe('Search...');
    });

    test('Search gallery displays correct user input', async () => {
        const userInput: HTMLInputElement = screen.getByRole('textbox', { name: 'User Input' });
        await user.type(userInput, 'Title 1');
        expect(userInput.value).toBe('Title 1');
    });

    test('Search gallery displays correct filtered items after user input', async () => {
        const userInput: HTMLInputElement = screen.getByRole('textbox', { name: 'User Input' });
        await user.type(userInput, 'Title 1');
        const itemTitleOne = screen.getByText('Title 1Subtitle 1');
        expect(itemTitleOne).toBeInTheDocument();
    });

    test('Search gallery does not display incorrect filtered items after user input', async () => {
        const userInput: HTMLInputElement = screen.getByRole('textbox', { name: 'User Input' });
        await user.type(userInput, 'Title 1');
        const itemTitleTwo = screen.queryByText('Title 2Subtitle 2');
        expect(itemTitleTwo).toBeNull();
    });

    test('Search gallery with <Gallery /> displayed', () => {
        const gallery = screen.getAllByTestId('gallery');
        expect(gallery.length > 0);
    });

    test('Search gallery with items displayed', () => {
        const data = screen.getByText('Title 1Subtitle 1');
        expect(data).toBeInTheDocument();
    });

    test('Search gallery filteredItems finds no items => displays No results found!', () => {
        items = [];
        rerender(<SearchGallery items={items} />);
        const noItemFound = screen.getByText('No results found!');
        expect(noItemFound).toBeInTheDocument();
    });

    test('Search gallery with correct filtering => SearchValue includes item title', async () => {
        const userInput = screen.getByRole('textbox', {name: 'User Input' });
        await user.type(userInput, 'Subtitle 1');
        // The entire HTMLElement is Title 1<br />Subtitle 1
        const subtitleOne = screen.getByText('Title 1Subtitle 1');
        expect(subtitleOne).toBeInTheDocument();
    });

    test('Search gallery clicking item button returns correct number of clicks', async () => {
        const handlerClick = vi.fn((id: string) => id);
        rerender(<SearchGallery items={items} cb_handlerSelectEvent={handlerClick} />);
        const btn = screen.getByRole('button', { name: '1'} );
        await user.click(btn);
        expect(handlerClick).toBeCalledTimes(1);
    });

    test('Search gallery clicking item button returns correct id value', async () => {
        const handlerClick = vi.fn((id: string) => id);
        rerender(<SearchGallery items={items} cb_handlerSelectEvent={handlerClick} />);
        const btn = screen.getByRole('button', { name: '1'} );
        await user.click(btn);
        expect(handlerClick.mock.results[0]?.value).toBe('1');
    });

    test('Search gallery input value returns to Search... onBlur when input value = empty string', async () => {
        const userInput: HTMLInputElement = screen.getByRole('textbox', { name: 'User Input' });
        await user.type(userInput, ' ');
        const galleryContainer = screen.getByTestId('galleryContainer');
        await user.click(galleryContainer);
        expect(userInput.value).toBe('Search...');
    });
});