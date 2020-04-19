const randomizer = require('../helper/randomizer');

describe('Generate random numbers', () => {
    test('generates 15 random numbers', () => {
        expect(randomizer.generateRandomNumberList()).toHaveLength(15);
    });

    test('generated numbers are sorted', () => {
        const randomNumbers = randomizer.generateRandomNumberList();
        expect(randomNumbers).toEqual(randomNumbers.sort());
    });
});

describe('Count numbers in a range of an array', () => {
    test('numbers between 10-19 should be 0 for [1,7,22,27,35,39,42,47,55,59,61,69,81,88,90]', () => {
        const numberList = [1, 7, 22, 27, 35, 39, 42, 47, 55, 59, 61, 69, 81, 88, 90];
        expect(randomizer.countInRange(numberList, 10, 19)).toBe(0);
    });

    test('numbers between 40-49 should be 2 for [1,7,22,27,35,39,42,47,55,59,61,69,81,88,90]', () => {
        const numberList = [1, 7, 22, 27, 35, 39, 42, 47, 55, 59, 61, 69, 81, 88, 90];
        expect(randomizer.countInRange(numberList, 40, 49)).toBe(2);
    });

    test('numbers between 80-89 should be 4 for [1,7,22,35,39,42,47,55,59,61,69,81,85,88,90]', () => {
        const numberList = [1, 7, 22, 35, 39, 42, 47, 55, 59, 61, 69, 81, 85, 88, 90];
        expect(randomizer.countInRange(numberList, 80, 89)).toBe(4);
    });
});

describe('Validate the generated numbers', () => {
    test('[1,7,22,27,35,39,42,47,55,59,61,69,81,88,90] should be valid', () => {
        const numberList = [1, 7, 22, 27, 35, 39, 42, 47, 55, 59, 61, 69, 81, 88, 90];
        expect(randomizer.validateNumbers(numberList)).toBeTruthy();
    });

    test('[1,7,22,35,39,42,47,55,59,61,69,81,85,88,90] should be invalid', () => {
        const numberList = [1, 7, 22, 35, 39, 42, 47, 55, 59, 61, 69, 81, 85, 88, 90];
        expect(randomizer.validateNumbers(numberList)).toBeFalsy();
    });
});