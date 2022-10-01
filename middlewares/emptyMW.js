module.exports = (req, res, next) => {
  try {
    console.log("EMW is Complete");
  } catch {
  } finally {
    next();
  }
};