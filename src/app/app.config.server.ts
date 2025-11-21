import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { provideServerRouting } from "@angular/ssr";
import { appConfig } from "./app.config";
import { serverRoutes } from "./app.routes.server";
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

class FsTranslateLoader implements TranslateLoader {
  constructor(private basePath: string) {}
  getTranslation(lang: string): Observable<any> {
    const file = join(this.basePath, `${lang}.json`);
    try {
      const raw = readFileSync(file, 'utf-8');
      return of(JSON.parse(raw));
    } catch (e) {
      return of({});
    }
  }
}

function serverTranslateLoaderFactory() {
  const publicPath = join(process.cwd(), 'public', 'i18n');
  const srcPath = join(process.cwd(), 'src', 'i18n');
  const base = existsSync(publicPath) ? publicPath : srcPath;
  return new FsTranslateLoader(base);
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    { provide: TranslateLoader, useFactory: serverTranslateLoaderFactory },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
