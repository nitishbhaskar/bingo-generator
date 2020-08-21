const thirtyNumbersTicket = require('../helper/thirtyNumbersTicket');

describe('30 numbers ticket', () => {
    describe('Generate random numbers for a given range', () => {
        test('generates 6 random numbers from 1-18', () => {
            expect(thirtyNumbersTicket.generateRandomNumbersInRange(1, 18, 6)).toHaveLength(6);
        });
        test('generates 6 random numbers from 19-36', () => {
            expect(thirtyNumbersTicket.generateRandomNumbersInRange(19, 36, 6)).toHaveLength(6);
        });
        test('generates 6 random numbers from 37-54', () => {
            expect(thirtyNumbersTicket.generateRandomNumbersInRange(37, 54, 6)).toHaveLength(6);
        });
        test('generates 6 random numbers from 55-72', () => {
            expect(thirtyNumbersTicket.generateRandomNumbersInRange(54, 72, 6)).toHaveLength(6);
        });
        test('generates random numbers from 73-90', () => {
            expect(thirtyNumbersTicket.generateRandomNumbersInRange(73, 90, 6)).toHaveLength(6);
        });
    });

    describe('Generate the ticket', () => {
        test('ticket has 30 numbers', () => {
            const ticket = thirtyNumbersTicket.getTicket();
            expect(ticket.list).toHaveLength(30);
        });
    });
});