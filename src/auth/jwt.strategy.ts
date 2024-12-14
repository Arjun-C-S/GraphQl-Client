import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JwtStrategy is a custom Passport strategy used for validating JWT (JSON Web Token) authentication in the application.
 *
 * This strategy extracts the JWT from the `Authorization` header as a Bearer token and validates it using the secret key from the configuration.
 * The `validate` method is invoked after the token is successfully verified, and it returns the user payload (in this case, the email) to be used in subsequent requests.
 *
 * Dependencies:
 * - `ConfigService` from `@nestjs/config`: Used to access the application's configuration, particularly for the JWT secret key.
 * - `PassportStrategy` from `@nestjs/passport`: The base class for implementing Passport strategies in NestJS.
 * - `passport-jwt`: A Passport strategy for handling JWT authentication.
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return { email: payload.email };
    }
}
