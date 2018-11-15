import {
    emit
} from './hub';

const automaton = new class {
    private _state: string;
    get state (): string {
        return this._state;
    }
    set state (value: string): void {
        let previousState = this._state;
        this._state = value;
        emit('jsonparser.stateChange', previousState, value);
    }
    
const tokenizeJsonString = (jsonString) => {
    let character;
    for (
        let i = 0, l = jsonString.length; 
        i < l && (character = jsonString[i], true);
        i++
    ) {
        if (automaton.state === 'start') {
            if (character === '{') {
                automaton.state = 'reading:object';
                continue;
            }
            if (character === '[') {
                automaton.state = 'reading:array';
                continue;
            }
        }
    }
}