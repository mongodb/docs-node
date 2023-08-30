// start findOneAndDelete example without collation
/* 
   Delete the first document that contains a value greater
   than 100 in the "a" field when ordered by using the default
   binary collation order.
*/
await myColl.findOneAndDelete({ a: { $gt: "100" } });
// end findOneAndDelete example without collation

// start findOneAndDelete example with collation
/* 
   Delete the first document that contains a value greater
   than 100 in the "a" field when ordered by using the
   English numeric collation order.
*/
myColl.findOneAndDelete(
  { a: { $gt: "100" } },
  { collation: { locale: "en", numericOrdering: true } },
);
// end findOneAndDelete example with collation
