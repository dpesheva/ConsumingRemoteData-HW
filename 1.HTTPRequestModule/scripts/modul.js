var httpRequest = (function () {
    var getHttpRequest, getJSON, makeRequest, postJSON;
    getHttpRequest = (function () {
        var xmlHttpFactories;
        xmlHttpFactories = [

          function () {
              return new XMLHttpRequest();
          },
          function () {
              return new ActiveXObject("Msxml3.XMLHTTP");
          },
          function () {
              return new ActiveXObject("Msxml2.XMLHTTP.6.0");
          },
          function () {
              return new ActiveXObject("Msxml2.XMLHTTP.3.0");
          },
          function () {
              return new ActiveXObject("Msxml2.XMLHTTP");
          },
          function () {
              return new ActiveXObject("Microsoft.XMLHTTP");
          }
        ];
        return function () {
            var xmlFactory, _i, _len;
            for (_i = 0, _len = xmlHttpFactories.length; _i < _len; _i++) {
                xmlFactory = xmlHttpFactories[_i];
                try {
                    return xmlFactory();
                } catch (_error) {

                }
            }
            return null;
        };
    })();

    makeRequest = function (options) {
        var httpRequest, requestUrl, type, success, error, contentType, accept, data;
        var d = $.Deferred();

        httpRequest = getHttpRequest();
        options = options || {};
        requestUrl = options.url;
        type = options.type || 'GET';
        success = options.success || function () { };
        error = options.error || function () { };
        contentType = options.contentType || '';
        accept = options.accept || '';
        data = options.data || null;

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                switch (Math.floor(httpRequest.status / 100)) {
                    case 2:
                        d.resolve(httpRequest.responseText);
                        break;
                    default:
                        d.reject(httpRequest.responseText);
                        break;
                }
            }
        };

        httpRequest.open(type, requestUrl, true);
        httpRequest.setRequestHeader('Content-Type', contentType);
        httpRequest.setRequestHeader('Accept', accept);
        httpRequest.send(data)

        return d.promise();
    };

    getJSON = function (url, headers) {
        var options = {
            url: url,
            type: 'GET',
            contentType: headers.contentType,
            accept: headers.accept
        }

        return makeRequest(options);
    };

    postJSON = function (url, data, headers) {
        var options = {
            url: url,
            type: 'POST',
            contentType: headers.contentType,
            accept: headers.accept,
            data: JSON.stringify(data)
        };


        return makeRequest(options);
    };

    return {
        getJSON: getJSON,
        postJSON: postJSON
    };
})();


// variant 2
//window.httpRequester = (function () {
//    function getJSON(requestUrl) {
//        var promise = new RSVP.Promise(function (resolve, reject) {
//            $.ajax({
//                url: requestUrl,
//                type: "GET",
//                dataType: "json",
//                success: function (data) {
//                    resolve(data);
//                },
//                error: function (err) {
//                    reject(err);
//                }
//            });
//        });
//        return promise;
//    }

//    function postJSON(requestUrl, data) {
//        var promise = new RSVP.Promise(function (resolve, reject) {
//            $.ajax({
//                url: requestUrl,
//                type: "POST",
//                contentType: "application/json",
//                data: JSON.stringify(data),
//                dataType: "json",
//                success: function (data) {
//                    resolve(data);
//                },
//                error: function (err) {
//                    reject(err);
//                }
//            });
//        });
//        return promise;
//    }

//    return {
//        getJSON: getJSON,
//        postJSON: postJSON
//    }

//}());