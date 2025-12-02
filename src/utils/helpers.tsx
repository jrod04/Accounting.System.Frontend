export const sumTotal = (values: number[]) => {
    const initValue = 0;
    const result = values.reduce(
        (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
        initValue
    );

    return result;
};

export const insertCommas = (num: number) => {
    let result;
    let value = (Math.round(num,2)).toString();
    const front = value.includes('.') ? value.split('.')[0] : value;
    let back = value.includes('.') ? value.split('.')[1] : '00';

    switch (back) {
        case (back.length === 1):
            back = `${back}0`;
            break;
        default:
            break;
    };

    if (front.length > 3) {
        const multiplesOfThree = Math.round(front.length / 3, 0);
        const head = value.slice(0, front.length % 3);
        value = value.slice(front.length % 3, value.length);

        for (let i = 0; i < multiplesOfThree; i++) {
            result = !result ? value.slice(0,3) : result + value.slice(0,3);
            value = value.slice(3, value.length);
        };

        result = `${head},${result}.${back}`;
        return result;
    };

    return value;
};