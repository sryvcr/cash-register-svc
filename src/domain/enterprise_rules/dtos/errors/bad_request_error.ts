import { ErrorBase } from '../../bases/error_base'
import { ErrorsEnum, HTTPCodesEnum } from '../enums/errors_enums';


export class BadRequestError extends ErrorBase {

    constructor(message: string, metadata?: any) {
        super(
            `${message}`,
            ErrorsEnum.HTTP_REQUEST,
            HTTPCodesEnum.BAD_REQUEST,
            metadata
        );
    }
}
