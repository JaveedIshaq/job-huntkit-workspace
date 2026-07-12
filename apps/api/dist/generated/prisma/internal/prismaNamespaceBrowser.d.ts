import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly ai_runs: "ai_runs";
    readonly job_analyses: "job_analyses";
    readonly jobs: "jobs";
    readonly profile_chunks: "profile_chunks";
    readonly profile_sources: "profile_sources";
    readonly users: "users";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const Ai_runsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly run_type: "run_type";
    readonly model: "model";
    readonly prompt_tokens: "prompt_tokens";
    readonly completion_tokens: "completion_tokens";
    readonly total_tokens: "total_tokens";
    readonly latency_ms: "latency_ms";
    readonly status: "status";
    readonly error_message: "error_message";
    readonly input_preview: "input_preview";
    readonly output_preview: "output_preview";
    readonly retrieved_chunk_ids: "retrieved_chunk_ids";
    readonly metadata: "metadata";
    readonly created_at: "created_at";
};
export type Ai_runsScalarFieldEnum = (typeof Ai_runsScalarFieldEnum)[keyof typeof Ai_runsScalarFieldEnum];
export declare const Job_analysesScalarFieldEnum: {
    readonly id: "id";
    readonly job_id: "job_id";
    readonly user_id: "user_id";
    readonly ai_run_id: "ai_run_id";
    readonly requirement_summary: "requirement_summary";
    readonly strengths: "strengths";
    readonly gaps: "gaps";
    readonly application_bullets: "application_bullets";
    readonly interview_questions: "interview_questions";
    readonly citations: "citations";
    readonly overall_match_score: "overall_match_score";
    readonly created_at: "created_at";
};
export type Job_analysesScalarFieldEnum = (typeof Job_analysesScalarFieldEnum)[keyof typeof Job_analysesScalarFieldEnum];
export declare const JobsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly company: "company";
    readonly role_title: "role_title";
    readonly job_url: "job_url";
    readonly location: "location";
    readonly status: "status";
    readonly jd_text: "jd_text";
    readonly notes: "notes";
    readonly applied_at: "applied_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type JobsScalarFieldEnum = (typeof JobsScalarFieldEnum)[keyof typeof JobsScalarFieldEnum];
export declare const Profile_chunksScalarFieldEnum: {
    readonly id: "id";
    readonly profile_source_id: "profile_source_id";
    readonly user_id: "user_id";
    readonly chunk_index: "chunk_index";
    readonly content: "content";
    readonly token_count: "token_count";
    readonly metadata: "metadata";
    readonly created_at: "created_at";
};
export type Profile_chunksScalarFieldEnum = (typeof Profile_chunksScalarFieldEnum)[keyof typeof Profile_chunksScalarFieldEnum];
export declare const Profile_sourcesScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly source_type: "source_type";
    readonly title: "title";
    readonly content: "content";
    readonly status: "status";
    readonly chunk_count: "chunk_count";
    readonly error_message: "error_message";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Profile_sourcesScalarFieldEnum = (typeof Profile_sourcesScalarFieldEnum)[keyof typeof Profile_sourcesScalarFieldEnum];
export declare const UsersScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password_hash: "password_hash";
    readonly display_name: "display_name";
    readonly headline: "headline";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client/runtime/client").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
    readonly AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
