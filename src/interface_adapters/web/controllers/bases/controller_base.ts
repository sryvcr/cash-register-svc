export abstract class ControllerBase {

    abstract get(req: any, res: any, next: any): Promise<void>;
    abstract getById(req: any, res: any, next: any): Promise<void>;
    abstract post(req: any, res: any, next: any): Promise<void>;
    abstract put(req: any, res: any, next: any): Promise<void>;
    abstract delete(req: any, res: any, next: any): Promise<void>;

}
