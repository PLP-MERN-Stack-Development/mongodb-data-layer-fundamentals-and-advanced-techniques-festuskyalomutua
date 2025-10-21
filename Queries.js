//Task 1: Task 1: MongoDB Setup
//Task 2: Basic CRUD Operations
db.books.find({ genre: "Fantasy" });
db.books.find({ published_year: { $gt: 1950 } });
db.books.find({ author: "George Orwell" });
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 15.99 } }
);
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
db.books.deleteOne({ title: "To Kill a Mockingbird" });
db.books.deleteOne({ title: "To Kill a Mockingbird" });
{
  acknowledged: true,
  deletedCount: 0
}
use libraryDB
db.books
switched to db libraryDB
db.books.find({
  in_stock: true,
  published_year: { $gt: 1960 }
});

//Task 3: Advanced Queries
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,            // hide the _id field
    title: 1,
    author: 1,
    price: 1
  }
);
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
).sort({ price: 1 });
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
).sort({ price: -1 });
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
)
.sort({ price: 1 })
.skip(0)
.limit(5);
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
)
.sort({ price: 1 })
.skip(5)
.limit(5);
libraryDB

//Task 4 MongoDB aggregation pipelines
db.books.aggregate([
  {
    $group: {
      _id: "$genre",               // group by genre
      averagePrice: { $avg: "$price" },
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 }    // optional: sort by avg price descending
  }
]);
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  }
]);
db.books.aggregate([
  {
    $project: {
      title: 1,
      decade: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }   // sorts decades chronologically
  }
]);

//Task 5: Indexing
db.books.find({ title: "The Great Gatsby" });
db.books.createIndex({ title: 1 });
title_1
db.books.getIndexes();
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { title: 1 }, name: 'title_1' }
]
db.books.find({ author: "George Orwell", published_year: 1949 });
db.books.getIndexes();
db.books.getIndexes();
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { title: 1 }, name: 'title_1' }
db.books.find({ title: "The Great Gatsby" }).explain("executionStats");
{
      docsExamined: 0,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 0,
        executionTimeMillisEstimate: 0,
        works: 1,
        advanced: 0,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: {
          title: 1
        },
        indexName: 'title_1',
        isMultiKey: false,
        multiKeyPaths: {
          title: []
        },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: {
          title: [
            '["The Great Gatsby", "The Great Gatsby"]'
          ]
        },
        keysExamined: 0,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  },
  queryShapeHash: '1B51659C7CDBC38E4393D4301DFE33CDE81B38F53EB854BFF375C160A6C4DE80',
  command: {
    find: 'books',
    filter: {
      title: 'The Great Gatsby'
    },
    '$db': 'libraryDB'
  },
  serverInfo: {
    host: 'DESKTOP-6702HTH',
    port: 27017,
    version: '8.2.1',
    gitVersion: '3312bdcf28aa65f5930005e21c2cb130f648b8c3'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}





