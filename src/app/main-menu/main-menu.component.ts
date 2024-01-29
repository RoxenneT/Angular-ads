import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  ads: Ad[] = [];
  constructor(public adsService: AdsService, private router: Router) { }

  ngOnInit(): void {
    this.ads = this.adsService.getAds()
  }

  goToAdDetails(adId: number): void {
    this.adsService.setCurrentAd(this.ads[adId - 1])
    this.router.navigate(['/ad']);
  }
}
