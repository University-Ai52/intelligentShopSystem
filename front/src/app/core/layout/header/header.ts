import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [CommonModule,RouterLink,RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  links = [{href: '/home', label: 'Home'}, {href: '/about', label: 'About'}, {href: '/product', label: 'Product'}];
isLoggedIn = signal<boolean>(false);
}
