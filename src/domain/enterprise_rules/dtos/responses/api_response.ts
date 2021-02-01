export class ApiResponse {

    status : number;
    result : any

    constructor(status : number, result : any) {
        this.result = result || undefined;
        this.status = status || 200;
    }

}
