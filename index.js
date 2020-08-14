const MongoClient = require('mongodb').MongoClient; //importing MongoClient object of the mongodb node driver

const dbOperations = require('./operations');

const url = 'mongodb://localhost:27017/'; //connection string to connect with the local mongodb
const dbname = 'nucampsite'; //database name to which we would do data manipulations

//connecting to the mongodb server through mongoclient, by passing in a connection string and handling the promise
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected to the server'); //else console.log message

    const db = client.db(dbname); // accessing the nucampsite database

    //dropping the collection campsites from nucampsite db
    db.dropCollection('campsites')
        .then(result => {

            console.log('Dropped Collection', result); //the dropcollection method returns a boolean value, console.log the result
        })
        .catch(err => console.log('No collection to drop.'));

    //inserting one document into the collection    
    dbOperations.insertDocument(db, { name: "Breadcrumb trail campground", description: "Test" }, 'campsites')
        .then(result => {

            console.log('Insert Document', result.ops);//console.log the inserted document
            //finding the document
            return dbOperations.findDocument(db, 'campsites');
        })
        .then(docs => {
            console.log("Found Documents", docs);
            //updating the document
            return dbOperations.updateDocument(db, { name: "Breadcrumb trail campground" }, { description: "Updated the description" }, 'campsites')
        })
        .then(result => {
            console.log("Updated document", result.result.nModified);

            return dbOperations.findDocument(db, 'campsites')
        })
        .then(docs => {
            console.log("Found Updated Documents", docs)

            //removing the document
            return dbOperations.removeDocument(db, { name: "Breadcrumb trail campground" }, 'campsites')
        })
        .then(result => {
            console.log('Deleted Document Count:', result.deletedCount);

            return client.close();//closing the connection
        }).catch(err => {
            console.log(err);
            client.close();
        })
})
    .catch(err => {
        console.log(err)
    })