import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MAT_CHIPS_DEFAULT_OPTIONS,
  MatDialogModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatIconModule,
} from "@angular/material";
import { MatChipsModule } from "@angular/material/chips";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SimpleNotificationsModule } from "angular2-notifications";
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleChartsModule } from "angular-google-charts";
import { SelectAutocompleteModule } from 'mat-select-autocomplete';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from "./app.reducer";
import { AppEffects } from './app.effects';
import { LoadingInterceptor } from "./services/loading.interceptor";
import { ServerURLInterceptor } from './services/auth.interceptor';
import { AppRoutingModule, APP_DECLARATIONS, APP_ENTRY_COMPONENTS } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ...APP_DECLARATIONS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatDialogModule,
    NgxPaginationModule,
    MatDatepickerModule,
    StoreModule.forRoot(reducer),
    MatCheckboxModule,
    GoogleChartsModule.forRoot(),
    EffectsModule.forRoot(AppEffects),
    MatIconModule,
    SelectAutocompleteModule,
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {},
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerURLInterceptor,
      multi: true,
    }
  ],
  entryComponents: [...APP_ENTRY_COMPONENTS],
  bootstrap: [AppComponent]
})
export class AppModule { }
