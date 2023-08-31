// start query index collation
/*
   Retrieve documents that match the "year" value "1980"
   in descending order of the value of the "title" field,
   specifying a collation that uses the index.
*/
myColl.find({"year": 1980}, {"collation" : {"locale" : "en_US" }})
  .sort({"title": -1});
// end query index collation

// start query without index collation
/*
   Retrieve documents that match the "year" value "1980"
   in descending order of the value of the "title" field
   that does not use the collation index.
*/ 
myColl.find({"year": 1980})
  .sort({"title": -1});

/*
   Retrieve documents that match the "year" value "1980"
   in descending order of the value of the "title" field,
   specifying a collation that does not use the collation
   index.
*/
myColl.find({"year": 1980}, {"collation" : {"locale" : "en_US", "strength": 2 }})
  .sort({"title": -1});
// end query without index collation
