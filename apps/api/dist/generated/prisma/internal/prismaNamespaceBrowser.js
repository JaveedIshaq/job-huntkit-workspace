"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullsOrder = exports.JsonNullValueFilter = exports.QueryMode = exports.JsonNullValueInput = exports.SortOrder = exports.UsersScalarFieldEnum = exports.Profile_sourcesScalarFieldEnum = exports.Profile_chunksScalarFieldEnum = exports.JobsScalarFieldEnum = exports.Job_analysesScalarFieldEnum = exports.Ai_runsScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    ai_runs: 'ai_runs',
    job_analyses: 'job_analyses',
    jobs: 'jobs',
    profile_chunks: 'profile_chunks',
    profile_sources: 'profile_sources',
    users: 'users'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.Ai_runsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    run_type: 'run_type',
    model: 'model',
    prompt_tokens: 'prompt_tokens',
    completion_tokens: 'completion_tokens',
    total_tokens: 'total_tokens',
    latency_ms: 'latency_ms',
    status: 'status',
    error_message: 'error_message',
    input_preview: 'input_preview',
    output_preview: 'output_preview',
    retrieved_chunk_ids: 'retrieved_chunk_ids',
    metadata: 'metadata',
    created_at: 'created_at'
};
exports.Job_analysesScalarFieldEnum = {
    id: 'id',
    job_id: 'job_id',
    user_id: 'user_id',
    ai_run_id: 'ai_run_id',
    requirement_summary: 'requirement_summary',
    strengths: 'strengths',
    gaps: 'gaps',
    application_bullets: 'application_bullets',
    interview_questions: 'interview_questions',
    citations: 'citations',
    overall_match_score: 'overall_match_score',
    created_at: 'created_at'
};
exports.JobsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    company: 'company',
    role_title: 'role_title',
    job_url: 'job_url',
    location: 'location',
    status: 'status',
    jd_text: 'jd_text',
    notes: 'notes',
    applied_at: 'applied_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Profile_chunksScalarFieldEnum = {
    id: 'id',
    profile_source_id: 'profile_source_id',
    user_id: 'user_id',
    chunk_index: 'chunk_index',
    content: 'content',
    token_count: 'token_count',
    metadata: 'metadata',
    created_at: 'created_at'
};
exports.Profile_sourcesScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    source_type: 'source_type',
    title: 'title',
    content: 'content',
    status: 'status',
    chunk_count: 'chunk_count',
    error_message: 'error_message',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.UsersScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password_hash: 'password_hash',
    display_name: 'display_name',
    headline: 'headline',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map