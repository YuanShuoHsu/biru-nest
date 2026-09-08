import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import type { AuthRequest } from '../guards/roles.guard';

export const OrganizationId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string =>
    context.switchToHttp().getRequest<AuthRequest>().organizationId!,
);
