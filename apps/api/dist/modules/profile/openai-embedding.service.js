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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiEmbeddingService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
const EMBEDDING_MODEL = 'text-embedding-3-small';
let OpenAiEmbeddingService = class OpenAiEmbeddingService {
    client;
    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey)
            throw new Error('OPENAI_API_KEY is not set');
        this.client = new openai_1.default({ apiKey });
    }
    async embedBatch(texts) {
        if (texts.length === 0)
            return [];
        try {
            const res = await this.client.embeddings.create({
                model: EMBEDDING_MODEL,
                input: texts,
            });
            return res.data.map((d) => d.embedding);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`Embedding failed: ${String(err)}`);
        }
    }
};
exports.OpenAiEmbeddingService = OpenAiEmbeddingService;
exports.OpenAiEmbeddingService = OpenAiEmbeddingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OpenAiEmbeddingService);
//# sourceMappingURL=openai-embedding.service.js.map