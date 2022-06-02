The following table describes the structure of the options object used
by the ``ClientEncryption`` constructor:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Name
     - Description

   * - **keyVaultClient**
     - | *Required*
       | **Type:** `MongoClient <{+api+}/classes/MongoClient.html>`__
       |
       | **Description**
       | A ``MongoClient`` configured to connect to
       | the MongoDB instance hosting your {+key-vault-long+}.
       |
       | To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.
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
