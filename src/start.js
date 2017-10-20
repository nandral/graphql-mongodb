import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors'
import typeDefs from './schema'
import dbresolvers from './db'
const MONGO_URL = 'mongodb://localhost:27017/blog'
import { MongoClient } from 'mongodb'

const URL = 'http://localhost'
const PORT = process.env.PORT

export const start = async() => {
  try {
    const db = await MongoClient.connect(MONGO_URL)
    const resolvers = dbresolvers(db)
    console.log("--------------")
    console.log(resolvers)

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })

    const app = express()

    app.use(cors())

    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }))

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`)
    })

  }
  catch (e) {
    console.log(e)
  }

}
