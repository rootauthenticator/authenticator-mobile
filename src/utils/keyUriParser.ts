import {URL} from 'react-native-url-polyfill';
import type {Key} from '../types';

const keyUriParser = (uri: string): Key => {
  if (!uri.toLowerCase().startsWith('otpauth:')) {
    throw new Error('Invalid scheme');
  }

  // Hack to fix URL parsing
  uri = uri.replace(/^otpauth/i, 'http');

  const url = new URL(uri);

  const type = url.host.toLowerCase();

  if (!['hotp', 'totp'].includes(type)) {
    throw new Error('Invalid types');
  }

  if (!url.searchParams.has('secret')) {
    throw new Error('secret is required');
  }

  if (
    type === 'hotp' &&
    (!url.searchParams.has('counter') || !url.searchParams.has('period'))
  ) {
    throw new Error('counter and period are required');
  }

  const pathnameSplit = decodeURIComponent(url.pathname).split(/: ?/);

  let issuer = '';
  if (url.searchParams.has('issuer')) {
    issuer = url.searchParams.get('issuer') as string;
  } else if (pathnameSplit.length === 2) {
    issuer = pathnameSplit[0].slice(1);
  }

  let account = '';
  if (pathnameSplit.length === 1) {
    account = pathnameSplit[0].slice(1);
  } else if (pathnameSplit.length === 2) {
    account = pathnameSplit[1];
  }

  const query: Key['query'] = {
    secret: url.searchParams.get('secret') as string,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
  };

  if (url.searchParams.has('issuer')) {
    query.issuer = url.searchParams.get('issuer') as string;
  }
  if (url.searchParams.has('algorithm')) {
    query.algorithm = url.searchParams.get('algorithm') as string;
  }
  if (url.searchParams.has('digits')) {
    query.digits = parseInt(url.searchParams.get('digits') as string, 10);
  }
  if (type === 'hotp' && url.searchParams.has('counter')) {
    query.counter = parseInt(url.searchParams.get('counter') as string, 10);
  }
  if (type === 'hotp' || url.searchParams.has('period')) {
    query.period = parseInt(url.searchParams.get('period') as string, 10);
  }

  return {
    type,
    label: {
      issuer,
      account,
    },
    query,
  } as Key;
};

export default keyUriParser;
