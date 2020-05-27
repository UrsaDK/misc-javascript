// Optimise indices for better performance
//
//  $ mongo [options] < add_custom_indices.js
//
// NOTE: it is safe to run this script multiple times, as indices
//       are only created if they don't already exist.

const validDbs = ['locomotive_dev_db', 'locomotive_test_db', 'locomotive_prod_db'];

const mongo = new Mongo();
mongo.getDBNames().filter( function(dbName) {
  return validDbs.indexOf(dbName) !== -1;
}).forEach(function(rdwebDb) {
  print('connecting to: ' + rdwebDb);
  if (db = mongo.getDB(rdwebDb)) {
    print('Updating indices:');

    print('  - locomotive_content_entries');
    db.locomotive_content_entries.createIndex({ _visible: 1 });
    db.locomotive_content_entries.createIndex({ published_date: 1 });
    db.locomotive_content_entries.createIndex({ date: 1 });
    db.locomotive_content_entries.createIndex({ content_type_id: 1, _visible: 1, _type: 1 });
    db.locomotive_content_entries.createIndex({ content_type_id: 1, _type: 1 });

  } else {
    print('Failed to connect to the database -- ' + rdwebDb);
  }
});
