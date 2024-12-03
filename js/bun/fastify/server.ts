import Fastify from 'fastify'
import firstRoute from './our-first-route.ts';

const fastify = Fastify({ 
  logger: true 
});

// Declare a route
// fastify.get('/', async (request, reply) => {
//   return { hello: 'world' }
// })

/* 
* we used the register API, which is the core of the Fastify framework. 
* It is the only way to add routes, plugins, et cetera.
*/
fastify.register(firstRoute);

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 8094 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()