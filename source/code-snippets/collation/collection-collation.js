// Create the "souvenirs" collection and specify the French Canadian collation
db.createCollection("souvenirs", {
  collation: { locale: "fr_CA" },
});