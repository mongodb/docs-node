/*
   Retrieve documents that match the "year" value "1980"
   in descending order of the value of the "title" field,
   specifying a collation that uses the index.
*/
myColl.find({"year": 1980}, {"collation" : {"locale" : "en_US" }})
  .sort({"title": -1});