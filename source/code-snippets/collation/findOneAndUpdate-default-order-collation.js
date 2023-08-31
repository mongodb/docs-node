/*
   Update the "verified" field to "true" for the first document
   that precedes "Gunter" when ordered by using the
   default binary collation order.
*/
myColl.findOneAndUpdate(
  { first_name : { $lt: "Gunter" } },
  { $set: { verified: true } }
);