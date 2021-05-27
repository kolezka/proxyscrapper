"use strict";
exports.__esModule = true;
exports.ProxyModel = exports.ProxySchema = void 0;
var mongoose_1 = require("mongoose");
exports.ProxySchema = new mongoose_1["default"].Schema({
    status: {
        type: mongoose_1["default"].Schema.Types.Boolean,
        required: true
    },
    proxy: {
        type: mongoose_1["default"].Schema.Types.String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
exports.ProxySchema.index({
    proxy: 1
});
exports.ProxyModel = mongoose_1["default"].model('Proxy', exports.ProxySchema);
