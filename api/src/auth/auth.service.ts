import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser({username, password}: AuthDto) {
        //find if user exist
        const user =  await this.usersService.findOneByUsername(username);
        if (!user){
            return null
        }
        if (password === user?.password) {
            // const {password, ...result} = user;
            // return this.jwtService.sign(result,{expiresIn:'5m'})
            return this.generateUserTokens(user.id, user.role);
        }
    }

    async generateUserTokens(user_id, role) {
        const access_token = this.jwtService.sign({user_id, role}, { expiresIn: '15m'});
        return {
            access_token,
        }
    }



    // async login(user: any) {
    //     const payload = { username: user.username, sub: user.user_id };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }
}
