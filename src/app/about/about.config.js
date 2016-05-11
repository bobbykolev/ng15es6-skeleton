function AboutConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.about', {
    url: '/about/:slug',
    controller: 'AboutCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'about/about.html',
    title: 'Article'
  });

};

export default AboutConfig;
