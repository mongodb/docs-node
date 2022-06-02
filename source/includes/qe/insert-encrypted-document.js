const { MongoClient } = require("mongodb");

const eDB = "encryption";
const eKV = "__keyVault";
const secretDB = "medicalRecords";
const secretCollection = "patients";
const keyVaultNamespace = `${eDB}.${eKV}`;

const fs = require("fs");
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
  const unencryptedClient = new MongoClient(uri);
  await unencryptedClient.connect();
  const keyVaultClient = unencryptedClient.db(eDB).collection(eKV);

  const dek1 = await keyVaultClient.findOne({ keyAltNames: "dataKey1" });

  const encryptedFieldsMap = {
    [`${secretDB}.${secretCollection}`]: {
      fields: [
        {
          keyId: dek1._id,
          path: "ssn",
          bsonType: "int",
          queries: { queryType: "equality" },
        },
     ],
    },
  };

  const extraOptions = {
    cryptSharedLibPath: "<path to Shared Library>",
  };

  const encryptedClient = new MongoClient(uri, {
    autoEncryption: {
      keyVaultNamespace: keyVaultNamespace,
      kmsProviders: kmsProviders,
      extraOptions: extraOptions,
      encryptedFieldsMap: encryptedFieldsMap,
    },
  });
  await encryptedClient.connect();
  try {
    const unencryptedColl = unencryptedClient
      .db(secretDB)
      .collection(secretCollection);

    const encryptedColl = encryptedClient
      .db(secretDB)
      .collection(secretCollection);
    await encryptedColl.insertOne({
      firstName: "Jon",
      ssn: "987-65-4320",
      medications: ["Atorvastatin", "Levothyroxine"],
    });
    console.log("Finding a document with regular (non-encrypted) client.");
    console.log(await unencryptedColl.findOne({ firstName: /Jon/ }));
    console.log(
      "Finding a document with encrypted client, searching on an encrypted field"
    );
    console.log(
      await encryptedColl.findOne({ "ssn": "987-65-4320" })
    );
    // end-find
  } finally {
    await unencryptedClient.close();
    await encryptedClient.close();
  }
}

run().catch(console.dir);
