import Fastify from 'fastify'
const fastify = Fastify()

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 8094 }, console.log)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()