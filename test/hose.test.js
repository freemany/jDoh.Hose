const Hose = require('../src/hose.js');

const assertSame = (e, r) => {
    const result = (e === r);

    console.log(result);
};

const assertNotSame = (e, r) => {
    const result = (e !== r);

    console.log(result);
};


// 10 + 1 - 2 = 9
 (new Hose(10))
    .pipe((res, resolve) => {
        resolve(res + 1);
    }).pipe((res, resolve) => {
       resolve(res - 2);
    })
    .yield((res) => {
        assertSame(res, 9);
    });

(new Hose(10))
    .pipe((res, resolve) => {
        resolve(res + 1);
    }).pipe((res, resolve) => {
    resolve(res - 2);
})
    .yield((res) => {
        assertNotSame(res, 19);
    });

// 10 + 1 - 2 = 9
(new Hose(10))
    .pipe((res, resolve) => {
        setTimeout(() => {
            resolve(res + 1);
         }, 100);
    }).pipe((res, resolve) => {
    resolve(res - 2);
})
    .yield((res) => {
        assertSame(res, 9);
    });

(new Hose(10))
    .pipe((res, resolve) => {
        setTimeout(() => {
            resolve(res + 1);
        }, 1);
    }).pipe((res, resolve) => {
       setTimeout(() => {
           resolve(res - 2);
       }, 2);
    })
    .yield((res) => {
        assertSame(res, 9);
    });

// 10 + 1 - 2 = 9
(new Hose(10))
    .pipe((res, resolve) => {
        setTimeout(() => {
            resolve(res + 1);
        }, 100);
    }).pipe((res, resolve) => {
    resolve(res - 2);
})
    .yield((res) => {
        assertNotSame(res, 19);
    });

(new Hose(10))
    .pipe((res, resolve) => {
        setTimeout(() => {
            resolve(res + 1);
        }, 1);
    }).pipe((res, resolve) => {
    setTimeout(() => {
        resolve(res - 2);
    }, 2);
})
    .yield((res) => {
        assertNotSame(res, 19);
    });