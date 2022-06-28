The following table describes the structure of an
``AutoEncryptionOptions`` object:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Name
     - Description

   * - **keyVaultClient**
     - | **Type:** `MongoClient <{+api+}/classes/MongoClient.html>`__
       |
       | **Description**
       | A ``MongoClient`` configured to connect to
       | the MongoDB instance hosting your {+key-vault-long+}, used to
       | read and write your {+dek-long+}s.
       |
       | Specify ``keyVaultClient`` if your {+dek-long+}s are in a
       | different cluster than your encrypted data.
       |
       | To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.
       |
       | **Default:** ``undefined``
       |
       | **Accepted Values:** A configured ``MongoClient``

   * - **keyVaultNamespace**
     - | *Required*
       |
       | **Type:** String
       |
       | **Description:**
       | The full namespace of the {+key-vault-long+}.
       |
       | **Accepted Values:** A string containing the full namespace of the
       | {+key-vault-long+}.

   * - **kmsProviders**
     - | *Required*
       |
       | **Type:** Object
       |
       | **Description:**
       | The {+kms-long+} (KMS) used by {+qe+} for
       | managing your {+cmk-long+}s (CMKs).
       |
       | To learn more about ``kmsProviders`` objects, see
       | :ref:`qe-fundamentals-kms-providers`.
       |
       | To learn more about {+cmk-long+}s, see :ref:`qe-reference-keys-key-vaults`.
       |
       | **Accepted Values:** An object containing the KMS provider or providers.

   * - **tlsOptions**
     - | **Type:** Object

       | **Description:**
       | Options to configure TLS connections to KMS providers.
       |
       | To learn more about this configuration, see the `tlsOptions API documentation <{+api+}/interfaces/AutoEncryptionTlsOptions.html>`__.
       |
       | **Default:** ``undefined``
       |
       | **Accepted Values:** An object containing the TLS options.

   * - **encryptedFieldsMap**
     - | **Type:** Object
       |
       | **Description:**
       | An encryption schema that contains which fields to encrypt,
       | field type information, and the desired query type for an
       | encrypted field.
       |
       | To learn how to construct an encryption schema, see
       | :ref:`qe-fundamentals-encrypt-query`.
       |
       | **Default:** ``undefined``
       |
       | **Accepted Values:** An object containing the encryption schema.

   * - **bypassQueryAnalysis**
     - | **Type:** Boolean
       |
       | **Description:**
       | Disables automatic analysis of outgoing commands.
       | When set to``true``, you must use explicit encryption on indexed
       | fields.
       |
       | When set to ``false``, the driver automatically analyzes outgoing
       | commands and encrypts configured fields.
       |
       | The driver performs automatic decryption regardless of the
       | value of this option.
       |
       | **Default:** ``false``
       |
       | **Accepted Values:** ``true`` or ``false``

   * - **extraOptions**
     - | **Type:** Object
       |
       | **Description:**
       | ``extraOptions`` relate to communication with the shared library,
       | ``crypt_shared``. Continue reading for ``extraOptions`` information.
       |
       | **Default:** ``undefined``
       |
       | **Accepted Values:** An object containing the extra options.

The following table describes the structure of an ``extraOptions`` object:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Name
     - Description


   * - **cryptSharedLibPath**
     - | **Type:** String
       |
       | **Description:**
       | The full path to the ``crypt_shared`` library.
       |
       | **Example:** ``/usr/local/lib/mongo_crypt_v1.dylib``
       |
       | **Default:** ``undefined``
       |
       | **Accepted Values:** A string with the full path to the
       | ``crypt_shared`` library.

   * - **cryptSharedLibRequired**
     - | **Type:** Boolean
       |
       | **Description:**
       | Specifies whether the ``crypt_shared`` library is required.
       |
       | When set to ``true``, the driver will raise an error if the ``crypt_shared``
       | library is not found.
       |
       | When set to ``false``, the driver will attempt to use :ref:`mongocryptd <csfle-reference-mongocryptd>`.
       |
       | **Default:** ``false``
       |
       | **Accepted Values:** ``true`` or ``false``
