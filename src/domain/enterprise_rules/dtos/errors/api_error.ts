import { ErrorsEnum } from '../enums/errors_enums';


export class ApiError {

    code: number;
    message: string;
    metadata: any;

    constructor(code: number, message: string, metadata?: any) {
        this.code = code || ErrorsEnum.UNDEFINED;
        this.message = message || "Internal server error";
        this.metadata = metadata;
    }

}
