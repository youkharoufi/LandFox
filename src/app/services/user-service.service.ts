import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiURLUsers = environment.apiURL + 'users';

  constructor(private http : HttpClient, private router : Router) { }

  login(email:string, password:string):Observable<{token:string, user:string, isAdmin:boolean}>{
    return this.http.post<{token:string, user:string, isAdmin:boolean}>(`${this.apiURLUsers}/login`, {email, password}).pipe(
      map(userInfo =>{
        localStorage.setItem('user', userInfo.user);
        if(userInfo.isAdmin !== undefined){
          localStorage.setItem('userAdmin', JSON.stringify(userInfo.isAdmin));
        }else{
          localStorage.setItem('userAdmin', JSON.stringify(false));
        }
        //localStorage.setItem('token', userInfo.token);
        this.router.navigate(['/']);
        return userInfo;
      })
    )
  }

  signup(email:string, password:string, isAdmin?:boolean):Observable<User>{
    return this.http.post<User>(`${this.apiURLUsers}/register`, {email,password,isAdmin});
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiURLUsers)
  }

  getOneUser(userId:string):Observable<User>{
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`)
  }

  createUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.apiURLUsers}/register`, user)
  }

  updateUser(user:User, userId : string):Observable<User>{
    return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user)
  }

  deleteUser(userId:string):Observable<User>{
    return this.http.delete<User>(`${this.apiURLUsers}/${userId}`);
  }
}
