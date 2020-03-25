const mint = require('./mint');

describe('hello', () => {
    it('should reuturn hello', () => {
        expect(mint.hello()).toBe("hello")
    });
});

describe('validateDiscorse:', () => {
    describe('correct values', () => {
        it('should pass', () => {
            expect(mint.validate(``)).toBe(true)
            expect(mint.validate(`port.oceanprotocol.com`)).toBe(true)
            expect(mint.validate(`forum.aragon.org`)).toBe(true)
        });
    });
    describe(`has ":" or trailing "/"`, () => {
        it('should return fail string', () => {
            expect(mint.validate(`https://port.oceanprotocol.com/`)).toBe("enter valid Discorse address")
            expect(mint.validate(`https://port.oceanprotocol.com`)).toBe("enter valid Discorse address")
            expect(mint.validate(`port.oceanprotocol.com/`)).toBe("enter valid Discorse address")
        });
    });
});