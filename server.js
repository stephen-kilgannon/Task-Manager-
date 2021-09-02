// Serves a Swagger UI with API definitions either created on the fly
// or loaded from file system.
//
// Needs @sap/cds-dk >= 3.3.0 installed

const { resolve } = require("path");
const { promisify } = require("util");
const readFile = promisify(require("fs").readFile);
const swaggerUi = require("swagger-ui-express");
const cds = require("@sap/cds");
const cors = require("cors");
//var log = require("cf-nodejs-logging-support");

const debug = cds.debug("openapi");
let app,
  docCache = {};

cds
  .on("bootstrap", (_app) => {
    app = _app;
    app.use(cors()); // allow to be called from e.g. editor.swagger.io
  })
  .on("serving", (service) => {
    const apiPath = "/api-docs";
    console.log(`[Open API] - serving ${service.name} at ${apiPath}`);
    app.use(
      apiPath,
      async (req, _, next) => {
        req.swaggerDoc = await toOpenApiDoc(service, docCache);
        next();
      },
      swaggerUi.serve,
      swaggerUi.setup()
    );
  });

async function toOpenApiDoc(service, cache) {
  if (!cache[service.name]) {
    const spec = await openApiFromFile(service);
    if (spec) {
      // pre-compiled spec file available?
      cache[service.name] = spec;
    }
    // On-the-fly exporter available?  Needs @sap/cds-dk >= 3.3.0
    else if (cds.compile.to.openapi) {
      debug && debug("Compiling Open API spec for", service.name);
      cache[service.name] = cds.compile.to.openapi(service.model, {
        service: service.name,
        "openapi:url": service.path,
        "openapi:diagram": true,
      });
    }
  }
  return cache[service.name];
}

async function openApiFromFile(service) {
  const fileName = resolve(`srv/${service.name}.openapi3.json`);
  const file = await readFile(fileName).catch(() => {
    /*no such file*/
  });
  if (file) {
    debug && debug("Using Open API spec from file", fileName);
    return JSON.parse(file);
  }
}

module.exports = cds.server;
