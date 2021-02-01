import { ErrorBase } from '../../bases/error_base'
import { ErrorsEnum, HTTPCodesEnum } from '../enums/errors_enums';


export class ResourceNotFoundError extends ErrorBase {

    constructor(message: string, metadata?: any) {
        super(
            message,
            ErrorsEnum.HTTP_REQUEST,
            HTTPCodesEnum.RESOURCE_NOT_FOUND,
            metadata
        );
    }
}
