// begin client encryption
const clientEncryption = new ClientEncryption(keyVaultClient, {
  keyVaultNamespace: keyVaultNamespace,
  kmsProviders: kmsProviders,
});
// end client encryption

// begin qe mongoclient
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
// end qe mongoclient
