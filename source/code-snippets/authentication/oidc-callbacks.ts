import { MongoClient } from 'mongodb';
import { createMongoDBOIDCPlugin } from '@mongodb-js/oidc-plugin';

// All config options are optional.
// Please see https://github.com/mongodb-js/oidc-plugin/#example-usage for more information.
const config = {
  openBrowser: {
    command: 'open -a "Firefox"',
  },
  allowedFlows: ['auth-code']
};

const client = await MongoClient.connect(
  'mongodb+srv://.../?authMechanism=MONGODB-OIDC',
  {
    ...createMongoDBOIDCPlugin(config).mongoClientOptions,
  }
);
