var api = require('../lib/api');

function searchReviews(reviews, searchText) {
  var searchRegExp = new RegExp(searchText, 'i');

  return reviews.filter(function(review) {
    return review.content.search(searchRegExp) !== -1 ||
      review.source.search(searchRegExp) !== -1;
  });
}

module.exports.handle = function(req, res, next) {
  return Promise.all([api.fetchCustomerReviews(), api.fetchCorporateReviews()])
    .then(function(reviews) {
      var combinedReviews = reviews[0].concat(reviews[1]);
      if (req.query.search) {
        return searchReviews(combinedReviews, req.query.search);
      }

      return combinedReviews;
    })
    .then(function(reviews) {
      res.render('reviews', {reviews: reviews});
    });
};
