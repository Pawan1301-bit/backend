// // if  i use this extension -- this will play as a mongodb playground here

//crud operation 
use("CruDb")

// //create
db.createCollection("Courses");

// //insert
// db.Courses.insertOne({
//     name: "Sigma Web dev",
//     price: 0,
//     assigment: 12,
//     projects: 45
// })

// db.Courses.insertMany([
//     {
//         "name": "Alpha Code Studio",
//         price: 100,
//         "assignment": 8,
//         "projects": 30
//     },
//     {
//         "name": "Beta Design Hub",
//         price: 50,
//         "assignment": 15,
//         "projects": 25
//     },
//     {
//         "name": "Gamma Tech Solutions",
//         price: 200,
//         "assignment": 20,
//         "projects": 60
//     },
//     {
//         "name": "Delta Innovations",
//         price: 150,
//         "assignment": 10,
//         "projects": 40
//     }
// ])

//read
// let a = db.Courses.find({ price: 150 });
// console.log(a.count());
// console.log(a.toArray());

// let b = db.Courses.findOne({ price: 150 });
// console.log(b)

// update
db.Courses.updateOne({price: 0}, {$set:{price: 100}})
//set first price(with 0)  to 100


//delete 
// db.Courses.deleteOne({price: 100})

//to delelte all the courses with price less than 100

db.Courses.deleteMany({price : { $lt: 100 }});

/*Some Other Operators -- query opeators

Query Selectors
Comparison
For comparison of different BSON type values, see the specified BSON comparison order.

Name
Description
$eq

Matches values that are equal to a specified value.

$gt

Matches values that are greater than a specified value.

$gte

Matches values that are greater than or equal to a specified value.

$in

Matches any of the values specified in an array.

$lt

Matches values that are less than a specified value.

$lte

Matches values that are less than or equal to a specified value.

$ne

Matches all values that are not equal to a specified value.

$nin

Matches none of the values specified in an array.

Logical
Name
Description
$and

Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.

$not

Inverts the effect of a query predicate and returns documents that do not match the query predicate.

$nor

Joins query clauses with a logical NOR returns all documents that fail to match both clauses.

$or

Joins query clauses with a logical OR returns all documents that match the conditions of either clause.

Element
Name
Description
$exists

Matches documents that have the specified field.

$type

Selects documents if a field is of the specified type.

Evaluation
Name
Description
$expr

Allows use of aggregation expressions within the query language.

$jsonSchema

Validate documents against the given JSON Schema.

$mod

Performs a modulo operation on the value of a field and selects documents with a specified result.

$regex

Selects documents where values match a specified regular expression.

$text

Performs text search.

$text provides text query capabilities for self-managed (non-Atlas) deployments. For data hosted on MongoDB Atlas, MongoDB offers an improved full-text query solution, Atlas Search.

$where

Matches documents that satisfy a JavaScript expression.

Geospatial
Name
Description
$geoIntersects

Selects geometries that intersect with a GeoJSON geometry. The 2dsphere index supports $geoIntersects.

$geoWithin

Selects geometries within a bounding GeoJSON geometry. The 2dsphere and 2d indexes support $geoWithin.

$near

Returns geospatial objects in proximity to a point. Requires a geospatial index. The 2dsphere and 2d indexes support $near.

$nearSphere

Returns geospatial objects in proximity to a point on a sphere. Requires a geospatial index. The 2dsphere and 2d indexes support $nearSphere.

Array
Name
Description
$all

Matches arrays that contain all elements specified in the query.

$elemMatch

Selects documents if element in the array field matches all the specified $elemMatch conditions.

$size

Selects documents if the array field is a specified size.

Bitwise
Name
Description
$bitsAllClear

Matches numeric or binary values in which a set of bit positions all have a value of 0.

$bitsAllSet

Matches numeric or binary values in which a set of bit positions all have a value of 1.

$bitsAnyClear

Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.

$bitsAnySet

Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.

Projection Operators
Name
Description
$

Projects the first element in an array that matches the query condition.

$elemMatch

Projects the first element in an array that matches the specified $elemMatch condition.

$meta

Projects the document's score assigned during the $text operation.

$text provides text query capabilities for self-managed (non-Atlas) deployments. For data hosted on MongoDB Atlas, MongoDB offers an improved full-text query solution, Atlas Search.

$slice

Limits the number of elements projected from an array. Supports skip and limit slices.

Miscellaneous Operators
Name
Description
$rand

Generates a random float between 0 and 1.

$natural

A special hint that can be provided via the sort() or hint() methods that can be used to force either a forward or reverse collection scan.

*/