const map = {};

const _getListeners = (name) => map[name] || (map[name] = []);

const _isValidListener = (listener) => listener && typeof listener === 'function';

const emit = (name, ...args) => {
    let listeners = _getListeners(name);
    for (let length = listeners.length, i = length - 1, listener; i >= 0; i--) {
        if (_isValidListener(listener)) {
            listener(...args);
        } else {
            listeners.splice(i, 1);
        }
    }
};

const on = (name, fn) => {
    let listeners = _getListeners(name);
    listeners.push(fn);
};

const remove = (name, fn) => {
    let listeners = map[name];
    if (listeners) {
        listeners.splice(listeners.indexOf(fn), 1);
    }
};

export {
    emit,
    on,
    remove
}