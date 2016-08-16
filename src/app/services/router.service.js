export default class RouteService {
    constructor($state) {
        'ngInject';

        this._$state = $state;
    }

    goTo (route, params) {
        if (params) {
            this._$state.go('app.' + route, params);
        } else {
            this._$state.go('app.' + route);
        }
    }

    back () {
    	window.history.back();
    }
}