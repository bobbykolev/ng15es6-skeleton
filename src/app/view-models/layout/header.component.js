class AppHeaderCtrl {
  constructor(ConfigService, $state, $rootScope) {
    'ngInject';

    this._$state = $state;
    this._$rootScope = $rootScope;
    this.appName = ConfigService.appName;
  }

  toggleMenu (e, id){
    e && e.preventDefault();
    let element = document.getElementById(id);
    element.classList.toggle('collapse');
  }

  menuItemClick (e, title) {
    e && e.preventDefault();
    this._$state.go(title);
  }

  showModal (e) {
    e && e.preventDefault();
    this._$rootScope.show({title: 'wee', rows: ['a', 'b', 'd','a', 'b', 'd']}).then(function(){console.log('user choice', arguments)});
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'view-models/layout/header.html'
};

export default AppHeader;
