===============
Find a Document
===============

.. default-domain:: mongodb


.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

Overview
--------

You can find a single document using the ``collection.findOne()``
method. If no document is found, ``findOne`` returns ``null``. If a
document is found, ``findOne`` returns that document as an Object.
The following snippet finds a single document from the ``movies``
collection:

.. code-block:: javascript

   const { MongoClient } = require('mongodb');

   const client = new MongoClient(
      'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority'
   );

   async function run() {
      try {
         await client.connect();
         const database = client.db("sample_mflix");
         var collection = database.collection("movies");
         const movie = await collection.findOne({"title" : "The Room"});
         // since this method returns the matched document, not a cursor, we can print it directly
         console.log(movie);
      } finally {
         await client.close();
      }
   }
   run().catch(console.dir);
