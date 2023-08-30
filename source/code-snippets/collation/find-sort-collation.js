/*
   Retrieve documents that match "New York" in the "city" field,
   sorted by the "name" field by using the German collation.
*/
myColl.find({ city: "New York" }, { collation: { locale: "de" } })
  .sort({ name: 1 });
