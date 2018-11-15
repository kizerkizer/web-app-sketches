const Http = {}

const StatusCodes = {
    200: 'OK'
};

const Verbs = {
    'GET': Symbol('Verbs.GET')
};

let request = {
    method: Verbs[`GET`],
    uri: '...',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        width: 64,
        height: 64
    })
};

const convertObjectToQueryString = (object) => Object.keys(object).reduce(
    (previous, current, i) => {
        let prefix = i === 0 ? '' : '&';
        return previous + `${prefix}${current}=${object[current]}` ;
    }, '');

const paint = (object: any, fn: Function, deep: boolean = false) => {
    for (let property in object) {
        if (deep) {
            paint(object[property], fn, deep);
        }
        object[property] = fn(object[property]);
    }
    return object;
};

console.log(convertObjectToQueryString({
    foo: 'bar',
    red: [1, 2, 3],
    exists: false
}));