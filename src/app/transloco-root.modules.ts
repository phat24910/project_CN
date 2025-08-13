import { NgModule, isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoModule, TRANSLOCO_CONFIG, translocoConfig, TRANSLOCO_LOADER } from '@jsverse/transloco';

@NgModule({
  imports: [TranslocoModule, HttpClientModule],
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'vi'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
