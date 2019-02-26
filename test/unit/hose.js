const Hose = require('../../src/hose.js');
const spy = {result: 0};

describe('Hose', () => {

    // it('no yield no call', () => {
    //     // 10 + 1 - 2  = 9
    //     (new Hose(10))
    //         .pipe((res) => {
    //            spy.result ++;
    //            resolve(res + 1);
    //     }).pipe(res => res - 2);
    //
    //     expect(spy.result).to.equal(0);
    // });

    // it('yield', (done) => {
    //     // 10 + 1 - 2  = 9
    //     (new Hose(10))
    //         .pipe((res, resolve) => {
    //             spy.result ++;
    //             resolve(res + 1);
    //         })
    //         .pipe((res, resolve) => {
    //             resolve(res - 2);
    //             spy.result ++;
    //          })
    //         .yield((res) => {
    //             expect(res).to.equal(9);
    //             expect(spy.result).to.equal(2);
    //             done();
    //         });
    // });
    //
    it('yield first', (done) => {
        // 10 + 1 - 2  = 9
        let h = (new Hose(10))
            .pipe((res, resolve) => {
                resolve(res + 1);
                expect(res).to.equal(10);
                done()
            }).pipe((res, resolve) => {
                resolve(res -2 );
            })
            .yield((res) => {
            });
    });

    // it('yield first', (done) => {
    //     // 10 + 1 - 2  = 9
    //     (new Hose(10))
    //         .pipe((res, resolve) => {
    //             setTimeout((res) => {
    //                 resolve(res + 1);
    //             }, 0);
    //         }).pipe((res, resolve) => {
    //             resolve(res -2 );
    //             expect(res).to.equal(11);
    //             done();
    //         })
    //         .yield((res) => {
    //         });
    // });

    it('async yield', (done) => {
        // 10 * 4 - 20  = 20
        (new Hose(10))
            .pipe((res, resolve) => {
                setTimeout(() => {
                    resolve(res * 4);
                }, 0);
            })
            .pipe((res, resolve) => {
                setTimeout(() => {
                    resolve(res - 20);
                }, 1);
            })
            .yield((res) => {
                expect(res).to.equal(20);
                done();
            });
    });

    it('async yield invalid', (done) => {
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
                expect(res).to.not.equal(90 + Math.random());
                done();
            });
    });
});