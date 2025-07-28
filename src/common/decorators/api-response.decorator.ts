import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiCreateResponse() {
  return applyDecorators(
    ApiCreatedResponse(), // 201
    ApiBadRequestResponse(), // 400
    ApiConflictResponse(), // 409
    ApiInternalServerErrorResponse(), // 500
  );
}

export function ApiReadResponse() {
  return applyDecorators(
    ApiOkResponse(), // 200
    ApiNotFoundResponse(), // 404
    ApiInternalServerErrorResponse(), // 500
  );
}

export const ApiUpdateResponse = () => {
  return applyDecorators(
    ApiOkResponse(), // 200
    ApiBadRequestResponse(), // 400
    ApiNotFoundResponse(), // 404
    ApiInternalServerErrorResponse(), // 500
  );
};

export const ApiDeleteResponse = () => {
  return applyDecorators(
    ApiNoContentResponse(), // 204
    ApiNotFoundResponse(), // 404
    ApiInternalServerErrorResponse(), // 500
  );
};

export function ApiAuthResponse() {
  return applyDecorators(
    ApiUnauthorizedResponse(), // 401
    ApiForbiddenResponse(), // 403
  );
}
