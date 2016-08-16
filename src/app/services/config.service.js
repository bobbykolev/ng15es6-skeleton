export default class ConfigService {
	constructor(){
		'ngInject';

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