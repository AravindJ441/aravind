import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootLayoutComponent } from "./components/root-layout/root-layout.component";
import { HomeComponent } from "./components/home/home.component";
import { PageForbiddenComponent } from "./components/page-forbidden/page-forbidden.component";
import {
  AppHeaderComponent,
  PlatformFacebookComponent,
  AddFacebookSettingComponent,
  PlatformTwitterComponent,
  AddTwitterSettingComponent,
  AppleStoreComponent,
  AddApiStoreSettingComponent,
  GooglePlayStoreComponent,
  AddPlayStoreSettingComponent,
  PlatformInstagramComponent,
  AddInstagramSettingComponent,
  DashboardComponent,
  InfoModalComponent,
  ConfirmModalComponent,
  AdminSuggestionComponent,
  DashboardGraphComponent,
} from "./features/index";
import { Loader } from "./components/loader/loader.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: '', component: RootLayoutComponent, pathMatch: 'full' },
  {
    path: 'social-platform', component: HomeComponent,
    children: [
      {
        path: 'facebook',
        canActivate: [AuthGuard],
        component: PlatformFacebookComponent,
      },
      {
        path: 'twitter',
        canActivate: [AuthGuard],
        component: PlatformTwitterComponent,
      },
      {
        path: 'app-store',
        canActivate: [AuthGuard],
        component: AppleStoreComponent,
      },
      {
        path: 'play-store',
        canActivate: [AuthGuard],
        component: GooglePlayStoreComponent,
      },
      {
        path: 'instagram',
        canActivate: [AuthGuard],
        component: PlatformInstagramComponent,
      },
    ]
  },
  {
    path: 'dashboard', component: HomeComponent,
    children: [
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
      {
        path: 'graph',
        canActivate: [AuthGuard],
        component: DashboardGraphComponent,
      },
    ]
  },
  { path: '403', component: PageForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const APP_DECLARATIONS = [
  AppHeaderComponent,
  PlatformFacebookComponent,
  AddFacebookSettingComponent,
  PlatformTwitterComponent,
  AddTwitterSettingComponent,
  AppleStoreComponent,
  AddApiStoreSettingComponent,
  GooglePlayStoreComponent,
  AddPlayStoreSettingComponent,
  PlatformInstagramComponent,
  AddInstagramSettingComponent,
  DashboardComponent,
  InfoModalComponent,
  ConfirmModalComponent,
  AdminSuggestionComponent,
  Loader,
  DashboardGraphComponent,
  PageForbiddenComponent,
  RootLayoutComponent,
  HomeComponent,
];

export const APP_ENTRY_COMPONENTS = [
  AddFacebookSettingComponent,
  AddTwitterSettingComponent,
  AddApiStoreSettingComponent,
  AddPlayStoreSettingComponent,
  AddInstagramSettingComponent,
  InfoModalComponent,
  ConfirmModalComponent,
  AdminSuggestionComponent,
];
