import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing pages
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';

const routes: Routes = [
  {path:"news/:userId", component: NewsComponent},
  {path: "", component: HomeComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
