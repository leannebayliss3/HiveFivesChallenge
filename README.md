# HiveFivesChallenge
A simple API that allows employees to give their co-workers recognition and also allow managers to view the Hive-Fives 
that have been sent within their teams.

## Interacting with HiveFivesChallenge
The API is deployed on Heroku and exposes a UI (using `GraphiQL`) in order to interact with the service.

This Hive-Fives service is based on the premise that user's are already created within the database.
With this in mind, some users have already been populated within the User db collection.
More can be added however using the: `userCreateOne` mutation.

Creating a recognition requires not only a message, but the db IDs of the users who are sending/receiving the Hive Five.
Ideally, there would be a front end that would abstract this API requirement away from the user, 
and map the user's with their db ID. This however was beyond the scope of this task.

To add a new recognition, execute the `getAllUsers` mutation, 
and get the IDs of the two users who are sending the Hive Five. Use these IDs in the `recognitionCreateOne` mutation.

Any query or mutation variables can be added using the Query Variables area at the bottom-left of the page.

Documentation on the queries and mutations available, (including input and return types) can be accessed by clicking
the '< Docs' link at the top-right of the site 

Examples of data structure, query and mutation called can be found in the
[GraphiQL Queries, Mutations and Example Data](#graphiql-queries,-mutations-and-example-data)

## Technologies and Packages Used
This API is written entirely in TypeScript and uses `GraphQL`, `ExpressJS`, `express-graphql` to create the service. 
MongoDB Atlas is used for the database as removes the need to configure custom database hosting.

The npm packages `graphql-compose` and `graphql-compose-mongoose` have been used to generate the GraphQL schema.
These packages allow mongoose schemas and models to be used as a base for GraphQL, meaning basic MongoDB CRUD 
(Create, Read, Update, Delete) functions can be called upon for use in the GraphQL schema.

## Improvements and Next Steps
* Separate API for user management
* Implement SSL certificates and secret storage for database authentication
    * Current solution requires username and password access
* Create CI/CD pipeline to fully automate testing, building and deploying of the code
* Containerise API allowing the service to be deployed easily to any hosting service
* Change to Apollo Server from Express-GraphQL for production service:
  * Express-GraphQL was chosen for this task due to its easy setup

## GraphiQL Queries, Mutations and Example Data
In order to browse the HiveFivesChallenge API please use the sample queries below.
```
fragment user on User {
  _id
  firstName
  lastName
  createdAt
}

fragment recognition on Recognition {
  sender {
    ...user
  }
  recipient {
    ...user
  }
  message
  createdAt
}


# Example userRecord:
# "userRecord": {
#   "firstName": "Leanne",
#   "lastName": "Bayliss"
# }
mutation userCreateOne($userRecord: CreateOneUserInput!) {
  userCreateOne(record: $userRecord) {
    record {
      ...user
    }
  }
}

query getAllUsers {
  getAllUsers {
    ...user
  }
}

# Example recognitionRecord:
# "recognitionRecord": {
#   "senderId": "603567c42ea4280015e98a59",
#   "recipientId": "603555206bb0598fe3acbbc1",
#   "message": "Congratulations!"
# }
mutation recognitionCreateOne($record: CreateOneRecognitionInput!) {
  recognitionCreateOne(record: $record) {
    record {
      ...recognition
    }
  }
}

query getRecognitions($senderId: String) {
  getRecognitions(senderId: $senderId) {
    ...recognition
  }
}


```