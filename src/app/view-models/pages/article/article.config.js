function ArticleConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.article', {
    url: '/article/:slug',
    controller: 'ArticleCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'view-models/pages/article/article.html',
    title: 'Article'
  });

};

export default ArticleConfig;
