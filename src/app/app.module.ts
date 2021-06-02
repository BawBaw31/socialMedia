// Other imoports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';

// MaterialUI imports
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Component imports
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticatorComponent} from './tools/authenticator/authenticator.component';
import { MessageComponent } from './tools/message/message.component';
import { NewsComponent } from './pages/news/news.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostCreatorComponent } from './tools/post-creator/post-creator.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WallComponent } from './pages/wall/wall.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    MessageComponent,
    NewsComponent,
    HeaderComponent,
    FooterComponent,
    PostCreatorComponent,
    ProfileComponent,
    WallComponent
  ],
  imports: [
    CKEditorModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
