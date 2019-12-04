===============
Find a Document
===============

.. default-domain:: mongodb

Overview
--------

You can find a single document using the ``collection.findOne()``
method. ``findOne`` takes a query document, an optional sort order,
and an optional projection. ``findOne`` returns a
`Promise <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>`_
that resolves
to the first document matching the query in the specified sort order,
which defaults to
`natural sort order <https://docs.mongodb.com/manual/reference/glossary/#term-natural-order>`_.
If no document matches the query, ``findOne`` returns a Promise that
resolves to ``null``. Since ``findOne`` returns only one document, the
Promise returned by this method resolves to an
`Object <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object>`_
, not a Cursor.

The following snippet finds a single document from the ``movies``
collection:

.. literalinclude:: /code-snippets/usage-examples/findOne.js
  :language: javascript
