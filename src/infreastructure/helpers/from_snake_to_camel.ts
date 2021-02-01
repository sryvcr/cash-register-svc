export function fromSnakeToCamel(item: any) {
    const mapItem: any = { ...item };
    for (let key in mapItem) {
        const newKey = snakeToCamel(key);
        mapItem[newKey] = mapItem[key];
        if (key !== newKey) delete mapItem[key];
    }
    return mapItem;
}

const snakeToCamel = (_string: string) => {
    return _string.replace(/([-_][a-z])/g, (group: any) => group.toUpperCase()
        .replace('-', '')
        .replace('_', '')
    );
}
