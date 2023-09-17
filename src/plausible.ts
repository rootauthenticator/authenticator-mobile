import AsyncStorage from '@react-native-async-storage/async-storage';
import {version} from '../package.json';

const sendInstallEvent = async () => {
  try {
    const installEventSent = await AsyncStorage.getItem('installEventSent');

    if (installEventSent) {
      return;
    }

    await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'pageview',
        url: 'app://localhost/install',
        domain: 'rootauthenticator.mobile',
        props: {
          version,
        },
      }),
    });

    await AsyncStorage.setItem('installEventSent', JSON.stringify(true));

    return;
  } catch (error) {}
};

export default sendInstallEvent;
