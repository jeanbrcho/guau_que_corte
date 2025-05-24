import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent],
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'guau_que_corte';
}
