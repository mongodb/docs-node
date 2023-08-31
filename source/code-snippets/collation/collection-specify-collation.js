 /*
   Retrieve documents that match "photograph" in the "type" field,
   sorted by the Iceland collation and uppercase precedence.
*/
 myColl.find({type: "photograph"},
   { collation: { locale: "is", caseFirst: "upper" } }
 );

