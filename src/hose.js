class Prms {
    constructor(resolverCallback) {
        const resolve = (res) => {
            if ('function' === typeof this.cb) {
                this.cb.call(this.cb, res);
            }
        }

        resolverCallback.call(resolverCallback, resolve);
    }

    then(cb) {
        this.cb = cb;
    }
}

class Hose {
    constructor(v) {
        this.initValue = v;
        this._init = true;
        this.cal = null;
    }

    pipe(operation) {
        let resolver = null;
        const p = new Promise((resolve) => {
            resolver = resolve;
        });

        if (true === this._init) {
            this.cal = () => {
                setTimeout(() => {operation.call(this, this.initValue, resolver);}, 0);
                // operation.call(this, this.initValue, resolver);
                return p;
            };
            this._init = false;
        } else {
            const _cal = this.cal;
            this.cal = () => {
                _cal.call(this).then((res) => {
                    setTimeout(() => {operation.call(this, res, resolver);}, 0);
                    // operation.call(this, res, resolver);
                });

                return p;
            };
        }

        return this;
    }

    yield(cb) {
        this.cal().then((res) => {
            cb.call(cb, res);
        });
    }
}

module.exports = Hose;