// this MW for testing GitHub Webhook :)
// Please Dont Delete Me :)
module.exports = (req, res, next) => {
  try {
    const payload = JSON.parse(req.body.payload);
    console.log(payload);
  } catch (error) {
    console.log("Error: " + error);
  } finally {
    next();
  }
};
