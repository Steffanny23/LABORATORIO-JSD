function isRequestAjaxOrApi(req) {
	//si el request no acepta html o  un request tipo xhr(X-Requested-With/XMLHttpRequest)
	return !req.accepts('html') || req.xhr;
}

module.exports = isRequestAjaxOrApi;
