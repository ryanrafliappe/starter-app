import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { TokenExpiredError } from "@nestjs/jwt";

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        if (exception instanceof BadRequestException) {
            const exceptionResponse = exception.getResponse();
            let message = exception.message;

            if (typeof exceptionResponse === 'object' && exceptionResponse['message']) {
            message = exceptionResponse['message'];
            }
            
            response.status(exception.getStatus()).json({
                statusCode: exception.getStatus(),
                success: false,
                message: `${message}`
            })
        } else if (exception instanceof TokenExpiredError) {
            response.status(401).json({
                statusCode: 401,
                success: false,
                message: `Unauthrized. ${exception.message}`
            })
        } else {
            response.status(exception.getStatus()).json({
                statusCode: exception.getStatus(),
                success: false,
                message: exception.message
            });
        }
    }
}