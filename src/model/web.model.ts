export class WebResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
}