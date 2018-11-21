interface convertObjectToQueryString {
    (object: any): string;
}

const _getValueByPath = (object: any, path: string[]): any =>
    path.reduce((p, c, i) => {
        return p[c];
    }, object);

const _convertObjectToQueryString = (object: any, path: string[] = []): string => {
        Object.keys(object).reduce((previous, current, index) => {
            let prefix = index === 0 ? '' : '&';
            return previous + `${prefix}${path.join('.')}${path ? '.' : ''}${current}=${path ? _getValueByPath(object, path)[current] : object[current]}`;
        }, '');
        return 'foo';
    };

const isPlainObject = (object: any) =>
    typeof object !== 'boolean'
    && typeof object !== 'function'
    && typeof object !== 'string'
    && typeof object !== 'undefined'
    && typeof object !== 'symbol'
    && typeof object !== 'number'
    && object !== null
    && !Array.isArray(object);

function dots (path, key, value) {
    return [...path, key].join('.');
}

function visit (object, fn, method: 'DFS' | 'BFS' = 'DFS') {
    for (let property in object) {
        if (object.hasOwnProperty(property)) {
            fn(object, property, object[property]);
            if (method === `DFS`) {
                visit(object[property], fn, method);
            }
        }
        if (method === `BFS`) {
            visit(object[property], fn, method);
        }
    }
}

// cyclical references not handled (intentional)
const _encodeObjectAsKeyValuePairs = (object: any, dotPath: string[] = []) => {
    let keyValuePairs = [];
    for (let key in object) {
        if (!object.hasOwnProperty(key)) continue;
        let value = object[key];
        if (isPlainObject(value)) {
            keyValuePairs = keyValuePairs.concat(_encodeObjectAsKeyValuePairs(value, [...dotPath, key]));
        } else {
            keyValuePairs.push([[...dotPath, key].join('.'), value]); // TODO pull out naming logic as strat.
        }
    }
    return keyValuePairs;
}

const encodeObjectAsKeyValuePairs = (object: any) => _encodeObjectAsKeyValuePairs(object);

const encodeObjectAsQueryString = (object: any) => {
    let keyValuePairs = encodeObjectAsKeyValuePairs(object);
    console.log(keyValuePairs);
    return '?' + keyValuePairs
        .map(pair => pair[0] + '=' + pair[1])
        .join('&');
};

let qs = encodeObjectAsQueryString({
    foo: 'bar',
    colors: {
        yellow: false,
        green: true,
        orange: [1, 2, 3],
        pink: {
            r: 123,
            g: 12,
            b: 60
        },
        blue: true
    },
    sam: 95
});

console.log(qs);