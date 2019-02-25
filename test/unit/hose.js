const Hose = require('../../src/hose.js');
const spy = {result: 0};

describe('Hose', () => {

    it('no yield no call', () => {
        // 10 + 1 - 2  = 9
        (new Hose(10))
            .pipe((res) => {
               spy.result ++;
               resolve(res + 1);
        }).pipe(res => res - 2);

        expect(spy.result).to.equal(0);
    });

    it('yield', () => {
        // 10 + 1 - 2  = 9
        (new Hose(10))
            .pipe((res, resolve) => {
                spy.result ++;
                resolve(res + 1);
            })
            .pipe((res, resolve) => {
                resolve(res - 2);
                spy.result ++;
             })
            .yield((res) => {
                expect(res).to.equal(9);
                expect(spy.result).to.equal(2);
            });
    });

    it('yield invalid', () => {
        // 10 + 1 - 2  = 9
        (new Hose(10))
            .pipe((res, resolve) => {
                resolve(res + 1);
            })
            .pipe((res, resolve) => {
                resolve(res - 2)
            })
            .yield((res) => {
                expect(res).not.to.equal(19);
            });
    });

    it('async yield', async () => {
        // 10 * 4 - 20  = 20
        (new Hose(10))
            .pipe(async(res, resolve) => {
                setTimeout(() => {
                    resolve(res * 4);
                }, 1);
            })
            .pipe(async (res, resolve) => {
                setTimeout(() => {
                    resolve(res - 20);
                }, 2);
            })
            .yield((res) => {
                expect(res).to.equal(20);
            });
    });

    it('async yield invalid', async () => {
        // 100 + 10 - 20  = 90
        (new Hose(100))
            .pipe((res, resolve) => {
                setTimeout(() => {
                    resolve(res + 10);
                }, 1);
            })
            .pipe((res, resolve) => {
                setTimeout(() => {
                    resolve(res - 20);
                }, 2);
            })
            .yield((res) => {
                expect(res).not.to.equal(900);
            });
    });
});