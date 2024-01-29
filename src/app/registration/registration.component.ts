import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  loginUsername: string = '';
  loginPassword: string = '';
  loggedInUser: User | undefined
  newId: number = 2;

  constructor(private userService: UserService, private http: HttpClient) { }

  registerUser(username: string, email: string, password: string): void {
    const newUser: User = {
      id: this.newId,
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.newId++;
    this.userService.registerUser({ newUser });  


    this.username = '';
    this.email = '';
    this.password = '';
    console.log(this.newId);
    
  }

  loginUser(username: string, password: string): void {
    this.http.get<User[]>('../assets/users.json').subscribe(
       (users): void => {
      this.loggedInUser = this.userService.loginUser(username, password)
      if (this.loggedInUser) {

        console.log('Вход выполнен:', this.loggedInUser.username);
      } else {
        localStorage.getItem('user')
        console.log('Пользователь не найден');
      }
    },
      error => {
        console.error('Ошибка при получении данных', error);
      }
    );
  }
}
