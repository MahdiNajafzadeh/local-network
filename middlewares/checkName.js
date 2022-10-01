module.exports = (req, res, next) => {
  try {
    console.log("1th middleware");
    const username = req.body.user.username;
    console.log(username);
  } catch {
  } finally {
    next();
  }
};