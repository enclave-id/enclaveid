// import fp from 'fastify-plugin';
// import { FastifyInstance } from 'fastify';
// import { streamingUpload } from '../services/azureStorage';
// import multipartPlugin from '@fastify/multipart';

// export default fp(async function (fastify: FastifyInstance) {
//   fastify
//     .register(multipartPlugin, {
//       limits: {
//         fields: 0, // Max number of non-file fields
//         files: 1, // Max number of file fields
//         fileSize: 100 * 1024 * 1024, // 100 MB
//       },
//     })
//     .post('/upload', (request, reply) => {
//       request.file().then((data) => {
//         const { filename, file } = data;

//         streamingUpload(filename, file)
//           .then(() => {
//             reply.send({
//               message: `File ${filename} uploaded to Azure Blob Storage`,
//             });
//           })
//           .catch((error) => {
//             reply
//               .code(500)
//               .send({ error: `Error uploading file: ${error.message}` });
//           });
//       });
//     });
// });
