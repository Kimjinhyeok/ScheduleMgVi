import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor{

    constructor(private auth : AuthService){}

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<any>{
        if(this.auth.isAuthenticated()){
            const token = this.auth.getToken();
            
            const clone : HttpRequest<any> = req.clone({
                headers : new HttpHeaders({
                    'Authorization' : token
                })
            });
            return next.handle(clone);
        }else{
            return next.handle(req);
        }

    }
}