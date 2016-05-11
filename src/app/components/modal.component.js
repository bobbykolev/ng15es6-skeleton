class ModalCtrl {
  constructor(AppConstants, $rootScope, $q) {
    'ngInject';

    this._$rootScope = $rootScope;
    this._$q = $q;
    this.visible = false;
    this.options = {
        
    };

    this.defaults = {
        title: 'Warrning',
        rows: ['<div>body</div>'],
        isConfirm: true
    };

    this._$rootScope.show = this.show.bind(this);
  }

  show (options){
    this.deferred = this._$q.defer();

    Object.assign(this.options, this.defaults, options);
    this.visible = true;

    return this.deferred.promise;
  }

  cancel (e, isDim){
    e && e.preventDefault();
    if (!isDim || (isDim && e.target.classList.value.match(/dim/g))) {
      this.visible = false;
      this.deferred.resolve(false);
    }
  }

  ok (e){
    e && e.preventDefault();
    this.visible = false;
    this.deferred.resolve(true);
  }
}

let Modal = {
  controller: ModalCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'components/modal.component.html'
};

export default Modal;
