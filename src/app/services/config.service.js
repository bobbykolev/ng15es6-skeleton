export default class ConfigService {
	constructor($http, AppConstants){
		this._$http = $http;
		this.config = {};
	}

	getRestUrl () {
		return this.config.restUrl;
	}

	getConfig () {
		var that = this;

		return this._$http({
			method: 'GET',
			url: './config.json'
		}).then(
			(res) => {
				if(res.data){
					Object.assign(that.config, res.data);
				}

				return res;
			},
			(err) => {
				console.error(err);

				return err;
			}
		);
	}
}