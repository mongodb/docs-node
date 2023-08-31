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