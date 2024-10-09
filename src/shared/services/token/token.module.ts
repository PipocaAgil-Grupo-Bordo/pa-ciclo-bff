import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.TOKEN_SECRET,
            }),
        }),
    ],
    exports: [TokenService],
    providers: [TokenService],
})
export class TokenModule {}
