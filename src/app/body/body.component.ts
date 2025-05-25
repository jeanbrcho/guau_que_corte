import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  abrirTelegram() {
    window.open('https://web.telegram.org/k/#-4775274431', '_blank');
  }
}

