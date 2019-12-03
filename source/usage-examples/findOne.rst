===============
Find a Document
===============

.. default-domain:: mongodb

Overview
--------

You can find a single document using the ``collection.findOne()``
method. ``findOne`` returns the first document matching the query
in the specified sort order, which defaults to a sort by ``_id``.
If no document is found, ``findOne`` returns ``null``. If a
document is found, ``findOne`` returns that document as an Object.
The following snippet finds a single document from the ``movies``
collection:

.. code-block:: javascript

   const { MongoClient } = require('mongodb');


   const client = new MongoClient(
      'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority',
   );

   async function run() {
      try {
         await client.connect();
         const database = client.db('sample_mflix');
         const collection = database.collection('movies');
         const query = { title: 'The Room' };
         const movie = await collection.findOne(query);
         // since this method returns the matched document, not a cursor, print it directly
         console.log(movie);
      } finally {
         await client.close();
      }
   }
   run().catch(console.dir);
