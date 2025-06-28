import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  styleUrl: './app.scss'
})
export class App {
  protected title = 'registration-app';
}
