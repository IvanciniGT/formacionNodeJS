export interface HttpRespuesta<T> {
    code: number;
    body?: T;
    error?: any;
}