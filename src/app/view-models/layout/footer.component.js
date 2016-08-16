class AppFooterCtrl {
  constructor(ConfigService) {
    'ngInject';

    this.appName = ConfigService.appName;

    // Get today's date to generate the year
    this.date = new Date();
  }
}

let AppFooter = {
  controller: AppFooterCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'view-models/layout/footer.html'
};

export default AppFooter;
