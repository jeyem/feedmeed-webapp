import { Observable } from 'rxjs'

export interface User {
    name: string
    lastName: string
    imageUrl: string
    roles: string[]
}

export interface Contacts {
    // user: User
    user: any
    type: string
}

export interface RecentUsers extends Contacts {
    time: number
}

export abstract class UserData {
    abstract getUsers(): Observable<User>
    // abstract getContacts(): Observable<Contacts[]>
    // abstract getRecentUsers(): Observable<RecentUsers[]>
}
