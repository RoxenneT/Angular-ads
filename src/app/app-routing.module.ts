import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { MoreAboutAdComponent } from './more-about-ad/more-about-ad.component';

const routes: Routes = [
  { path: 'menu', component: MainMenuComponent },
  { path: 'registr', component: RegistrationComponent },
  { path: 'cabinet', component: CabinetComponent },
  { path: 'ad', component: MoreAboutAdComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
