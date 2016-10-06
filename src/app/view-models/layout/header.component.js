class AppHeaderCtrl {
  constructor(ConfigService, $state, $rootScope) {
    'ngInject';

    this._$state = $state;
    this._$rootScope = $rootScope;
    this.appName = ConfigService.appName;
    this.menuId = 'main-menu';
    this.btnId = 'nav-ani-icon';
    this.menu = '';
    this.btn = '';
  }

  $postLink () {
    let height = window.innerHeight || 0,
        width = window.innerWidth || 0,
        element = document.querySelectorAll('#main-menu>ul')[0];

    //set doc height on toggle menu for small res
    height && width < 768 ? element.style.height = (height-1) + 'px' : null;

    this.menu = document.getElementById(this.menuId);
    this.btn = document.getElementById(this.btnId);
  }

  toggleMenu (e){
    e && e.preventDefault();

    this.toggleClasses(true);
  }

  menuItemClick (e, title) {
    e && e.preventDefault();
    if (title) {
      this._$state.go(title);
    }

    this.toggleClasses();
  }

  showModal (e) {
    e && e.preventDefault();
    this._$rootScope.show({title: 'wee', rows: ['a', 'b', 'd','a', 'b', 'd']}).then(function(){console.log('user choice', arguments)});
  }

  toggleClasses (toggle) {
    if (toggle) {
      this.menu.classList.toggle('collapse');
      this.btn.classList.toggle('open');
    } else {
      this.menu.classList.add('collapse');
      this.btn.classList.remove('open');
    }
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'view-models/layout/header.html'
};

export default AppHeader;
