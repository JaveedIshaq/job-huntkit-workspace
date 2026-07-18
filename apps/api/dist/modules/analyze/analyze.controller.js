"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
const analyze_service_1 = require("./analyze.service");
let AnalyzeController = class AnalyzeController {
    analyze;
    constructor(analyze) {
        this.analyze = analyze;
    }
    analyzeJob(user, id) {
        return this.analyze.analyzeJob(user.id, id);
    }
};
exports.AnalyzeController = AnalyzeController;
__decorate([
    (0, common_1.Post)(':id/analyze'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AnalyzeController.prototype, "analyzeJob", null);
exports.AnalyzeController = AnalyzeController = __decorate([
    (0, common_1.Controller)('jobs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [analyze_service_1.AnalyzeService])
], AnalyzeController);
//# sourceMappingURL=analyze.controller.js.map