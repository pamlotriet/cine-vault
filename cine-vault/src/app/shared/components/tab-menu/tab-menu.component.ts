import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab-menu',
  imports: [CommonModule, RouterLink,RouterModule],
  standalone: true,
  templateUrl: './tab-menu.component.html',
})
export class TabMenuComponent {}
