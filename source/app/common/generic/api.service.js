class ApiService extends AngularClass {
    constructor(...dependecies) {
        super(dependecies, ApiService.$inject )
    }

    get(endpoint, params = null) {
        return this._makeHttpRequest(endpoint, null, 'GET', params);
    }

    post(endpoint, data) {
        return this._makeHttpRequest(endpoint, data, 'POST');
    }

    put(endpoint, data) {
        return this._makeHttpRequest(endpoint, data, 'PUT');
    }
    delete(endpoint, data) {
        return this._makeHttpRequest(endpoint, data, 'DELETE');
    }

    _makeHttpRequest(endpoint, data, method, params) {
        const headers = { 'Content-Type': 'application/json' };
        const defered = this.$q.defer();

        this._send(endpoint, data, method, params, headers) .then((value) => {
                defered.resolve(value);
            }).catch((err) => {
                defered.reject(err);
            })

        return defered.promise;
    }

    _send(endpoint, data, method, params, headers) {

        return this.$http({
            method,
            data,
            params,
            headers,
            skipAuthorization: false,
            url: `${this.ServiceBaseUrl}${endpoint}`,
        })
    }

}

ApiService.$inject = ['$http', 'ServiceBaseUrl', '$q'];

export default ApiService;
