/*
   Create an index on the "title" field with the "en_US"
   locale collation, specifying ascending ordering of the
   "title" field.
*/
myColl.createIndex(
  { 'title' : 1 },
  { 'collation' : { 'locale' : 'en_US' } });
