const MongoClient = require('mongodb').MongoClient; //importing MongoClient object of the mongodb node driver
const assert = require('assert').strict; //importing the core module assert

const dbOperations = require('./operations');

const url = 'mongodb://localhost:27017/'; //connection string to connect with the local mongodb
const dbname = 'nucampsite'; //database name to which we would do data manipulations

//connecting to the mongodb server through mongoclient, by passing in a connection string and a callback function
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null); //verifying if there are any errors

    console.log('Connected to the server'); //else console.log message

    const db = client.db(dbname); // accessing the nucampsite database

    //dropping the collection campsites from nucampsite db
    db.dropCollection('campsites', (err, result) => {

        assert.strictEqual(err, null);

        console.log('Dropped Collection', result); //the dropcollection method returns a boolean value, console.log the result

        //inserting one document into the collection 
        dbOperations.insertDocument(db, { name: "Breadcrumb trail campground", description: "Test" }, 'campsites', result => {

            console.log('Insert Document', result.ops);//console.log the inserted document
            //finding the document
            dbOperations.findDocument(db, 'campsites', docs => {
                console.log("Found Documents", docs);
                //updating the document
                dbOperations.updateDocument(db, { name: "Breadcrumb trail campground" }, { description: "Updated the description" }, 'campsites', result => {
                    console.log("Updated document", result.result.nModified);
                    //removing the document
                    dbOperations.removeDocument(db, { name: "Breadcrumb trail campground" }, 'campsites', result => {
                        console.log('Deleted Document Count:', result.deletedCount);

                        client.close();//closing the connection
                    });
                });
            });

        });
    });
});