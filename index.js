const MongoClient = require('mongodb').MongoClient; //importing MongoClient object of the mongodb node driver
const assert = require('assert').strict; //importing the core module assert

const url = 'mongodb://localhost:27017/'; //connection string to connect with the local mongodb
const dbname='nucampsite'; //database name to which we would do data manipulations

//connecting to the mongodb server through mongoclient, by passing in a connection string and a callback function
MongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{

    assert.strictEqual(err,null); //verifying if there are any errors

    console.log('Connected to the server'); //else console.log message

    const db = client.db(dbname); // accessing the nucampsite database

    //dropping the collection campsites from nucampsite db
    db.dropCollection('campsites',(err,result) => {

        assert.strictEqual(err,null);

        console.log('Dropped Collection',result); //the dropcollection method returns a boolean value, console.log the result

        const collection = db.collection('campsites') //creating a collection in nucampsite db

        //inserting one document into the collection 
        collection.insertOne({name:"Breadcrumb trail campground",description:"Test"},(err,result)=>{

            assert.strictEqual(err,null);

            console.log('Insert Document', result.ops);//console.log the inserted document

            //finding the documents in the nucampsite collection
            collection.find().toArray((err,docs)=>{

                assert.strictEqual(err,null);

                console.log("Final Documents:",docs); //console.log the documents in form of array of objects

                client.close(); //closing the connection inorder to prevent any memory leaks
            });
        });
    });
});