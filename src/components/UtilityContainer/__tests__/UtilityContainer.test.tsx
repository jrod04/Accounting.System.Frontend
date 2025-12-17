import { useState, type ChangeEvent, type MouseEvent, type FocusEvent } from 'react';
import { beforeEach, describe, test, expect, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import UtilityContainer from './../UtilityContainer.tsx';
import InputSearchTextbox from './../../InputSearchTextbox/InputSearchTextbox.tsx';
import ButtonIcon from './../../ButtonIcon/ButtonIcon.tsx';
import { type iListViewGalleryItem } from './../../ListViewGallery/ListViewGallery.tsx';

let container: HTMLElement, user: any, rerender: any;

const TestWrapper = ({zeroChildContainers, width, height}: {zeroChildContainers: boolean, width: number, height: number}) => {
    const [openAside, setOpenAside] = useState<boolean>(false);
    const [operation, setOperation] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('Search...');

    const image = 'data:image/svg+xml,<<svg xmlns="www.w3.org" width="1" height="1" viewBox="0 0 1 1"/>';

    const galleryHeaders = ['headerLeftOperation', 'Code', 'Account', 'Type', 'headerRightOperation'];
    const [galleryItems, setGalleryItems] = useState<iListViewGalleryItem[]>([
        {id:'1',One:'1000',Two:'Business Checking',Three:'Checking'},
        {id:'2',One:'1100',Two:'Money Market - Endowment',Three:'Money Market'}
    ]);

    const cb_handlerAddAccount = () => {
        if (!openAside) setOpenAside(true);
        setOperation('Add Account')
    };

    const cb_handlerLeftFirstOperation = () => {
        if (!openAside) setOpenAside(true);
        setOperation('Edit Account');
    };

    const cb_handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const cb_handlerOnFocus = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value.toLowerCase().trim() === 'search...') setSearchValue('');
    };

    const cb_handlerOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === '') setSearchValue('Search...');
    };

    const inputContainers = [
        <div>
            <InputSearchTextbox ariaLabel='Chart of Accounts Search'
                                errors=''
                                textboxWidth={200}
                                textboxHeight={15}
                                dropdownWidth={218}
                                dropdownHeight={190}
                                iconWidth={25}
                                iconHeight={25}
                                showImage={true}
                                searchValue={searchValue}
                                cb_handlerOnChange={cb_handlerOnChange}
                                cb_handlerOnFocus={cb_handlerOnFocus}
                                cb_handlerOnBlur={cb_handlerOnBlur} />
            <ButtonIcon ariaLabel='Add Account Button'
                        icon={image}
                        width={25}
                        height={25}
                        alt='Add Account Icon'
                        title='Add Account'
                        value=''
                        cb_handlerClick={cb_handlerAddAccount} />
        </div>
    ];

    return(<UtilityContainer backdrop={openAside}
                             ariaLabel='Chart of Accounts'
                             height={height}
                             width={width}
                             justifyContent='flex-end'
                             bgColor='rgba(250,250,250,1)'
                             inputContainers={!zeroChildContainers ? inputContainers : []}
                             border='1px solid rgb(0,0,0)' />
     );
};


describe('Utility Container component', () => {
    beforeEach(() => {
        const renderResult = render(<TestWrapper zeroChildContainers={false}
                                                 width={40}
                                                 height={40} />);
        rerender = renderResult.rerender;
        container = screen.getByTestId('Utility container');
    });

    test('Utility container component displays', () => {
        expect(container).toBeInTheDocument();
    });

    test('Utility container has correct styling', () => {
        expect(container).toHaveStyle({
            width: '40px',
            height: '40px',
            backgroundColor: 'rgb(250,250,250)',
            border: '1px solid rgb(0,0,0);',
            justifyContent: 'flex-end'
        });
    });

    test('Backdrop does not display when backdrop === false', () => {
        const backdrop = screen.queryByTestId('backdrop');
        expect(backdrop).toBeNull();
    });

    test('Backdrop displays when backdrop === true', async () => {
        user = createUser();
        const button = screen.getByRole('button', { name: 'Add Account Button' });
        await user.click(button);
        const backdrop = screen.getByTestId('backdrop');
        expect(backdrop).toHaveAttribute(
           'class',
           expect.stringContaining('wrapperBackdrop')
        );
    });

    test('Error thrown if inputContainers === 0', () => {
        expect(() => render(<TestWrapper zeroChildContainers={true}
                                         width={0}
                                         height={0}/>)).toThrowError();
    });

    test('Width and height of the container', () => {
        rerender(<TestWrapper zeroChildContainers={false}
                              width={0}
                              height={0}/>);
        const container = screen.getByTestId('Utility container')
        expect(container).toHaveStyle({width: '100%', height: '100%'});
    });
});