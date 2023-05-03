.. important:: Undefined Values
   
   The driver treats ``undefined`` values as ``null`` values in write operations by default.
   If you want the driver to treat fields with ``undefined`` values as non-existent fields,
   you must set the ``ignoreUndefined`` option to ``true``.

   When you specify this option, the driver does not serialize fields
   with ``undefined`` values. The following example inserts two
   documents. One insert operation has the ``ignoreUndefined`` option set to ``true``:

   .. code-block:: javascript
      
      await myColl.insertOne(
        {
          state: "Montana",
          capital: "Helena",
          salesTax: undefined,
        },
        { ignoreUndefined: true }
      );

      await myColl.insertOne({
        state: "New Hampshire",
        capital: "Concord",
        salesTax: undefined,
      });
   
   The documents appear in the collection as follows:

   .. code-block:: javascript
      :copyable: false

      {
        _id: ...,
        state: "Montana",
        capital: "Helena"
      },
      {
        _id: ...,
        state: "New Hampshire",
        capital: "Concord",
        salesTax: null
      }
   
   The driver does not serialize the ``undefined``-valued ``salesTax``
   field in the first insert operation because we specified the ``ignoreUndefined`` option.

   You can specify this option at the operation, collection, database,
   or client level.