"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = void 0;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
//# sourceMappingURL=api.js.map