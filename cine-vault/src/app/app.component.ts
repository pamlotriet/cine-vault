import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TabMenuComponent } from './shared/components/tab-menu/tab-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabMenuComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'cine-vault';
  router = inject(Router);
}
