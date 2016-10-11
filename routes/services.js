var api = require('../lib/api');

module.exports.handle = function(req, res, next) {
  return api.fetchServices()
    .then(function(services) {
      var types = services
        .map(function(service) {
          return service.type.slice(0, 1).toUpperCase() + service.type.slice(1);
        })
        .reduce(function(uniq, type) {
          return uniq.indexOf(type) === -1 ? uniq.concat(type) : uniq;
        }, []);

      if (req.query.type) {
        return {
          services: services.filter(function(service) {
            return service.type === req.query.type;
          }),
          types: types
        }
      }

      return {
        services: services,
        types: types
      };
    })
    .then(function(data) {
      res.render('services', {
        services: data.services,
        types: data.types,
        selectedType: req.query.type
      });
    });
}
