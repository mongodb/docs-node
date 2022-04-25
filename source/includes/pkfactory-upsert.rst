.. important:: PkFactory in Upsert Operations

    When performing an :ref:`upsert operation
    <node-fundamentals-upsert>`, the driver doesn't use any
    ``PkFactory`` methods. Instead, the driver always creates
    ``ObjectId`` values for the ``_id`` field of the
    upserted documents.

    If you want to use ``PkFactory`` methods, peform a :ref:`find
    operation <node-fundamentals-retrieve-data>`, then an :ref:`update
    <node-fundamentals-change-a-document>` or :ref:`insert
    <node-fundamentals-insert-data>` operation.
