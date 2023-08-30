// Retrieve the total matching names, grouped by the first_name field and sorted by using the German phonebook collation
myColl.aggregate(
  [
    { $group: { "_id": "$first_name", "nameCount": { "$sum": 1 } } },
    { $sort: { "_id": 1 } },
  ],
  { collation: { locale: "de@collation=phonebook" } },
);
