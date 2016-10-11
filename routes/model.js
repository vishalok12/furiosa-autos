var api = require('../lib/api');

function parseModels(models, order) {
  order = typeof order !== 'undefined' ? order.toLowerCase() : 'asc';

  switch(order) {
    case 'asc':
      return models.sort();
    case 'desc':
      return models.sort().reverse();
    default:
      return models;
  }
}

module.exports.handle = function(req, res, next) {
  api.fetchModels()
    .then(function(models) {
      if (req.query.order) {
        return parseModels(models, req.query.order);
      }

      return models;
    })
    .then(function(models) {
      return res.render('models', {
        models: models,
        sortOrder: req.query.order
      });
    }, function(error) {
      return next(error);
    }).catch(function(e) {
      return next(e);
    });
}
