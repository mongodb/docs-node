The following table describes the structure of the options object used
by the ``ClientEncryption`` constructor:

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Parameter

     - Type

     - Required

     - Description

   * - ``keyVaultClient``

     - ``MongoClient``

     - No

     - A ``MongoClient`` configured to connect to
       the MongoDB instance hosting your {+key-vault-long+}. For more

       If you omit the ``keyVaultClient`` option, the driver uses the
       MongoDB instance specified to your ``ClientEncryption`` constructor.

       To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.

   * - ``keyVaultNamespace``

     - String

     - Yes

     - The full :term:`namespace` of the {+key-vault-long+}.

   * - ``kmsProviders``

     - Object

     - Yes

     - The {+kms-long+} (KMS) used by {+qe+} for
       managing your {+cmk-long+}s (CMKs).

       To learn more about ``kmsProviders`` objects, see
       :ref:`qe-fundamentals-kms-providers`.

       To learn more about {+cmk-long+}s, see :ref:`qe-reference-keys-key-vaults`.

   * - ``tlsOptions``

     - Object

     - No

     - Options to configure ``TLS`` connections to KMS providers.

       To learn more about ``tlsOptions``, see the `API documentation <{+api+}/interfaces/AutoEncryptionTlsOptions.html>`__.

