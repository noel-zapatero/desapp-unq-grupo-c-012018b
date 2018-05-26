interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '3dRBNMBtBuW7LQOETJT4fsA81cEaEQoi',
  domain: 'killscript.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
