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
        const p = new Prms((resolve) => {
            resolver = resolve;
        });

        if (true === this._init) {
            this.cal = () => {
                operation.call(this, this.initValue, resolver);

                return p;
            };
            this._init = false;
        } else {
            const _cal = this.cal;
            this.cal = () => {
                _cal.call(this).then((res) => {
                    operation.call(this, res, resolver);
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