var approuter = require("@sap/approuter");
const jwtDecode = require("jwt-decode");

var ar = approuter();

ar.beforeRequestHandler.use("/", function (req, res, next) {
  if (!req.user) {
    res.statusCode = 403;
    res.end("Missing JWT Token");
  } else {
    res.statusCode = 200;
    let decodedJWTToken = jwtDecode(req.user.token.accessToken);
    res.end(
      JSON.stringify({
        userId: decodedJWTToken.user_name,
        email: decodedJWTToken.email,
        firstName: decodedJWTToken.given_name,
        lastName: decodedJWTToken.family_name,
      })
    );
  }
});

ar.start();
