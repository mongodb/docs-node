const { MongoClient } = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");
const fs = require("fs");

const edb = "encryption";
const ekv = "__keyVault";
const keyVaultNamespace = `${edb}.${ekv}`;
const secretDB = "medicalRecords";
const secretCollection = "patients";

const localKeyFilePath = "./local-key.txt";
// WARNING: Do not use a local key file in a production application
const localMasterKey = fs.readFileSync(localKeyFilePath);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};

async function run() {
  // change this to your uri
  const uri = "<Your Connection String>";
  const keyVaultClient = new MongoClient(uri);
  await keyVaultClient.connect();
  // create a key vault
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );
  const clientEncryption = new ClientEncryption(keyVaultClient, {
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders,
  });
  const dek1 = await clientEncryption.createDataKey(provider, {
    keyAltNames: ["dataKey1"],
  });
  const encryptedFieldsMap = {
    [`${secretDB}.${secretCollection}`]: {
      fields: [
        {
          keyId: dek1,
          path: "ssn",
          bsonType: "string",
          queries: { queryType: "equality" },
        },
      ],
    },
  };
  const extraOptions = {
    // change this to the path you installed the shared library to
    cryptSharedLibPath: "<path to Shared Library>",
  };
  const encryptedClient = new MongoClient(uri, {
    autoEncryption: {
      keyVaultNamespace,
      kmsProviders,
      extraOptions,
      encryptedFieldsMap,
    },
  });
  await encryptedClient.connect();
  const encryptedDb = encryptedClient.db(secretDB);
  await encryptedDb.dropDatabase();
  await encryptedDb.createCollection(secretCollection);
  console.log("Created encrypted collection!");
  await keyVaultClient.close();
  await encryptedClient.close();
}

run().catch(console.dir);
