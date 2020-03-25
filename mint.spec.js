const mint = require('./mint');

describe('hello', () => {
    it('should reuturn hello', () => {
        expect(mint.hello()).toBe("hello")
    });
});