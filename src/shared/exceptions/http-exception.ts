import { HttpException, HttpStatus } from '@nestjs/common';

export interface HttpExceptionResponse {
    code: string;
    data?: string;
    message: string;
}

export class CustomHttpException extends HttpException {
    constructor(response: HttpExceptionResponse, status: HttpStatus) {
        super(response, status);
    }
}

export class CustomBadRequestException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.BAD_REQUEST);
    }
}

export class CustomConflictException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.CONFLICT);
    }
}

export class CustomForbiddenException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.FORBIDDEN);
    }
}

export class CustomNotFoundException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.NOT_FOUND);
    }
}

export class CustomPayloadTooLargeException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.PAYLOAD_TOO_LARGE);
    }
}

export class CustomRequestTimeoutException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.REQUEST_TIMEOUT);
    }
}

export class CustomUnauthorizedException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.UNAUTHORIZED);
    }
}

export class CustomNotAcceptableException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.NOT_ACCEPTABLE);
    }
}

export class CustomUnsupportedMediaTypeException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
}

export class CustomInternalServerErrorException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class CustomNotImplementedException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.NOT_IMPLEMENTED);
    }
}

export class CustomMethodNotAllowedException extends CustomHttpException {
    constructor(response: HttpExceptionResponse) {
        super(response, HttpStatus.METHOD_NOT_ALLOWED);
    }
}
