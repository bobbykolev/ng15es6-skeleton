function ArticleConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.article', {
    url: '/article/:slug',
    controller: 'ArticleCtrl',
    controllerAs: 'vm',
    templateUrl: 'article/article.html',
    title: 'Article'
  });

};

export default ArticleConfig;
