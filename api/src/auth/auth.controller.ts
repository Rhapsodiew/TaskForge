import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @Public()
    @UseGuards(LocalGuard)
    login(@Req() req) {
        console.log(req.user)
        return req.user;
    }

    
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    profile(@Req() req) {
        console.log(req.user)
        console.log('profile method');
        console.log(req.user);
        return req.user;
    }
}
