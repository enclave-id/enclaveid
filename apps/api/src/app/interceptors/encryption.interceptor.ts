import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    // Function to decrypt the variables
    function decryptVariables(encryptedVariables) {
      // Implement your decryption logic here
      return JSON.parse(encryptedVariables.replace('encrypted_', '')); // Placeholder
    }

    // Decrypt the variables in the request
    if (request.body.variables) {
      request.body.variables = decryptVariables(request.body.variables);
    }

    return next.handle();
  }
}
