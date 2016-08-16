export default class ConfigService {
	constructor($http){
		'ngInject';
		
		this._$http = $http;
		this.config = window.config;
	}

	get restUrl () {
		return this.config.restUrl;
	}

	get appUrl () {
		return this.config.appUrl;
	}

	get appName () {
		return this.config.appName;
	}
}