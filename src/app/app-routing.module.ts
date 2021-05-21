import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing pages
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:"news", component: NewsComponent},
  {path:"profile", component: ProfileComponent},
  {path: "", component: HomeComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
