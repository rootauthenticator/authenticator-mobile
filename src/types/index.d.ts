export type Account = {
  id: string;
  text: string;
  type: 'totp' | 'hotp';
  label: {
    account: string;
    issuer?: string;
  };
  query: {
    secret: string;
    issuer?: string;
    algorithm?: string;
    digits?: number;
    period?: number;
  };
};

export type Key = {
  type: 'totp' | 'hotp';
  label: {
    account: string;
    issuer?: string;
  };
  query: {
    secret: string;
    issuer?: string;
    algorithm?: string;
    digits?: number;
    counter?: number;
    period?: number;
  };
};
