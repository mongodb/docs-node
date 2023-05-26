import { MongoClient } from 'mongodb';
import { createMongoDBOIDCPlugin } from '@mongodb-js/oidc-plugin';

// All config options are optional.
const config = {
  openBrowser: {
    command: 'open -a "Firefox"',
  },
};

const client = await MongoClient.connect(
  'mongodb+srv://.../?authMechanism=MONGODB-OIDC',
  {
    ...createMongoDBOIDCPlugin(config).mongoClientOptions,
  }
);
