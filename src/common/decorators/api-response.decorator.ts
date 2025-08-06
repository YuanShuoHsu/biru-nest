import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

export const ApiCreateResponse = () => {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Created' }), // 201
    ApiBadRequestResponse({ description: 'Bad Request' }), // 400
    ApiConflictResponse({ description: 'Conflict' }), // 409
    // ApiInternalServerErrorResponse(), // 500
  );
};

export const ApiReadResponse = () => {
  return applyDecorators(
    ApiOkResponse({ description: 'OK' }), // 200
    ApiNotFoundResponse({ description: 'Not Found' }), // 404
    // ApiInternalServerErrorResponse(), // 500
  );
};

export const ApiUpdateResponse = () => {
  return applyDecorators(
    ApiOkResponse({ description: 'OK' }), // 200
    ApiBadRequestResponse({ description: 'Bad Request' }), // 400
    ApiNotFoundResponse({ description: 'Not Found' }), // 404
    // ApiInternalServerErrorResponse(), // 500
  );
};

export const ApiDeleteResponse = () => {
  return applyDecorators(
    ApiNoContentResponse({ description: 'No Content' }), // 204
    ApiNotFoundResponse({ description: 'Not Found' }), // 404
    // ApiInternalServerErrorResponse(), // 500
  );
};

// export const ApiAuthResponse = () => {
//   return applyDecorators(
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }), // 401
//     ApiForbiddenResponse({ description: 'Forbidden' }), // 403
//   );
// }
