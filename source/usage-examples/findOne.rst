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

.. literalinclude:: /code-snippets/usage-examples/findOne.js
  :language: javascript
