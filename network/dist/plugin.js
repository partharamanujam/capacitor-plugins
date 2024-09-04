var capacitorNetwork = (function (exports, core) {
    'use strict';

    const Network$1 = core.registerPlugin('Network', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.NetworkWeb()),
    });

    function translatedConnection() {
        const connection = window.navigator.connection ||
            window.navigator.mozConnection ||
            window.navigator.webkitConnection;
        let result = 'unknown';
        const type = connection ? connection.type || connection.effectiveType : null;
        if (type && typeof type === 'string') {
            switch (type) {
                // possible type values
                case 'bluetooth':
                case 'cellular':
                    result = 'cellular';
                    break;
                case 'none':
                    result = 'none';
                    break;
                case 'ethernet':
                case 'wifi':
                case 'wimax':
                    result = 'wifi';
                    break;
                case 'other':
                case 'unknown':
                    result = 'unknown';
                    break;
                // possible effectiveType values
                case 'slow-2g':
                case '2g':
                case '3g':
                    result = 'cellular';
                    break;
                case '4g':
                    result = 'wifi';
                    break;
            }
        }
        return result;
    }
    class NetworkWeb extends core.WebPlugin {
        constructor() {
            super();
            this.handleOnline = () => {
                const connectionType = translatedConnection();
                const status = {
                    connected: true,
                    connectionType: connectionType,
                };
                this.notifyListeners('networkStatusChange', status);
            };
            this.handleOffline = () => {
                const status = {
                    connected: false,
                    connectionType: 'none',
                };
                this.notifyListeners('networkStatusChange', status);
            };
            if (typeof window !== 'undefined') {
                window.addEventListener('online', this.handleOnline);
                window.addEventListener('offline', this.handleOffline);
            }
        }
        async getStatus() {
            if (!window.navigator) {
                throw this.unavailable('Browser does not support the Network Information API');
            }
            const connected = window.navigator.onLine;
            const connectionType = translatedConnection();
            const status = {
                connected,
                connectionType: connected ? connectionType : 'none',
            };
            return status;
        }
    }
    const Network = new NetworkWeb();

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        NetworkWeb: NetworkWeb,
        Network: Network
    });

    exports.Network = Network$1;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
