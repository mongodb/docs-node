// start-no-error
interface TestType {
  field: {nested : number}; 
}
const database = client.db("<your db>");
const collection = database.collection<TestType>("<your collection>");
await collection.updateOne(
  {},
  {$set: { "field.nested" : "A String"}}
);
// end-no-error
// start-error
interface TestType {
  field: {nested : number}; 
}
const database = client.db("<your db>");
const collection = database.collection<TestType>("<your col>");
await collection.updateOne(
  {},
  {$set: { field : {nested : "A String"}}}
);
// end-error