

//removing the callbacks from the methods inorder to use the promises
exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    //returning the promise
    return coll.insertOne(document);
}

exports.findDocument = (db, collection) => {
    const coll = db.collection(collection);
    return coll.find().toArray();
}

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
}

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update });
}