import { Injectable } from '@angular/core';
import { Ad } from '../models/ad.model';

@Injectable({
    providedIn: 'root',
})
export class FavoriteAdsService {
    private favoriteAds: Ad[] = [];

    addToFavorites(ad: Ad): void {
        if (!this.isFavorite(ad)) {
            this.favoriteAds.push(ad);
        }
    }

    removeFromFavorites(ad: Ad): void {
        const index = this.favoriteAds.findIndex((favAd) => favAd.id === ad.id);
        if (index !== -1) {
            this.favoriteAds.splice(index, 1);
        }
    }

    isFavorite(ad: Ad): boolean {
        return this.favoriteAds.some((favAd) => favAd.id === ad.id);
    }

    getFavoriteAds(): Ad[] {
        return this.favoriteAds;
    }
}
