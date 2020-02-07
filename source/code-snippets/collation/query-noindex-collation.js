function findDocuments(db, callback) {
  const collection = db.collection( 'contacts' );
  collection.find({ 'city' : 'New York' }, { '_id' : 0 }, { 'collation' : { 'locale' : 'en_US' , 'strength' : 2 }}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
  });
}