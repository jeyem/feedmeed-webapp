import { Injectable } from '@angular/core'
import { UserData, User } from '../data/users'
import { NbAuthService } from '@nebular/auth'
import { first, map } from 'rxjs/operators'

@Injectable()
export class UserService extends UserData {
    constructor(private _authService: NbAuthService) {
        super()
    }

    getUsers() {
        return this._authService.getToken().pipe(
            first(),
            map(res => res.getPayload() as User)
        )
    }
}
