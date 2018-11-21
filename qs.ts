interface convertObjectToQueryString {
    (object: any): string;
}

const _getValueByPath = (object: any, path: string[]): any =>
    path.reduce((p, c, i) => {
        return p[c];
    }, object);

const _convertObjectToQueryString 
    = (object: any, path: string[] = []): string => {
        Object.keys(object).reduce((previous, current, index) => {
            let prefix = index === 0 ? '' : '&';
            return previous + `${prefix}${path.join('.')}${path ? '.' : ''}${current}=${path ? _getValueByPath(object, path)[current] : object[current]}`;
        }, '');
    };

const obj2qs (str, ii