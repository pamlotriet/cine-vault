import {
  ApplicationConfig,
  importProvidersFrom,
  NgZone,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { MyPreset } from './shared/theming/theme.preset';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBOvAIMyTG4X-u414KoKurBGsseyEMAIWc',
  authDomain: 'cine-vault-6a811.firebaseapp.com',
  projectId: 'cine-vault-6a811',
  storageBucket: 'cine-vault-6a811.firebasestorage.app',
  messagingSenderId: '713483708068',
  appId: '1:713483708068:web:1dd370f5c3b19b2c7e2831',
  measurementId: 'G-FJEDEE3K3Y',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
  ],
};
