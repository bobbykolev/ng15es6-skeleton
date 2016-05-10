class HomeCtrl {
  constructor(AppConstants) {
    'ngInject';

    let vm = this;

    vm.appName = AppConstants.appName;
  }
}

export default HomeCtrl;
