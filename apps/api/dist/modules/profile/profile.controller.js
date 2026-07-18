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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
const profile_ingest_service_1 = require("./profile-ingest.service");
const profile_retrieval_service_1 = require("./profile-retrieval.service");
const create_source_dto_1 = require("./dto/create-source.dto");
let ProfileController = class ProfileController {
    ingest;
    retrieval;
    constructor(ingest, retrieval) {
        this.ingest = ingest;
        this.retrieval = retrieval;
    }
    create(user, dto) {
        return this.ingest.createSource(user.id, dto);
    }
    list(user) {
        return this.ingest.listSources(user.id);
    }
    getOne(user, id) {
        return this.ingest.getSource(user.id, id);
    }
    remove(user, id) {
        return this.ingest.deleteSource(user.id, id);
    }
    reindex(user, id) {
        return this.ingest.reindex(user.id, id);
    }
    search(user, q) {
        return this.retrieval.search(user.id, q);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Post)('sources'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_source_dto_1.CreateSourceDto]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('sources'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('sources/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getOne", null);
__decorate([
    (0, common_1.Delete)('sources/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('sources/:id/reindex'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "reindex", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "search", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [profile_ingest_service_1.ProfileIngestService,
        profile_retrieval_service_1.ProfileRetrievalService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map