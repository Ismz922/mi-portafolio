import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = signal<string>('es');
  
  constructor() {
    // Detectar idioma desde la URL al inicio
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      this.currentLang.set('en');
    } else {
      this.currentLang.set('es');
    }
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang: string) {
    this.currentLang.set(lang);
    const currentPath = window.location.pathname;
    
    // Remover el prefijo de idioma actual si existe
    let cleanPath = currentPath.replace(/^\/(en|es)/, '') || '/';
    
    // Si el path está vacío o es solo "/", mantenerlo como "/"
    if (cleanPath === '') {
      cleanPath = '/';
    }
    
    // Construir la nueva ruta con el idioma seleccionado
    const newPath = lang === 'es' ? cleanPath : `/en${cleanPath}`;
    
    // Navegar a la nueva ruta
    window.location.href = newPath;
  }

  getRoute(path: string): string {
    const lang = this.currentLang();
    // Si es español, devolver la ruta sin prefijo
    if (lang === 'es') {
      return path;
    }
    // Si es inglés, agregar el prefijo /en
    return `/en${path}`;
  }

  // Método para obtener el idioma actual de la URL
  getCurrentLangFromUrl(): string {
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      return 'en';
    }
    return 'es';
  }
}