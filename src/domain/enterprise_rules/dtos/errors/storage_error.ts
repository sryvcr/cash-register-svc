import { ErrorBase } from '../../bases/error_base'
import { ErrorsEnum, HTTPCodesEnum } from '../enums/errors_enums';


export class StorageError extends ErrorBase {

    constructor(metatada?: any) {
        super(
            "Storage error",
            ErrorsEnum.STORAGE_EXCEPTION,
            HTTPCodesEnum.BAD_REQUEST, metatada
        );
    }
}
