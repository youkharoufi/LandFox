import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { GroundZeroComponent } from './Shared/ground-zero/ground-zero.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { SearchPipe } from './Pipes/search-pipe/search-pipe.component';
import { MatCardModule } from '@angular/material/card';
import { ItemsListAdminComponent } from './items/items-list-admin/items-list-admin.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { MatInputModule } from '@angular/material/input';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { SignleItemComponent } from './items/signle-item/signle-item.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { InterInterceptor } from './services/inter.interceptor';
import { GuardService } from './services/guard.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CartComponent } from './cart/cart/cart.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { UserFormComponent } from './users/user-form/user-form.component';

const material = [
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  TextFieldModule,
  MatBadgeModule,
  MatSlideToggleModule
];

const routes: Routes = [
  {
    path: '',
    component: GroundZeroComponent,
    children: [
      //Categories
      { path: 'categories/list', component: CategoryListComponent },
      { path: 'categories/form', component: CategoryFormComponent },
      { path: 'categories/form/:id', component: CategoryFormComponent },

      //Items
      { path: '', component: ItemListComponent },
      { path: 'items/list', component: ItemsListAdminComponent },
      {
        path: 'items/form',
        component: ItemFormComponent,
        canActivate: [GuardService],
      },
      {
        path: 'items/form/:id',
        component: ItemFormComponent,
        canActivate: [GuardService],
      },
      { path: 'items/single-item/:id', component: SignleItemComponent },

      //Users
      { path: 'users/login', component: LoginComponent },
      { path: 'users/register', component: RegisterComponent },
      { path: 'users/list', component: UsersListComponent},
      { path: 'users/form', component:UserFormComponent},
      { path: 'users/form/:id', component:UserFormComponent},

      //Cart
      {path:'cart', component:CartComponent}
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GroundZeroComponent,
    SearchPipe,
    ItemsListAdminComponent,
    CategoryListComponent,
    CategoryDialogComponent,
    CategoryFormComponent,
    ItemListComponent,
    ItemFormComponent,
    SignleItemComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    UsersListComponent,
    UserDialogComponent,
    UserFormComponent,
  ],
  imports: [
    ...material,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SearchPipe,
    { provide: HTTP_INTERCEPTORS, useClass: InterInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
