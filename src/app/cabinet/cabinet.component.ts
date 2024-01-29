import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { Ad } from '../models/ad.model';
import { UserService } from '../services/user.service';
import { AdsService } from '../services/ads.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent {
  user: User | null;
  myAds: Ad[] = []; 
  editProfileDialog: boolean = true;
  newUsername: string = '';
  category: string = '';
  title: string = '';
  description: string = '';
  lastid: number = 0;

  constructor(private userService: UserService, private adsService: AdsService, private http: HttpClient) {
    this.user = this.userService.getCurrentUser();
    console.log(this.user?.username);
    
    
    if (this.user) {
      this.myAds = this.adsService.getAdsByAuthorId(this.user.id);
    }
  }

  editProfile(newUsername: string): void {
    if (this.user) {
      this.userService.editProfile(this.user.id, newUsername);
      this.editProfileDialog = false;
    }
  }

  createAd(category: string, title: string, description: string): void {
    const u: User | null = this.user
    if (u) {
      let ads: Ad[] = this.adsService.getAds()
      this.lastid = ads[ads.length - 1].id;
    
      const newAd: Ad = {
        id: this.lastid + 1, 
        authorId: u.id,
        category: category,
        title: title,
        description: description,
        dateAdded: new Date().toISOString(),
        images: [],
        comments: []
      };
      
      this.adsService.createAd(newAd);
      this.myAds = this.adsService.getAdsByAuthorId(u.id);
      this.clearCreateAdForm();
    }
  }

  clearCreateAdForm(): void {
    this.category = '';
    this.title = '';
    this.description = '';
  }
}
