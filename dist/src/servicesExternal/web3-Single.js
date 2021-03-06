"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Web3 = require('web3');
// const Web3 = require('web3');
// declare var require: (moduleId: string) => any;
var ethABI = require('../lib/ethereumjs-abi-perso.js');
var Web3Single = /** @class */ (function () {
    function Web3Single(web3Provider, networkId) {
        this.blockTimestamp = {};
        this.web3 = new Web3(web3Provider || new Web3.providers.HttpProvider(config_1.default.ethereum.nodeUrlDefault[config_1.default.ethereum.default]));
        this.networkName = networkId ? Web3Single.getNetworkName(networkId) : config_1.default.ethereum.default;
    }
    Web3Single.init = function (web3Provider, networkId) {
        this._instance = new this(web3Provider, networkId);
    };
    Web3Single.getInstance = function () {
        return this._instance;
    };
    Web3Single.BN = function () {
        return Web3.utils.BN;
    };
    Web3Single.prototype.broadcastMethod = function (_method, _callbackTransactionHash, _callbackTransactionReceipt, _callbackTransactionConfirmation, _callbackTransactionError, _options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, accounts, e_1, forcedGas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = Object.assign({}, _options || {});
                        ;
                        options.numberOfConfirmation = undefined;
                        if (!!options.from) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 2:
                        accounts = _a.sent();
                        options.from = accounts[0];
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, _callbackTransactionError(e_1)];
                    case 4:
                        forcedGas = options.gas;
                        options.value = options.value ? options.value : 0;
                        options.gas = forcedGas ? forcedGas : 90000000;
                        options.gasPrice = options.gasPrice ? options.gasPrice : this.web3.utils.toWei(config_1.default.ethereum.gasPriceDefault, config_1.default.ethereum.gasPriceDefaultUnit);
                        _method.estimateGas(options, function (err, estimateGas) {
                            if (err)
                                return _callbackTransactionError(err);
                            options.gas = forcedGas ? forcedGas : Math.floor(estimateGas * 1.05);
                            _method.call(options, function (errCall, resultCall) {
                                if (errCall) {
                                    //let's try with more gas
                                    options.gas = forcedGas ? forcedGas : Math.floor(estimateGas * 2);
                                    _method.call(options, function (errCall, resultCall) {
                                        if (errCall)
                                            return _callbackTransactionError(errCall);
                                        _method.send(options)
                                            .on('transactionHash', _callbackTransactionHash)
                                            .on('receipt', _callbackTransactionReceipt)
                                            .on('confirmation', _callbackTransactionConfirmation)
                                            .on('error', _callbackTransactionError);
                                    });
                                }
                                _method.send(options)
                                    .on('transactionHash', _callbackTransactionHash)
                                    .on('receipt', _callbackTransactionReceipt)
                                    .on('confirmation', _callbackTransactionConfirmation)
                                    .on('error', _callbackTransactionError);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // public callMethod(_method:any) : Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         _method.call(function(err:Error,data:any) {
    //             if(err) return reject(err)
    //                resolve(data);
    //         })
    //     });
    // }
    Web3Single.prototype.getDefaultAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web3.eth.getAccounts(function (err, accs) {
                            if (err)
                                return reject(err);
                            if (accs.length === 0)
                                return reject(Error('No accounts found'));
                            return resolve(accs[0]);
                        });
                    })];
            });
        });
    };
    Web3Single.prototype.getDefaultAccountCallback = function (callback) {
        this.web3.eth.getAccounts(function (err, accs) {
            if (err)
                return callback(err, null);
            if (accs.length === 0)
                return callback(Error('No accounts found'), null);
            return callback(null, accs[0]);
        });
    };
    Web3Single.prototype.toSolidityBytes32 = function (type, value) {
        return this.web3.utils.bytesToHex(ethABI.toSolidityBytes32(type, value));
    };
    Web3Single.prototype.arrayToBytes32 = function (array, length) {
        array = array ? array : [];
        var ret = [];
        array.forEach(function (o) {
            ret.push(this.web3.utils.bytesToHex(ethABI.toSolidityBytes32('address', o)));
        }.bind(this));
        for (var i = array.length; i < length; i++) {
            ret.push(this.web3.utils.bytesToHex(ethABI.toSolidityBytes32('bytes32', 0)));
        }
        return ret;
    };
    Web3Single.prototype.isAddressNoChecksum = function (address) {
        if (!address)
            return false;
        return address && this.web3.utils.isAddress(address.toLowerCase());
    };
    Web3Single.prototype.areSameAddressesNoChecksum = function (address1, address2) {
        if (!address1 || !address2)
            return false;
        return address1 && address2 && address1.toLowerCase() == address2.toLowerCase();
    };
    Web3Single.prototype.isHexStrictBytes32 = function (hex) {
        return this.web3.utils.isHexStrict(hex) && hex.length == 66; // '0x' + 32 bytes * 2 characters = 66
    };
    Web3Single.prototype.decodeTransactionLog = function (abi, event, log) {
        var eventInput;
        var signature;
        abi.some(function (o) {
            if (o.name == event) {
                eventInput = o.inputs;
                signature = o.signature;
                return true;
            }
            return false;
        });
        if (log.topics[0] != signature) {
            return null;
        }
        return this.web3.eth.abi.decodeLog(eventInput, log.data, log.topics.slice(1));
    };
    Web3Single.prototype.decodeEvent = function (abi, eventName, event) {
        var eventInput;
        abi.some(function (o) {
            if (o.name == eventName) {
                eventInput = o.inputs;
                return true;
            }
            return false;
        });
        return this.web3.eth.abi.decodeLog(eventInput, event.raw.data, event.raw.topics.slice(1));
    };
    Web3Single.prototype.setUpOptions = function (_options) {
        if (!_options)
            _options = {};
        if (!_options.numberOfConfirmation)
            _options.numberOfConfirmation = 0;
        if (_options.gasPrice)
            _options.gasPrice = new Web3.utils.BN(_options.gasPrice);
        if (_options.gas)
            _options.gas = new Web3.utils.BN(_options.gas);
        return _options;
    };
    Web3Single.getNetworkName = function (networkId) {
        switch (networkId) {
            case 1: return 'main';
            case 2: return 'morden';
            case 3: return 'ropsten';
            case 4: return 'rinkeby';
            case 42: return 'kovan';
            default: return 'private';
        }
    };
    Web3Single.prototype.getTransactionReceipt = function (_hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.web3.eth.getTransactionReceipt(_hash)];
            });
        });
    };
    Web3Single.prototype.getTransaction = function (_hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.web3.eth.getTransaction(_hash)];
            });
        });
    };
    Web3Single.prototype.getBlockTimestamp = function (_blockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var block, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    if (!!this.blockTimestamp[_blockNumber]) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.web3.eth.getBlock(_blockNumber)];
                                case 1:
                                    block = _a.sent();
                                    if (!block)
                                        throw Error('block \'' + _blockNumber + '\' not found');
                                    this.blockTimestamp[_blockNumber] = block.timestamp;
                                    _a.label = 2;
                                case 2: return [2 /*return*/, resolve(this.blockTimestamp[_blockNumber])];
                                case 3:
                                    e_2 = _a.sent();
                                    console.warn(e_2);
                                    return [2 /*return*/, resolve(null)];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return Web3Single;
}());
exports.Web3Single = Web3Single;
//# sourceMappingURL=web3-single.js.map