import { type ChangeEvent, type MouseEvent } from 'react';
import { beforeEach, describe, test, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import InputSearchTextbox from './../InputSearchTextbox.tsx';

let rerender: any, user: any, searchBox: HTMLInputElement, icon: HTMLElement;
let openDropdown = false;
const cb_handlerOnChange = vi.fn((e: ChangeEvent<HTMLInputElement>) => true);
const cb_handlerOnFocus = vi.fn((e: ChangeEvent<HTMLInputElement>) => {});
const cb_handlerOnBlur = vi.fn((e: ChangeEvent<HTMLInputElement>) => {});
const cb_handlerSetSearchValue = vi.fn((searchValue: string) => {});

beforeEach(() => {
    user = createUser();
    cb_handlerOnChange.mockClear();
    cb_handlerOnFocus.mockClear();
    cb_handlerOnBlur.mockClear();
    cb_handlerSetSearchValue.mockClear();
    const renderResult = render(<InputSearchTextbox ariaLabel='Input Search Textbox'
                                                    errors='Error'
                                                    textboxWidth={200}
                                                    textboxHeight={15}
                                                    dropdownHeight={100}
                                                    dropdownWidth={150}
                                                    iconWidth={25}
                                                    iconHeight={25}
                                                    showImage={true}
                                                    searchValue='Search...'
                                                    cb_handlerOnChange={cb_handlerOnChange}
                                                    cb_handlerOnFocus={cb_handlerOnFocus}
                                                    cb_handlerOnBlur={cb_handlerOnBlur}
                                                    cb_handlerSetSearchValue={cb_handlerSetSearchValue} />);
    searchBox = screen.getByRole('textbox', { name: 'Input Search Textbox'});
    icon = screen.getByRole('img', { name: 'Search Button Icon'});
    rerender = renderResult.rerender;
});

describe('Input search textbox component', () => {
    test('Input search textbox component container displays', () => {
        const container = screen.getByTestId('Search container');
        expect(container).toBeInTheDocument();
    });

    test('Input search textbox displays', () => {
        expect(searchBox).toBeInTheDocument();
    });

    test('Input search textbox has correct width', () => {
        expect(searchBox).toHaveStyle('width: 200px');
    });

    test('Input search textbox has correct height', () => {
        expect(searchBox).toHaveStyle('height: 15px');
    });

    test('Icon has correct width', () => {
        expect(icon).toHaveStyle('width: 25px');
    });

    test('Icon has correct height', () => {
        expect(icon).toHaveStyle('height: 25px');
    });

    test('No image shown if showImage=false', () => {
        rerender(<InputSearchTextbox ariaLabel='Input Search Textbox'
                                     errors=''
                                     textboxWidth={200}
                                     textboxHeight={15}
                                     dropdownWidth={100}
                                     dropdownHeight={100}
                                     iconWidth={25}
                                     iconHeight={25}
                                     searchValue='Search...'
                                     showImage={false}
                                     cb_handlerOnChange={cb_handlerOnChange}
                                     cb_handlerOnFocus={cb_handlerOnFocus}
                                     cb_handlerOnBlur={cb_handlerOnBlur}
                                     cb_handlerSetSearchValue={cb_handlerSetSearchValue} />);
        const icon = screen.queryByRole('img', { name: 'Search Button Icon'});
        expect(icon).toBeNull();
    });

    test('Image shown to the right of the textbox if showImage=true', () => {
        const inputInnerContainer = screen.getByTestId('Search container');
        const inputElement = inputInnerContainer.children[0]?.children[0]?.children[0];
        expect(inputElement?.tagName).toBe('INPUT');
    });

    test('Input textbox color gray when searchValue === Search...', () => {
        expect(searchBox).toHaveStyle('color: rgba(0,0,0,0.2)');
    });

    test('Input textbox color black when searchValue !== Search...', () => {
        rerender(<InputSearchTextbox ariaLabel='Input Search Textbox'
                                     errors=''
                                     textboxWidth={200}
                                     textboxHeight={15}
                                     dropdownWidth={100}
                                     dropdownHeight={100}
                                     iconWidth={25}
                                     iconHeight={25}
                                     searchValue='Data'
                                     showImage={false}
                                     cb_handlerOnChange={cb_handlerOnChange}
                                     cb_handlerOnFocus={cb_handlerOnFocus}
                                     cb_handlerOnBlur={cb_handlerOnBlur}
                                     cb_handlerSetSearchValue={cb_handlerSetSearchValue} />);
        const searchBox = screen.getByRole('textbox', { name: 'Input Search Textbox'});
        expect(searchBox).toHaveStyle('color: rgba(0,0,0,1)');
    });

    test('Component ref present and works', () => {

    });

    test('cb_handlerOnChange clicks and returns ChangeEvent<HTMLInputElement>', async () => {
        await user.type(searchBox, 'Data');
        expect(cb_handlerOnChange).toHaveBeenCalledTimes(4);
        const eventArg = cb_handlerOnChange?.mock.calls[0]?.[0] ?? undefined;
        expect(eventArg?.target).toBe(searchBox);
    });

    test('cb_handlerOnFocus clicks and returns ChangeEvent<HTMLInputElement>', async () => {
        await user.click(searchBox);
        expect(cb_handlerOnFocus).toHaveBeenCalledTimes(1);
        const eventArg = cb_handlerOnFocus?.mock.calls[0]?.[0] ?? undefined;
        expect(eventArg?.target).toBe(searchBox);
    });

    test('cb_handlerOnBlur clicks and returns ChangeEvent<HTMLInputElement>', async () => {
        await user.click(searchBox);
        await user.click(icon);
        expect(cb_handlerOnBlur).toHaveBeenCalledTimes(1);
        const eventArg = cb_handlerOnBlur?.mock.calls[0]?.[0] ?? undefined;
        expect(eventArg?.target).toBe(searchBox);
    });

    test('Dropdown width and height', async () => {
        await user.type(searchBox, 'Chart');
        const dropdown = screen.getByTestId('dropdown');
        expect(dropdown).toHaveStyle({width: '150px', height: '100px'});
    });

    test('OnBlur test that the dropdown closes', async () => {
        await user.type(searchBox, 'Checking');
        const otherElement = screen.getByRole('button', {name: 'Input Search Button'});
        await user.click(otherElement);
        const dropdown = screen.queryByTestId('dropdown');
        expect(dropdown).toBeNull();
    });

    test('OnBlur test that dropdownValues contains relatedTarget clickedElement selected value', async () => {


    });

    test('OnBlur test that dropdownValues does not contain relatedTarget clickedElement selected value', async () => {

    });

});
