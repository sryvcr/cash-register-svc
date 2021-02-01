export function fromCamelToSnake(item: any) {
    const mapItem: any = { ...item };
    for (let key in mapItem) {
        const newKey = camelToSnake(key);
        mapItem[newKey] = mapItem[key];
        if (key !== newKey) delete mapItem[key];
    }
    return mapItem;
}

const camelToSnake = (_string: string) => {
    return _string.replace( /([A-Z])/g, "_$1").toLowerCase();
}
