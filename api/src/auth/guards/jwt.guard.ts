import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }


        // super.logIn(context.switchToHttp().getRequest())

        // WHY DO I HAVE 2 CONSOLE LOG WHEN I RESTRICT PERMISSION FOR ALL IN USER MODULE
        // console.log(context.getClass());
        // console.log(context.getHandler());
        console.log('JwtAuthGuard');
        return super.canActivate(context);
    }
}