import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer";
import { NavbarComponent } from "./components/navbar/navbar";

@Component({
  imports: [RouterOutlet, FooterComponent, NavbarComponent], // ← Solo una vez
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('mi-portafolio');
}