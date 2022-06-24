The following table describes the structure of an
``AutoEncryptionOptions`` object:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Name
     - Description

   * - **keyVaultClient**
     - **Type:** ``MongoClient``

       **Description**
       A ``MongoClient`` configured to connect to
       the MongoDB instance hosting your {+key-vault-long+}. For more

       If you omit the ``keyVaultClient`` option, the driver uses the
       MongoDB instance specified to your ``MongoClient`` containing the
       ``AutoEncryptionOpts`` configuration as the host of your key vault
       collection.

       To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.

       **Default:** ``undefined``
       **Accepted Values:** A configured ``MongoClient``

   * - **keyVaultNamespace**
     - *Required*

       **Type:** String

       **Description:**
       The full :term:`namespace` of the {+key-vault-long+}.

       **Accepted Values:** A string containing the full namespace of the
       {+key-vault-long+}.

   * - **kmsProviders**
     - *Required*

       **Type:** Object

       **Description:**
       The {+kms-long+} (KMS) used by {+qe+} for
       managing your {+cmk-long+}s (CMKs).

       To learn more about ``kmsProviders`` objects, see
       :ref:`qe-fundamentals-kms-providers`.

       To learn more about {+cmk-long+}s, see :ref:`qe-reference-keys-key-vaults`.

       **Accepted Values:** An object containing the KMS provider or providers.

   * - **tlsOptions**
     -  **Type:** Object

       **Description:**
       Options to configure ``TLS`` connections to KMS providers.

       To learn more about ``tlsOptions``, see the `API documentation <{+api+}/interfaces/AutoEncryptionTlsOptions.html>`__.

       **Default:** ``undefined``
       **Accepted Values:** An object containing the TLS options.

   * - **encryptedFieldsMap**
     - **Type:** Object

       **Description:**
       An encryption schema.

       To learn how to construct an encryption schema, see
       :ref:`qe-fundamentals-encrypt-query`.

       **Default:** ``undefined``
       **Accepted Values:** An object containing the encryption schema.

   * - **bypassQueryAnalysis**
     - **Type:** Boolean

       **Description:**
       Disables automatic analysis of outgoing commands. Set ``bypassQueryAnalysis``
       to ``true`` to use explicit encryption on indexed fields without the
       ``crypt_shared`` library. Defaults to ``false`` if not specified.

       **Default:** ``false``
       **Accepted Values:** ``true`` or ``false``

   * - **extraOptions**
     - **Type:** Object

       **Description:**
       ``extraOptions`` relate to communication with the shared library,
       ``crypt_shared``. Continue reading for ``extraOptions`` information.

       **Default:** ``undefined``
       **Accepted Values:** An object containing the extra options.

The following table describes the structure of an ``extraOptions`` object:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Name
     - Description


   * - **cryptSharedLibPath**
     - **Type:** String


       **Description:**
       The path to the ``crypt_shared`` library.

       **Default:** ``undefined``
       **Accepted Values:** A string containing the path to the ``crypt_shared`` library.

   * - **cryptSharedLibRequired**
     - **Type:** Boolean

       **Description:**
       Specifies whether the ``crypt_shared`` library is required.
       If ``cryptSharedLibRequired`` is ``true``, the driver will
       raise an error if the ``crypt_shared`` library is not found.

       **Default:** ``false``
       **Accepted Values:** ``true`` or ``false``
