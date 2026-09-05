import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  private languageService = inject(LanguageService);

  skills = [
    { name: 'JavaScript', icon: 'fab fa-js' },
    { name: 'TypeScript', icon: 'fab fa-js' },
    { name: 'Angular', icon: 'fab fa-angular' },
    { name: 'Laravel', icon: 'fab fa-laravel' },
    { name: '.NET', icon: 'fab fa-microsoft' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'MySQL', icon: 'fas fa-database' },
    { name: 'Power BI', icon: 'fas fa-chart-bar' },
    { name: 'Git', icon: 'fab fa-git-alt' }
  ];

  getRoute(path: string): string {
    return this.languageService.getRoute(path);
  }
}