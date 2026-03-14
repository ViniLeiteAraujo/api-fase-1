import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Room {
    id: ID!
    name: String!
    capacity: Int!
  }

  type Reservation {
    id: ID!
    date: String!
    startTime: String!
    endTime: String!
    user: User!
    room: Room!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    rooms: [Room!]!
    myReservations: [Reservation!]!
    me: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createRoom(name: String!, capacity: Int!): Room!
    createReservation(roomId: ID!, date: String!, startTime: String!, endTime: String!): Reservation!
    cancelReservation(reservationId: ID!): Boolean!
  }
`;
