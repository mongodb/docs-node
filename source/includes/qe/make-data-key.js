const { MongoClient, Binary } = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");

const eDB = "encryption";
const eKV = "__keyVault";
const keyVaultNamespace = `${eDB}.${eKV}`;
const secretDB = "medicalRecords";
const secretCollection = "patients";

const fs = require("fs");
const crypto = require("crypto");
try {
  fs.writeFileSync("master-key.txt", crypto.randomBytes(96));
} catch (err) {
  console.error(err);
}

const provider = "local";
const path = "./master-key.txt";
// WARNING: Do not use a local key file in a production application
const localMasterKey = fs.readFileSync(path);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};

async function run() {
  const uri = "<Your Connection String>";
  const keyVaultClient = new MongoClient(uri);
  await keyVaultClient.connect();
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );
  const clientEnc = new ClientEncryption(keyVaultClient, {
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders,
  });
  const dek1 = await clientEnc.createDataKey(provider, {
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
    cryptSharedLibPath: "<path to Shared Library>",
  };
  const encClient = new MongoClient(uri, {
    autoEncryption: {
      keyVaultNamespace,
      kmsProviders,
      extraOptions,
      encryptedFieldsMap,
    },
  });
  await encClient.connect();
  const newEncDB = encClient.db(secretDB);
  await newEncDB.dropDatabase();
  await newEncDB.createCollection(secretCollection);
  console.log("Created encrypted collection!");
  // end-create-enc-collection
  await keyVaultClient.close();
  await encClient.close();
}

run().catch(console.dir);
