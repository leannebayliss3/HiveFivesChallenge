# HiveFivesChallenge
A simple API that allows employees to give their co-workers recognition and also allow managers to view the Hive-Fives 
that have been sent within their teams.

## Technologies and Packages Used
This API is written entirely in TypeScript and uses `GraphQL`, `ExpressJS`, `express-graphql` to create the service. 
MongoDB Atlas is used for the database as removes the need to configure custom database hosting.

The npm packages `graphql-compose` and `graphql-compose-mongoose` have been used to generate the GraphQL schema.
These packages allow mongoose schemas and models to be used as a base for GraphQL, meaning basic MongoDB CRUD 
(Create, Read, Update, Delete) functions can be called upon for use in the GraphQL schema.

## Improvements and Next Steps
* Separate API for user management:
    * Current solution for adding new recognitions requires users to already be present in the database
* Implement SSL certificates and secret storage for database authentication
    * Current solution requires username and password access
* Create CI/CD pipeline to fully automate testing, building and deploying of the code
* Containerise API allowing the service to be deployed easily to any hosting service

## GraphiQL Queries
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