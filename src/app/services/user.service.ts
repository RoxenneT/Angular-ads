import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    this.http.get('../assets/users.json').subscribe((users: User[] | any) => {
      this.users = users
    })
  }

  registerUser({ newUser }: { newUser: User; }): void {
    this.http.post<User[]>('../assets/users.json', JSON.stringify(newUser))
    this.users.push(newUser)
  }

  getDataToSave(): User[] {
    return this.users;
  }

  loginUser(username: string, password: string): User | undefined {
    const foundUser = this.users.find(user => user.username === username && user.password === password);
    if (foundUser) {
      this.currentUserSubject.next(foundUser);
    }
    console.log(this.users);

    return foundUser;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  editProfile(userId: number, newUsername: string): void {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].username = newUsername;
      this.currentUserSubject.next(this.users[userIndex]);
    }
  }
}
