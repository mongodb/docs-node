interface YourInterface {
  StringKeys: "any" | "values"
  YourType: "should model what's in your collection"
}

const database = client.db("<your database>");
const collection = database.collection<YourInterface>("<your collection>");
