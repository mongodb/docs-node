const { MongoClient } = require("mongodb");
const fs = require("fs");

const edb = "encryption";
const ekv = "__keyVault";
const secretDB = "medicalRecords";
const secretCollection = "patients";
const keyVaultNamespace = `${edb}.${ekv}`;

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
  const keyVaultCollection = keyVaultClient.db(edb).collection(ekv);

  const dek1 = await keyVaultCollection.findOne({ keyAltNames: "dataKey1" });

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
    // change this to the path you installed the shared library to
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
    const unencryptedColl = keyVaultClient
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
    console.log("\n\n --- Unencrypted Client --- \n\n")
    console.log(await unencryptedColl.findOne({ firstName: /Jon/ }));
    console.log("\n\n --- Encrypted Client --- \n\n")
    console.log(
      await encryptedColl.findOne({ "ssn": "987-65-4320" })
    );
  } finally {
    await keyVaultClient.close();
    await encryptedClient.close();
  }
}

run().catch(console.dir);
