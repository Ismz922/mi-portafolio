import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  // Rutas en español (sin prefijo)
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  
  // Rutas en inglés (con prefijo /en)
  { path: 'en', component: HomeComponent },
  { path: 'en/projects', component: ProjectsComponent },
  { path: 'en/contact', component: ContactComponent },
  
  // Rutas en español explícito (con prefijo /es)
  { path: 'es', component: HomeComponent },
  { path: 'es/projects', component: ProjectsComponent },
  { path: 'es/contact', component: ContactComponent },
  
  // Redirección por defecto
  { path: '**', redirectTo: '' },
];