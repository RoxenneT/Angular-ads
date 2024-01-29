import { Injectable } from '@angular/core';
import { Ad } from '../models/ad.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private ads: Ad[] = [];
  private currentAdSubject: BehaviorSubject<Ad | null> = new BehaviorSubject<Ad | null>(null);

  constructor(private http: HttpClient) {
    this.http.get('../assets/ads.json').subscribe((ads: Ad[] | any) => {
      this.ads = ads
    })
  }

  getAds(): Ad[] {
    return this.ads;
  }

  setCurrentAd(ad: Ad): void {
    this.currentAdSubject.next(ad)
  }

  getCurrentAd(): Ad | null {
    return this.currentAdSubject.value
  }

  createAd(newAd: Ad): void {
    this.ads.push(newAd)
  }

  getAdById(adId: number): Ad {
    if(adId > this.ads.length) {
      return this.ads[0]
    }
    return this.ads[adId - 1]
  }

  getAdsByAuthorId(authorId: number): Ad[] {
    return this.ads.filter(ad => ad.authorId === authorId);
  }
}

