import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';

import React from 'react';
import {AppRegistry} from 'react-native';
import {I18nProvider} from '@lingui/react';
import {i18n} from '@lingui/core';
import {messages as catalogEn} from './src/locales/en/messages';
import sendInstallEvent from './src/plausible';
import {name as appName} from './app.json';
import App from './src/App';

sendInstallEvent();

i18n.load('en', catalogEn);
i18n.activate('en');

export default function MyApp() {
  return (
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  );
}

AppRegistry.registerComponent(appName, () => MyApp);
