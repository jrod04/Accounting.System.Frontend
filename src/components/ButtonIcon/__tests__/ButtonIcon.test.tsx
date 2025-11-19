import { beforeEach, describe, expect, test, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import Ledger from './../../../assets/ledger.svg';
import ButtonIcon from './../ButtonIcon.tsx';
import constants from './../../../utils/constants.tsx';

let rerender: any;

beforeEach(() => {
   const renderResult = render(<ButtonIcon ariaLabel='Ledger Icon Button'
                                           icon={Ledger}
                                           width={30}
                                           height={35}
                                           alt='Ledger'
                                           title='Ledger'
                                           bgColor={constants.RED} />);
   rerender = renderResult.rerender;
});

describe('ButtonIcon component', () => {
    test('Button shown', () => {
        const button = screen.getByRole('button', { name: 'Ledger Icon Button' });
        expect(button).toBeInTheDocument();
    });

    test('Button with right image shown', () => {
        const image: HTMLImageElement = screen.getByRole('img', { name: 'Ledger' });
        expect(image).toBeInTheDocument();
    });

    test('Image has correct src text', () => {
        const image: HTMLImageElement = screen.getByRole('img', { name: 'Ledger' });
        expect(image.src).toBe(Ledger);
    });

    test('Image has correct alt text', () => {
        const image: HTMLImageElement = screen.getByRole('img', { name: 'Ledger' });
        expect(image.alt).toBe('Ledger');
    });

    test('Image has correct title text', () => {
        const image: HTMLImageElement = screen.getByRole('img', { name: 'Ledger' });
        expect(image.title).toBe('Ledger');
    });

    test('Button has correct width', () => {
        const button = screen.getByRole('button', { name: 'Ledger Icon Button'});
        expect(button).toHaveStyle({width: '30px'});
    });

    test('Button has correct height', () => {
        const button = screen.getByRole('button', { name: 'Ledger Icon Button'});
        expect(button).toHaveStyle({height: '35px'});
    });

    test('Button has correct style background color when included', () => {
        const button = screen.getByRole('button', { name: 'Ledger Icon Button'});
        expect(button).toHaveStyle({backgroundColor: constants.RED})
    });

    test('Button has correct style background color when no bgColor included', () => {
        rerender(<ButtonIcon ariaLabel='Ledger Icon Button'
                             icon={Ledger}
                             width={30}
                             height={35}
                             alt='Ledger'
                             title='Ledger' />);
        const button = screen.getByRole('button', { name: 'Ledger Icon Button'});
        expect(button).toHaveStyle({backgroundColor: ''});
    });


    test('Button clicks', async () => {
        const user = createUser();
        const handlerClick = vi.fn();

        rerender(<ButtonIcon ariaLabel='Ledger Icon Button'
                             icon={Ledger}
                             width={30}
                             height={35}
                             alt='Ledger'
                             title='Ledger'
                             bgColor={constants.RED}
                             cb_handlerClick={handlerClick} />);

        const button = screen.getByRole('button', { name: 'Ledger Icon Button' });
        await user.click(button);
        expect(handlerClick).toBeCalledTimes(1);
    });
});