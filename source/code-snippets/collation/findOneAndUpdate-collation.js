// start findOneAndUpdate without collation
/*
   Update the "verified" field to "true" for the first document
   that precedes "Gunter" when ordered by using the
   default binary collation order.
*/
myColl.findOneAndUpdate(
  { first_name : { $lt: "Gunter" } },
  { $set: { verified: true } }
);
// end findOneAndUpdate without collation

// start findOneAndUpdate with collation
/* 
   Update the "verified" field to "true" for the first document
   that precedes "Gunter" when ordered by using the
   German phonebook collation order.
*/
myColl.findOneAndUpdate(
  { first_name: { $lt: "Gunter" } },
  { $set: { verified: true } },
  { collation: { locale: "de@collation=phonebook" } },
);
// end findOneAndUpdate with collation
