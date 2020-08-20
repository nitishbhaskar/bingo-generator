const fifteenNumbersTicket = require('../helper/fifteenNumbersTicket');

describe('15 numbers ticket', () => {
    describe('Generate random numbers', () => {
        test('generates 15 random numbers', () => {
            expect(fifteenNumbersTicket.generateRandomNumberList()).toHaveLength(15);
        });

        test('generated numbers are sorted', () => {
            const randomNumbers = fifteenNumbersTicket.generateRandomNumberList();
            expect(randomNumbers).toEqual(randomNumbers.sort((a, b) => {
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            }));
        });

        test('generated initial numbers are valid', () => {
            const initialNumberList = fifteenNumbersTicket.getInitialNumberList();
            expect(fifteenNumbersTicket.validateNumbers(initialNumberList)).toBeTruthy();
        });
    });

    describe('Count numbers in a range of an array', () => {
        test('numbers between 10-19 should be 0 for [1,7,22,27,35,39,42,47,55,59,61,69,81,88,90]', () => {
            const numberList = [1, 7, 22, 27, 35, 39, 42, 47, 55, 59, 61, 69, 81, 88, 90];
            expect(fifteenNumbersTicket.countInRange(numberList, 10, 19)).toBe(0);
        });

        test('numbers between 40-49 should be 2 for [1,7,22,27,35,39,42,47,55,59,61,69,81,88,90]', () => {
            const numberList = [1, 7, 22, 27, 35, 39, 42, 47, 55, 59, 61, 69, 81, 88, 90];
            expect(fifteenNumbersTicket.countInRange(numberList, 40, 49)).toBe(2);
        });

        test('numbers between 80-89 should be 4 for [1,7,22,35,39,42,47,55,59,61,69,81,85,88,90]', () => {
            const numberList = [1, 7, 22, 35, 39, 42, 47, 55, 59, 61, 69, 81, 85, 88, 90];
            expect(fifteenNumbersTicket.countInRange(numberList, 80, 89)).toBe(4);
        });
    });

    describe('Validate the generated numbers', () => {
        test('[1,7,22,27,35,39,42,47,55,59,61,69,81,88,90] should be invalid', () => {
            const numberList = [1, 7, 22, 27, 35, 39, 42, 47, 55, 59, 61, 69, 81, 88, 90];
            expect(fifteenNumbersTicket.validateNumbers(numberList)).toBeFalsy();
        });

        test('[3, 18, 26, 33, 42, 54, 68, 77, 86] should be valid', () => {
            const numberList = [3, 18, 26, 33, 42, 54, 68, 77, 86];
            expect(fifteenNumbersTicket.validateNumbers(numberList)).toBeTruthy();
        });

        test('[1,7,22,35,39,42,47,55,59,61,69,81,85,88,90] should be invalid', () => {
            const numberList = [1, 7, 22, 35, 39, 42, 47, 55, 59, 61, 69, 81, 85, 88, 90];
            expect(fifteenNumbersTicket.validateNumbers(numberList)).toBeFalsy();
        });

        test('[3, 18, 21, 38, 48, 51, 61, 71, 81, 54, 89, 7, 17, 4, 8] should be invalid', () => {
            const numberList = [3, 18, 21, 38, 48, 51, 61, 71, 81, 54, 89, 7, 17, 4, 8];
            expect(fifteenNumbersTicket.validateNumbers(numberList)).toBeFalsy();
        });

        test('[1,12,17,27,35,39,42,47,55,59,61,69,81,88,90] should be valid', () => {
            const numberList = [1, 7, 22, 27, 35, 39, 42, 47, 55, 59, 61, 69, 81, 88, 90];
            expect(fifteenNumbersTicket.validateNumbers(numberList)).toBeFalsy();
        });

        test('Randomly generated numbers should be valid', () => {
            const ticket = fifteenNumbersTicket.getTicket();
            expect(fifteenNumbersTicket.validateNumbers(ticket.list)).toBeTruthy();
        });
    });
});



