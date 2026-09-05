import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  private languageService = inject(LanguageService);
  
  isMenuOpen = false;
  isScrolled = false;
  currentLang = this.languageService.getLang();

  ngOnInit() {
    // Actualizar el idioma cuando cambia la URL
    this.currentLang.set(this.languageService.getCurrentLangFromUrl());
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  @HostListener('window:popstate', [])
  onPopState() {
    // Actualizar idioma cuando el usuario usa el botón de atrás/adelante
    this.currentLang.set(this.languageService.getCurrentLangFromUrl());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  changeLanguage(lang: string) {
    this.languageService.setLang(lang);
    this.closeMenu();
  }

  getRoute(path: string): string {
    return this.languageService.getRoute(path);
  }
}