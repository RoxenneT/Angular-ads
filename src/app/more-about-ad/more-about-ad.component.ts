import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from '../models/ad.model';
import { AdsService } from '../services/ads.service';
import { FavoriteAdsService } from '../services/favorite-ads.service';

@Component({
  selector: 'app-more-about-ad',
  templateUrl: './more-about-ad.component.html',
  styleUrls: ['./more-about-ad.component.css'],
})
export class MoreAboutAdComponent implements OnInit {
  ad: Ad | null = null;
  newComment: string = '';
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private adsService: AdsService,
    private favoriteAdsService: FavoriteAdsService
  ) { }
  ngOnInit(): void {
    const ad: Ad | null  = this.adsService.getCurrentAd();
    let adId: number = 1
    if(ad) {
      adId = ad.id
    }
    this.ad = this.adsService.getAdById(adId);

    if (this.ad) {
      this.isFavorite = this.favoriteAdsService.isFavorite(this.ad);
    }
  }

  addComment(commentText: string): void {
    if (this.ad) {
      const newComment = {
        id: 1,
        username: 'CurrentUser',
        text: commentText,
        dateAdded: new Date().toISOString(),
      };
      this.ad.comments.push(newComment);
      localStorage.setItem('comment', this.newComment)
    }
  }

  addToFavorites(): void {
    if (this.ad) {
      this.favoriteAdsService.addToFavorites(this.ad);
      this.isFavorite = true;
    }
  }

  removeFromFavorites(): void {
    if (this.ad) {
      this.favoriteAdsService.removeFromFavorites(this.ad);
      this.isFavorite = false;
    }
  }
}
