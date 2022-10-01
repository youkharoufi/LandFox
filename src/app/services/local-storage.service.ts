import { Injectable } from '@angular/core';

const TOKEN = 'jwt-token';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setToken(data:any){
    localStorage.setItem(TOKEN, data);
  }

  getToken(){
    return localStorage.getItem(TOKEN);
  }

  removeToken(){
    localStorage.removeItem(TOKEN);
  }
}
