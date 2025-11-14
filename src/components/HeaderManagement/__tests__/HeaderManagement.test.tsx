import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import constants from './../../../utils/constants.tsx';
import createUser from './../../../utils/createUser.tsx';
import Cog from './../../../assets/cog.svg';
import HeaderManagement from './../HeaderManagement.tsx';

type tButton = {
    handler: (idItem: string) => string;
    img: React.ReactNode;
};

let user: any;
let rerender: any;
let handlerClick = vi.fn((idItem: string) => idItem);
let img: React.ReactNode = <img src={Cog} alt='cog' />;
let testedBtn = {
    handler: handlerClick,
    img: img
};

beforeEach(() => {
    user = createUser();
    handlerClick.mockClear();

    testedBtn = {
        handler: handlerClick,
        img: img
    };

    const renderResult = render(<HeaderManagement selected='1' bgColor={constants.TAN} />);
    rerender = renderResult.rerender;
});

describe('Header management component', () => {
    test('Header management shown', () => {
        const headerManagement = screen.getByTestId('headerManagement');
        expect(headerManagement).toBeInTheDocument();
    });

    test('Header management displays right color', () => {
        const headerManagement = screen.getByTestId('headerManagement');
        expect(headerManagement).toHaveAttribute(
            'style',
            expect.stringContaining('background-color: rgb(236, 223, 204)')
        );
    });

    test('Left first button hidden', () => {
        const leftFirstBtn = screen.queryByRole('button', { name: 'cog' })
        expect(leftFirstBtn).toBeNull();
    });

    test('Left first button => button shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFirstBtn={testedBtn}/> );
        const leftFirstBtn = screen.getByRole('button', { name: 'cog'});
        expect(leftFirstBtn).toBeInTheDocument();
    });

    test('Left first button => image and alt shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFirstBtn={testedBtn}/> );
    });

    test('Left first button => button clicks', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFirstBtn={testedBtn}/> );
        const leftFirstBtn = screen.getByRole('button', { name: 'cog'});
        await user.click(leftFirstBtn);
        expect(handlerClick).toHaveBeenCalledTimes(1);
    });

    test('Left first button => function returns valid selected id (the primary key for the record)', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFirstBtn={testedBtn}/> );
        const leftFirstBtn = screen.getByRole('button', { name: 'cog'});
        await user.click(leftFirstBtn);
        expect(handlerClick).toHaveBeenCalledWith('1');
    });
});