function iso8601DateValidator(date: any): boolean {
    const pattern = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T|\s)(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(.[0-9]{1,3})??(Z)?$/;
    if (date.match(pattern)) return true
    else return false;
}

export {
    iso8601DateValidator
}
