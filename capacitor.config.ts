import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hisyardigital.vcardpro',
  appName: 'VCard Pro',
  webDir: 'out',
  server: {
    url: 'https://hosyardigital.com',
    cleartext: false
  }
};

export default config;

