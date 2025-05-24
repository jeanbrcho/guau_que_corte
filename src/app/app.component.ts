import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
//hecho por mi
import { BodyComponent } from './body/body.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet,HeaderComponent, BodyComponent],
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'guau_que_corte';
}
