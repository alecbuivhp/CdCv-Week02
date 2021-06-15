describe('main', function () {
    describe('#validatePassword()', function () {
        it('should return true if password pass all the requirements', function () {
            assert.equal(true, validatePassword("Tuitest@123"));
        });

        it('should return false if there is no uppercase letter, no number, no symbol', function () {
            assert.equal(false, validatePassword("notvalidate"));
        });
    });
});