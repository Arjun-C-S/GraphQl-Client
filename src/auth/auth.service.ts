import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * The AuthService is responsible for handling authentication-related functionality within the application.
 *
 * This service includes the `login` method, which takes in a `user` object containing the user's email and password.
 * It generates a JWT (JSON Web Token) using the email as part of the payload and returns an object containing the generated `access_token`.
 *
 * Dependencies:
 * - `JwtService` from `@nestjs/jwt`: Used for signing the JWT and generating the access token. 
 *
 */

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async login(user: { email: string; password: string }) {
        const payload = { email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
