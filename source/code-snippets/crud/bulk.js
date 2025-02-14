const {
    MongoClient,
    ObjectId
} = require('mongodb');

const uri = '<connection string>'; // Add your MongoDB connection string here

(async () => {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();

        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        // begin-insert-coll
        const insertModels = [{
            insertOne: {
                document: {
                    title: "The Favourite",
                    year: 2018,
                    rated: "R",
                    released: "2018-12-21"
                }
            }
        }, {
            insertOne: {
                document: {
                    title: "I, Tonya",
                    year: 2017,
                    rated: "R",
                    released: "2017-12-08"
                }
            }
        }];

        await movies.bulkWrite(insertModels);
        // end-insert-coll

        // begin-insert-client
        const clientInserts = [
            {
              name: 'insertOne',
              namespace: 'sample_mflix.movies',
              document: {
                title: "The Favourite",
                year: 2018,
                rated: "R",
                released: "2018-12-21"
              }
            },
            {
              name: 'insertOne',
              namespace: 'sample_mflix.movies',
              document: {
                title: "I, Tonya",
                year: 2017,
                rated: "R",
                released: "2017-12-08"
              }
            },
            {
                name: 'insertOne',
                namespace: 'sample_mflix.users',
                document: {
                    name: "Brian Schwartz",
                    email: "bschwartz@example.com"
                }
        }];
        await client.bulkWrite(clientInserts);
        // end-insert-client

        await movies.insertMany(docs);

        // Inserting additional movies
        const additionalMovies = [{
            title: "Dunkirk",
            year: 2017,
            rated: "PG-13",
            released: "2017-07-21"
        }, {
            title: "Memento",
            year: 2000,
            rated: "R",
            released: "2000-09-05"
        }];
        await movies.insertMany(additionalMovies);


        // begin-replace-coll
        const replaceOperations = [{
            replaceOne: {
                filter: {
                    title: "The Dark Knight"
                },
                replacement: {
                    title: "The Dark Knight Rises",
                    year: 2012,
                    rating: "PG-13"
                },
                upsert: false
            }
        }, {
            replaceOne: {
                filter: {
                    title: "Inception"
                },
                replacement: {
                    title: "Inception Reloaded",
                    year: 2010,
                    rating: "PG-13"
                },
                upsert: false
            }
        }];

        await movies.bulkWrite(replaceOperations);
        // end-replace-coll

        // begin-replace-client
        const clientReplacements = [
            {
                name: 'replaceOne',
                namespace: 'sample_mflix.movies',
                filter: {
                  title: "The Dark Knight"
                },
                replacement: {
                  title: "The Dark Knight Rises",
                  year: 2012,
                  rating: "PG-13"
                },
                upsert: false
              },
            {
                name: 'replaceOne',
                namespace: 'sample_mflix.movies',
                filter: {
                  title: "Inception"
                },
                replacement: {
                  title: "Inception Reloaded",
                  year: 2010,
                  rating: "PG-13"
                },
                upsert: false
              },
            {
                name: 'replaceOne',
                namespace: 'sample_mflix.users',
                filter: {
                    name: "April Cole"
                  },
                  replacement: {
                    name: "April Franklin",
                    email: "aprilfrank@example.com"
                  }
        }];
        await client.bulkWrite(clientReplacements);
        // end-replace-client        

        // begin-update
        const updateOperations = [{
            updateOne: {
                filter: {
                    title: "Interstellar"
                },
                update: {
                    $set: {
                        title: "Interstellar Updated",
                        genre: "Sci-Fi Adventure"
                    }
                },
                upsert: true
            }
        }, {
            updateMany: {
                filter: {
                    rated: "PG-13"
                },
                update: {
                    $set: {
                        rated: "PG-13 Updated",
                        genre: "Updated Genre"
                    }
                }
            }
        }];

        const update_result = await movies.bulkWrite(updateOperations);

        console.log(`Matched documents: ${result3.matchedCount}`);
        console.log(`Modified documents: ${result3.modifiedCount}`);
        // end-update


        // begin-delete
        const deleteOperations = [{
            deleteOne: {
                filter: {
                    title: "Dunkirk"
                }
            }
        }, {
            deleteMany: {
                filter: {
                    rated: "R"
                }
            }
        }];


        const delete_result = await movies.bulkWrite(deleteOperations);

        console.log(`Deleted documents: ${result4.deletedCount}`);
        // end-delete


        console.log("Operations completed successfully.");
    } finally {
        await client.close();
    }
})();