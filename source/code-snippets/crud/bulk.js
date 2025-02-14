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

        const insert_result = await movies.bulkWrite(insertModels);
        console.log(`Inserted documents: ${insert_result.insertedCount}`);
        // end-insert-coll

        // begin-insert-client
        const clientInserts = [{
            namespace: 'sample_mflix.movies',
            name: 'insertOne',
            document: {
                title: "The Favourite",
                year: 2018,
                rated: "R",
                released: "2018-12-21"
            }
        }, {
            namespace: 'sample_mflix.movies',
            name: 'insertOne',
            document: {
                title: "I, Tonya",
                year: 2017,
                rated: "R",
                released: "2017-12-08"
            }
        }, {
            namespace: 'sample_mflix.users',
            name: 'insertOne',
            document: {
                name: "Brian Schwartz",
                email: "bschwartz@example.com"
            }
        }];

        const client_insert_res = await client.bulkWrite(clientInserts);
        console.log(`Inserted documents: ${client_insert_res.insertedCount}`);
        // end-insert-client

        await movies.insertMany(docs);

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

        const replace_result = await movies.bulkWrite(replaceOperations);
        console.log(`Modified documents: ${replace_result.modifiedCount}`);
        // end-replace-coll

        // begin-replace-client
        const clientReplacements = [{
            namespace: 'sample_mflix.movies',
            name: 'replaceOne',
            filter: {
                title: "The Dark Knight"
            },
            replacement: {
                title: "The Dark Knight Rises",
                year: 2012,
                rating: "PG-13"
            },
            upsert: false
        }, {
            namespace: 'sample_mflix.movies',
            name: 'replaceOne',
            filter: {
                title: "Inception"
            },
            replacement: {
                title: "Inception Reloaded",
                year: 2010,
                rating: "PG-13"
            },
            upsert: false
        }, {
            namespace: 'sample_mflix.users',
            name: 'replaceOne',
            filter: {
                name: "April Cole"
            },
            replacement: {
                name: "April Franklin",
                email: "aprilfrank@example.com"
            }
        }];

        const client_replace_res = await client.bulkWrite(clientReplacements);
        console.log(`Modified documents: ${client_replace_res.modifiedCount}`);
        // end-replace-client        

        // begin-update-coll
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
        console.log(`Modified documents: ${update_result.modifiedCount}`);
        // end-update-coll

        // begin-update-client
        const clientUpdates = [{
            namespace: 'sample_mflix.movies',
            name: 'updateMany',
            filter: {
                rated: "PG-13"
            },
            update: {
                $set: {
                    rated: "PG-13 Updated",
                    genre: "Updated Genre"
                }
            },
            upsert: false
        }, {
            namespace: 'sample_mflix.users',
            name: 'updateOne',
            filter: {
                name: "Jon Snow"
            },
            update: {
                $set: {
                    name: "Aegon Targaryen",
                    email: "targaryen@example.com"
                }
            },
            upsert: false
        }];
        const client_update_res = await client.bulkWrite(clientUpdates);
        console.log(`Modified documents: ${client_update_res.modifiedCount}`);
        // end-update-client     

        // begin-delete-coll
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
        console.log(`Deleted documents: ${delete_result.deletedCount}`);
        // end-delete-coll

        // begin-delete-client
        const clientDeletes = [{
            namespace: 'sample_mflix.movies',
            name: 'deleteMany',
            filter: {
                rated: "R"
            }
        }, {
            namespace: 'sample_mflix.users',
            name: 'deleteOne',
            filter: {
                email: "emilia_clarke@gameofthron.es"
            }
        }];

        const client_delete_res = await client.bulkWrite(clientDeletes);
        console.log(`Deleted documents: ${client_delete_res.deletedCount}`);
        // end-delete-client

        console.log("Operations completed successfully.");
    } finally {
        await client.close();
    }
})();