"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = require("./config/api");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use(express_1.default.json());
const createResourceRoutes = (resource) => {
    const basePath = `/api/${resource}`;
    app.get(basePath, (_req, res) => {
        res.json({
            resource,
            count: 0,
            message: `${resource} endpoint ready`,
            apiBaseUrl: api_1.apiBaseUrl,
        });
    });
    app.get(`${basePath}/:id`, (req, res) => {
        res.json({
            resource,
            id: req.params.id,
            message: `${resource} item retrieved`,
            apiBaseUrl: api_1.apiBaseUrl,
        });
    });
    app.post(basePath, (req, res) => {
        res.status(201).json({
            resource,
            data: req.body,
            message: `${resource} created`,
            apiBaseUrl: api_1.apiBaseUrl,
        });
    });
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: api_1.apiBaseUrl });
});
createResourceRoutes('users');
createResourceRoutes('teams');
createResourceRoutes('activities');
createResourceRoutes('leaderboard');
createResourceRoutes('workouts');
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${api_1.apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map