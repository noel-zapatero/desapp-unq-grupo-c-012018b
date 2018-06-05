import { AuthService } from "./auth/auth.service";
import { HttpHeaders } from "@angular/common/http";

export const httpOptions = (auth:AuthService) => {
    return {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            // TODO: agregar authorizartion token 
        })
    }
}