class HomeCtrl {
  constructor(ConfigService) {
    'ngInject';

    this.appName = ConfigService.appName;
  }
}

export default HomeCtrl;
