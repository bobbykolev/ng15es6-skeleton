class AppFooterCtrl {
  constructor(AppConstants) {
    'ngInject';
    let vm = this;

    vm.appName = AppConstants.appName;

    // Get today's date to generate the year
    vm.date = new Date();
  }
}

let AppFooter = {
  controller: AppFooterCtrl,
  controllerAs: 'vm',
  templateUrl: 'layout/footer.html'
};

export default AppFooter;
