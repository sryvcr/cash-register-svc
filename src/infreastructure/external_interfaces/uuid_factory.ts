import uuid from 'uuid/v4';
import validate from 'uuid-validate';

function uuidGen(): string {
    return uuid();
}

function uuidValidator(id: string): boolean {
    if(!id) return false;
    return validate(id, 4);
}

const service = { uuidGen, uuidValidator };
export default service;
export { uuidGen, uuidValidator };
