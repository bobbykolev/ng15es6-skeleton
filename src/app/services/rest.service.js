export default class RestService {
    constructor($http, $httpParamSerializer, ConfigService) {
        'ngInject';

        this._$http = $http;
        this._$httpParamSerializer = $httpParamSerializer;
        this._ConfigService = ConfigService;
    }

    get (options) {
        let defaultProps = {
                method: 'GET'
            },
            params = Object.assign({}, defaultProps, options);

        params.url = this._ConfigService.restUrl + params.url;

        return this._$http(params);
    }

    post (options) {
        let defaultProps = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },
            params = Object.assign({}, defaultProps, options);

        params.url = this._ConfigService.restUrl + params.url;

        return this._$http(params);
    }
}
