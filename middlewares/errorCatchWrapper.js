const errorCatchWrapper = frg => {
  return async (req, res, next) => {
    try {
      await frg(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
module.exports = errorCatchWrapper;
