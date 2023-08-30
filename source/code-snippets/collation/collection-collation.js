// start create collection with collation
// Create the "souvenirs" collection and specify the French Canadian collation.
db.createCollection("souvenirs", {
  collation: { locale: "fr_CA" },
});
// end create collection with collation

// start collection query without collation
// Retrieve documents that match "photograph" in the "type" field.
myColl.find({type: "photograph"});
// end collection query without collation

 // start collection query with collation
 /*
   Retrieve documents that match "photograph" in the "type" field,
   sorted by the Iceland collation and uppercase precedence.
*/
 myColl.find({type: "photograph"},
   { collation: { locale: "is", caseFirst: "upper" } }
 );
 // end collection query with collation
