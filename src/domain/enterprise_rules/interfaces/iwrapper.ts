export interface IWrapper<TDal, TDom> {
    fromDomToDal(item: TDom): TDal;
    fromDalToDom(item: TDal): TDom
}
