function AppRun(ConfigService, $rootScope) {
  'ngInject';

  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += ConfigService.appName;
  };
}

export default AppRun;
