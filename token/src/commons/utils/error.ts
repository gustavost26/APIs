import { ERRORS } from './../constants/error';
import * as HTTP_CODES from 'http-status';

export function generateHttpCode(error: any): number {
    let httpCode: number;
    if (error && error.type) {
      switch (error.type) {
        case ERRORS.badRequest:
          httpCode = HTTP_CODES.BAD_REQUEST;
          break;
        case ERRORS.conflict:
          httpCode = HTTP_CODES.CONFLICT;
          break;
        case ERRORS.internalServerError:
          httpCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
          break;
        default:
          httpCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
          break;
      }
    } else {
      httpCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
    }
  
    return httpCode;
  }