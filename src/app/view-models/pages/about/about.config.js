function AboutConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.about', {
    url: '/about/:slug',
    controller: 'AboutCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'view-models/pages/about/about.html',
    title: 'Article'
  });

};

export default AboutConfig;
