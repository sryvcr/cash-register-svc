export interface IMapperAPI<TDom, TApi> {
    fromApiToDom(item: TApi, opts?: any): any;
    fromDomToApi(item: TDom, opts?: any): any;
}
