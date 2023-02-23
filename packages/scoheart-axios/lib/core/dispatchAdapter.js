import xhrAdapter from '../adapter/xhr.js'

function dispatchAdapter(config) {
    return xhrAdapter(config).then(function xhrAdapterResolved(response) {
        return response
    }, function xhrAdapterRejected(reason) {

    })
}

export default dispatchAdapter


