import keyUriParser from '../utils/keyUriParser';
import type {Key} from '../types';

type keyUriParserTestTuple = [string, Key];

const uriList: keyUriParserTestTuple[] = [
  // Valid TOTP
  [
    'otpauth://totp/Authenticator:test@rootauthenticator.com?secret=abcdefghijklmnopqrstuvwxyz&issuer=Authenticator&algorithm=SHA512&digits=6&period=30',
    {
      type: 'totp',
      label: {
        account: 'test@rootauthenticator.com',
        issuer: 'Authenticator',
      },
      query: {
        algorithm: 'SHA512',
        digits: 6,
        issuer: 'Authenticator',
        period: 30,
        secret: 'abcdefghijklmnopqrstuvwxyz',
      },
    },
  ],
  // URL encoded
  [
    'otpauth://totp/Authenticator:test%40test.tld?secret=abcdefghijklmnopqrstuvwxyz&issuer=Authenticator&algorithm=SHA512&digits=6&period=30',
    {
      type: 'totp',
      label: {
        account: 'test@rootauthenticator.com',
        issuer: 'Authenticator',
      },
      query: {
        algorithm: 'SHA512',
        digits: 6,
        issuer: 'Authenticator',
        period: 30,
        secret: 'abcdefghijklmnopqrstuvwxyz',
      },
    },
  ],
  // Valid HOTP
  [
    'otpauth://hotp/Authenticator:test@rootauthenticator.com?secret=abcdefghijklmnopqrstuvwxyz&issuer=Authenticator&algorithm=SHA512&digits=6&period=30&counter=0',
    {
      type: 'hotp',
      label: {
        account: 'test@rootauthenticator.com',
        issuer: 'Authenticator',
      },
      query: {
        algorithm: 'SHA512',
        counter: 0,
        digits: 6,
        issuer: 'Authenticator',
        period: 30,
        secret: 'abcdefghijklmnopqrstuvwxyz',
      },
    },
  ],
];

describe('Key URI parser', () => {
  it.each(uriList)(
    'should output correct values',
    (uri: string, expectedOutput: Key) => {
      const output = keyUriParser(uri);
      return expect(output).toEqual(expectedOutput);
    },
  );
});
