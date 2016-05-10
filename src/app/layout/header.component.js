class AppHeaderCtrl {
  constructor(AppConstants, $state) {
    'ngInject';
    let vm = this;

    vm.appName = AppConstants.appName;
    vm.toggleMenu = function(e, id){
    	e && e.preventDefault();
    	let element = document.getElementById(id);
    	element.classList.toggle('collapse');
    };
    vm.menuItemClick = function (e, title) {
    	e && e.preventDefault();
    	$state.go(title);
    };
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  controllerAs: 'vm',
  templateUrl: 'layout/header.html'
};

export default AppHeader;
