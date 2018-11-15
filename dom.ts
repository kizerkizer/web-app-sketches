import {
    emit
} from './hub';

const nativeDomEventNames = []

///////// wrapped events

document.body.addEventListener('click', function (event) {
    emit('dom.click', this, event);
});

// TODO

///////// manipulation

const _templateElement = document.createElement('template');

function _createFromHtmlString (htmlString: string): Element {
    _templateElement.innerHTML = htmlString;
    return _templateElement.content.firstChild as Element;
}

function _createFromHtmlTagName (htmlTagName: string): Element {
    return document.createElement(htmlTagName);
}

const _htmlTagNameRegex = /^[a-z][a-z0-9]*(\-[a-z0-9]+)?$/gi;

function _isHtmlTagName (string: string) {
    return string.indexOf('<')     < 0 ||
           string.indexOf('>')     < 0 ||
           string.indexOf(' ')     < 0 ||
           string.indexOf('\n')    < 0 ||
           _htmlTagNameRegex.test(string);
}

function _selectFirstElement (selector: string): Element {
    return document.querySelector(selector);
}

function _selectAllElements (selector: string): Element[] {
    return [...document.querySelectorAll(selector)];
}

const create = (html: string): Element => {
    if (_isHtmlTagName(html)) {
        return _createFromHtmlTagName(html);
    }
    return _createFromHtmlString(html);
};

const select = (selector, all = false): Element | Element[] => {
    return all ? _selectAllElements(selector) : _selectFirstElement(selector);
};



export {
    select,
    create
};