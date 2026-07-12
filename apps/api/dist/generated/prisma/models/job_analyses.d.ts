import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type job_analysesModel = runtime.Types.Result.DefaultSelection<Prisma.$job_analysesPayload>;
export type AggregateJob_analyses = {
    _count: Job_analysesCountAggregateOutputType | null;
    _avg: Job_analysesAvgAggregateOutputType | null;
    _sum: Job_analysesSumAggregateOutputType | null;
    _min: Job_analysesMinAggregateOutputType | null;
    _max: Job_analysesMaxAggregateOutputType | null;
};
export type Job_analysesAvgAggregateOutputType = {
    overall_match_score: number | null;
};
export type Job_analysesSumAggregateOutputType = {
    overall_match_score: number | null;
};
export type Job_analysesMinAggregateOutputType = {
    id: string | null;
    job_id: string | null;
    user_id: string | null;
    ai_run_id: string | null;
    requirement_summary: string | null;
    overall_match_score: number | null;
    created_at: Date | null;
};
export type Job_analysesMaxAggregateOutputType = {
    id: string | null;
    job_id: string | null;
    user_id: string | null;
    ai_run_id: string | null;
    requirement_summary: string | null;
    overall_match_score: number | null;
    created_at: Date | null;
};
export type Job_analysesCountAggregateOutputType = {
    id: number;
    job_id: number;
    user_id: number;
    ai_run_id: number;
    requirement_summary: number;
    strengths: number;
    gaps: number;
    application_bullets: number;
    interview_questions: number;
    citations: number;
    overall_match_score: number;
    created_at: number;
    _all: number;
};
export type Job_analysesAvgAggregateInputType = {
    overall_match_score?: true;
};
export type Job_analysesSumAggregateInputType = {
    overall_match_score?: true;
};
export type Job_analysesMinAggregateInputType = {
    id?: true;
    job_id?: true;
    user_id?: true;
    ai_run_id?: true;
    requirement_summary?: true;
    overall_match_score?: true;
    created_at?: true;
};
export type Job_analysesMaxAggregateInputType = {
    id?: true;
    job_id?: true;
    user_id?: true;
    ai_run_id?: true;
    requirement_summary?: true;
    overall_match_score?: true;
    created_at?: true;
};
export type Job_analysesCountAggregateInputType = {
    id?: true;
    job_id?: true;
    user_id?: true;
    ai_run_id?: true;
    requirement_summary?: true;
    strengths?: true;
    gaps?: true;
    application_bullets?: true;
    interview_questions?: true;
    citations?: true;
    overall_match_score?: true;
    created_at?: true;
    _all?: true;
};
export type Job_analysesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_analysesWhereInput;
    orderBy?: Prisma.job_analysesOrderByWithRelationInput | Prisma.job_analysesOrderByWithRelationInput[];
    cursor?: Prisma.job_analysesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Job_analysesCountAggregateInputType;
    _avg?: Job_analysesAvgAggregateInputType;
    _sum?: Job_analysesSumAggregateInputType;
    _min?: Job_analysesMinAggregateInputType;
    _max?: Job_analysesMaxAggregateInputType;
};
export type GetJob_analysesAggregateType<T extends Job_analysesAggregateArgs> = {
    [P in keyof T & keyof AggregateJob_analyses]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJob_analyses[P]> : Prisma.GetScalarType<T[P], AggregateJob_analyses[P]>;
};
export type job_analysesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_analysesWhereInput;
    orderBy?: Prisma.job_analysesOrderByWithAggregationInput | Prisma.job_analysesOrderByWithAggregationInput[];
    by: Prisma.Job_analysesScalarFieldEnum[] | Prisma.Job_analysesScalarFieldEnum;
    having?: Prisma.job_analysesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Job_analysesCountAggregateInputType | true;
    _avg?: Job_analysesAvgAggregateInputType;
    _sum?: Job_analysesSumAggregateInputType;
    _min?: Job_analysesMinAggregateInputType;
    _max?: Job_analysesMaxAggregateInputType;
};
export type Job_analysesGroupByOutputType = {
    id: string;
    job_id: string;
    user_id: string;
    ai_run_id: string | null;
    requirement_summary: string | null;
    strengths: runtime.JsonValue;
    gaps: runtime.JsonValue;
    application_bullets: runtime.JsonValue;
    interview_questions: runtime.JsonValue;
    citations: runtime.JsonValue;
    overall_match_score: number | null;
    created_at: Date;
    _count: Job_analysesCountAggregateOutputType | null;
    _avg: Job_analysesAvgAggregateOutputType | null;
    _sum: Job_analysesSumAggregateOutputType | null;
    _min: Job_analysesMinAggregateOutputType | null;
    _max: Job_analysesMaxAggregateOutputType | null;
};
export type GetJob_analysesGroupByPayload<T extends job_analysesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Job_analysesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Job_analysesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Job_analysesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Job_analysesGroupByOutputType[P]>;
}>>;
export type job_analysesWhereInput = {
    AND?: Prisma.job_analysesWhereInput | Prisma.job_analysesWhereInput[];
    OR?: Prisma.job_analysesWhereInput[];
    NOT?: Prisma.job_analysesWhereInput | Prisma.job_analysesWhereInput[];
    id?: Prisma.UuidFilter<"job_analyses"> | string;
    job_id?: Prisma.UuidFilter<"job_analyses"> | string;
    user_id?: Prisma.UuidFilter<"job_analyses"> | string;
    ai_run_id?: Prisma.UuidNullableFilter<"job_analyses"> | string | null;
    requirement_summary?: Prisma.StringNullableFilter<"job_analyses"> | string | null;
    strengths?: Prisma.JsonFilter<"job_analyses">;
    gaps?: Prisma.JsonFilter<"job_analyses">;
    application_bullets?: Prisma.JsonFilter<"job_analyses">;
    interview_questions?: Prisma.JsonFilter<"job_analyses">;
    citations?: Prisma.JsonFilter<"job_analyses">;
    overall_match_score?: Prisma.IntNullableFilter<"job_analyses"> | number | null;
    created_at?: Prisma.DateTimeFilter<"job_analyses"> | Date | string;
    ai_runs?: Prisma.XOR<Prisma.Ai_runsNullableScalarRelationFilter, Prisma.ai_runsWhereInput> | null;
    jobs?: Prisma.XOR<Prisma.JobsScalarRelationFilter, Prisma.jobsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type job_analysesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    job_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    ai_run_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    requirement_summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    strengths?: Prisma.SortOrder;
    gaps?: Prisma.SortOrder;
    application_bullets?: Prisma.SortOrder;
    interview_questions?: Prisma.SortOrder;
    citations?: Prisma.SortOrder;
    overall_match_score?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    ai_runs?: Prisma.ai_runsOrderByWithRelationInput;
    jobs?: Prisma.jobsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type job_analysesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.job_analysesWhereInput | Prisma.job_analysesWhereInput[];
    OR?: Prisma.job_analysesWhereInput[];
    NOT?: Prisma.job_analysesWhereInput | Prisma.job_analysesWhereInput[];
    job_id?: Prisma.UuidFilter<"job_analyses"> | string;
    user_id?: Prisma.UuidFilter<"job_analyses"> | string;
    ai_run_id?: Prisma.UuidNullableFilter<"job_analyses"> | string | null;
    requirement_summary?: Prisma.StringNullableFilter<"job_analyses"> | string | null;
    strengths?: Prisma.JsonFilter<"job_analyses">;
    gaps?: Prisma.JsonFilter<"job_analyses">;
    application_bullets?: Prisma.JsonFilter<"job_analyses">;
    interview_questions?: Prisma.JsonFilter<"job_analyses">;
    citations?: Prisma.JsonFilter<"job_analyses">;
    overall_match_score?: Prisma.IntNullableFilter<"job_analyses"> | number | null;
    created_at?: Prisma.DateTimeFilter<"job_analyses"> | Date | string;
    ai_runs?: Prisma.XOR<Prisma.Ai_runsNullableScalarRelationFilter, Prisma.ai_runsWhereInput> | null;
    jobs?: Prisma.XOR<Prisma.JobsScalarRelationFilter, Prisma.jobsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type job_analysesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    job_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    ai_run_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    requirement_summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    strengths?: Prisma.SortOrder;
    gaps?: Prisma.SortOrder;
    application_bullets?: Prisma.SortOrder;
    interview_questions?: Prisma.SortOrder;
    citations?: Prisma.SortOrder;
    overall_match_score?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.job_analysesCountOrderByAggregateInput;
    _avg?: Prisma.job_analysesAvgOrderByAggregateInput;
    _max?: Prisma.job_analysesMaxOrderByAggregateInput;
    _min?: Prisma.job_analysesMinOrderByAggregateInput;
    _sum?: Prisma.job_analysesSumOrderByAggregateInput;
};
export type job_analysesScalarWhereWithAggregatesInput = {
    AND?: Prisma.job_analysesScalarWhereWithAggregatesInput | Prisma.job_analysesScalarWhereWithAggregatesInput[];
    OR?: Prisma.job_analysesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.job_analysesScalarWhereWithAggregatesInput | Prisma.job_analysesScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"job_analyses"> | string;
    job_id?: Prisma.UuidWithAggregatesFilter<"job_analyses"> | string;
    user_id?: Prisma.UuidWithAggregatesFilter<"job_analyses"> | string;
    ai_run_id?: Prisma.UuidNullableWithAggregatesFilter<"job_analyses"> | string | null;
    requirement_summary?: Prisma.StringNullableWithAggregatesFilter<"job_analyses"> | string | null;
    strengths?: Prisma.JsonWithAggregatesFilter<"job_analyses">;
    gaps?: Prisma.JsonWithAggregatesFilter<"job_analyses">;
    application_bullets?: Prisma.JsonWithAggregatesFilter<"job_analyses">;
    interview_questions?: Prisma.JsonWithAggregatesFilter<"job_analyses">;
    citations?: Prisma.JsonWithAggregatesFilter<"job_analyses">;
    overall_match_score?: Prisma.IntNullableWithAggregatesFilter<"job_analyses"> | number | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"job_analyses"> | Date | string;
};
export type job_analysesCreateInput = {
    id?: string;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
    ai_runs?: Prisma.ai_runsCreateNestedOneWithoutJob_analysesInput;
    jobs: Prisma.jobsCreateNestedOneWithoutJob_analysesInput;
    users: Prisma.usersCreateNestedOneWithoutJob_analysesInput;
};
export type job_analysesUncheckedCreateInput = {
    id?: string;
    job_id: string;
    user_id: string;
    ai_run_id?: string | null;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
};
export type job_analysesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUpdateOneWithoutJob_analysesNestedInput;
    jobs?: Prisma.jobsUpdateOneRequiredWithoutJob_analysesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutJob_analysesNestedInput;
};
export type job_analysesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ai_run_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type job_analysesCreateManyInput = {
    id?: string;
    job_id: string;
    user_id: string;
    ai_run_id?: string | null;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
};
export type job_analysesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type job_analysesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ai_run_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Job_analysesListRelationFilter = {
    every?: Prisma.job_analysesWhereInput;
    some?: Prisma.job_analysesWhereInput;
    none?: Prisma.job_analysesWhereInput;
};
export type job_analysesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type job_analysesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    job_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    ai_run_id?: Prisma.SortOrder;
    requirement_summary?: Prisma.SortOrder;
    strengths?: Prisma.SortOrder;
    gaps?: Prisma.SortOrder;
    application_bullets?: Prisma.SortOrder;
    interview_questions?: Prisma.SortOrder;
    citations?: Prisma.SortOrder;
    overall_match_score?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type job_analysesAvgOrderByAggregateInput = {
    overall_match_score?: Prisma.SortOrder;
};
export type job_analysesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    job_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    ai_run_id?: Prisma.SortOrder;
    requirement_summary?: Prisma.SortOrder;
    overall_match_score?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type job_analysesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    job_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    ai_run_id?: Prisma.SortOrder;
    requirement_summary?: Prisma.SortOrder;
    overall_match_score?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type job_analysesSumOrderByAggregateInput = {
    overall_match_score?: Prisma.SortOrder;
};
export type job_analysesCreateNestedManyWithoutAi_runsInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutAi_runsInput, Prisma.job_analysesUncheckedCreateWithoutAi_runsInput> | Prisma.job_analysesCreateWithoutAi_runsInput[] | Prisma.job_analysesUncheckedCreateWithoutAi_runsInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutAi_runsInput | Prisma.job_analysesCreateOrConnectWithoutAi_runsInput[];
    createMany?: Prisma.job_analysesCreateManyAi_runsInputEnvelope;
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
};
export type job_analysesUncheckedCreateNestedManyWithoutAi_runsInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutAi_runsInput, Prisma.job_analysesUncheckedCreateWithoutAi_runsInput> | Prisma.job_analysesCreateWithoutAi_runsInput[] | Prisma.job_analysesUncheckedCreateWithoutAi_runsInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutAi_runsInput | Prisma.job_analysesCreateOrConnectWithoutAi_runsInput[];
    createMany?: Prisma.job_analysesCreateManyAi_runsInputEnvelope;
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
};
export type job_analysesUpdateManyWithoutAi_runsNestedInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutAi_runsInput, Prisma.job_analysesUncheckedCreateWithoutAi_runsInput> | Prisma.job_analysesCreateWithoutAi_runsInput[] | Prisma.job_analysesUncheckedCreateWithoutAi_runsInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutAi_runsInput | Prisma.job_analysesCreateOrConnectWithoutAi_runsInput[];
    upsert?: Prisma.job_analysesUpsertWithWhereUniqueWithoutAi_runsInput | Prisma.job_analysesUpsertWithWhereUniqueWithoutAi_runsInput[];
    createMany?: Prisma.job_analysesCreateManyAi_runsInputEnvelope;
    set?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    disconnect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    delete?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    update?: Prisma.job_analysesUpdateWithWhereUniqueWithoutAi_runsInput | Prisma.job_analysesUpdateWithWhereUniqueWithoutAi_runsInput[];
    updateMany?: Prisma.job_analysesUpdateManyWithWhereWithoutAi_runsInput | Prisma.job_analysesUpdateManyWithWhereWithoutAi_runsInput[];
    deleteMany?: Prisma.job_analysesScalarWhereInput | Prisma.job_analysesScalarWhereInput[];
};
export type job_analysesUncheckedUpdateManyWithoutAi_runsNestedInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutAi_runsInput, Prisma.job_analysesUncheckedCreateWithoutAi_runsInput> | Prisma.job_analysesCreateWithoutAi_runsInput[] | Prisma.job_analysesUncheckedCreateWithoutAi_runsInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutAi_runsInput | Prisma.job_analysesCreateOrConnectWithoutAi_runsInput[];
    upsert?: Prisma.job_analysesUpsertWithWhereUniqueWithoutAi_runsInput | Prisma.job_analysesUpsertWithWhereUniqueWithoutAi_runsInput[];
    createMany?: Prisma.job_analysesCreateManyAi_runsInputEnvelope;
    set?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    disconnect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    delete?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    update?: Prisma.job_analysesUpdateWithWhereUniqueWithoutAi_runsInput | Prisma.job_analysesUpdateWithWhereUniqueWithoutAi_runsInput[];
    updateMany?: Prisma.job_analysesUpdateManyWithWhereWithoutAi_runsInput | Prisma.job_analysesUpdateManyWithWhereWithoutAi_runsInput[];
    deleteMany?: Prisma.job_analysesScalarWhereInput | Prisma.job_analysesScalarWhereInput[];
};
export type job_analysesCreateNestedManyWithoutJobsInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutJobsInput, Prisma.job_analysesUncheckedCreateWithoutJobsInput> | Prisma.job_analysesCreateWithoutJobsInput[] | Prisma.job_analysesUncheckedCreateWithoutJobsInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutJobsInput | Prisma.job_analysesCreateOrConnectWithoutJobsInput[];
    createMany?: Prisma.job_analysesCreateManyJobsInputEnvelope;
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
};
export type job_analysesUncheckedCreateNestedManyWithoutJobsInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutJobsInput, Prisma.job_analysesUncheckedCreateWithoutJobsInput> | Prisma.job_analysesCreateWithoutJobsInput[] | Prisma.job_analysesUncheckedCreateWithoutJobsInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutJobsInput | Prisma.job_analysesCreateOrConnectWithoutJobsInput[];
    createMany?: Prisma.job_analysesCreateManyJobsInputEnvelope;
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
};
export type job_analysesUpdateManyWithoutJobsNestedInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutJobsInput, Prisma.job_analysesUncheckedCreateWithoutJobsInput> | Prisma.job_analysesCreateWithoutJobsInput[] | Prisma.job_analysesUncheckedCreateWithoutJobsInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutJobsInput | Prisma.job_analysesCreateOrConnectWithoutJobsInput[];
    upsert?: Prisma.job_analysesUpsertWithWhereUniqueWithoutJobsInput | Prisma.job_analysesUpsertWithWhereUniqueWithoutJobsInput[];
    createMany?: Prisma.job_analysesCreateManyJobsInputEnvelope;
    set?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    disconnect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    delete?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    update?: Prisma.job_analysesUpdateWithWhereUniqueWithoutJobsInput | Prisma.job_analysesUpdateWithWhereUniqueWithoutJobsInput[];
    updateMany?: Prisma.job_analysesUpdateManyWithWhereWithoutJobsInput | Prisma.job_analysesUpdateManyWithWhereWithoutJobsInput[];
    deleteMany?: Prisma.job_analysesScalarWhereInput | Prisma.job_analysesScalarWhereInput[];
};
export type job_analysesUncheckedUpdateManyWithoutJobsNestedInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutJobsInput, Prisma.job_analysesUncheckedCreateWithoutJobsInput> | Prisma.job_analysesCreateWithoutJobsInput[] | Prisma.job_analysesUncheckedCreateWithoutJobsInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutJobsInput | Prisma.job_analysesCreateOrConnectWithoutJobsInput[];
    upsert?: Prisma.job_analysesUpsertWithWhereUniqueWithoutJobsInput | Prisma.job_analysesUpsertWithWhereUniqueWithoutJobsInput[];
    createMany?: Prisma.job_analysesCreateManyJobsInputEnvelope;
    set?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    disconnect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    delete?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    update?: Prisma.job_analysesUpdateWithWhereUniqueWithoutJobsInput | Prisma.job_analysesUpdateWithWhereUniqueWithoutJobsInput[];
    updateMany?: Prisma.job_analysesUpdateManyWithWhereWithoutJobsInput | Prisma.job_analysesUpdateManyWithWhereWithoutJobsInput[];
    deleteMany?: Prisma.job_analysesScalarWhereInput | Prisma.job_analysesScalarWhereInput[];
};
export type job_analysesCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutUsersInput, Prisma.job_analysesUncheckedCreateWithoutUsersInput> | Prisma.job_analysesCreateWithoutUsersInput[] | Prisma.job_analysesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutUsersInput | Prisma.job_analysesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.job_analysesCreateManyUsersInputEnvelope;
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
};
export type job_analysesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutUsersInput, Prisma.job_analysesUncheckedCreateWithoutUsersInput> | Prisma.job_analysesCreateWithoutUsersInput[] | Prisma.job_analysesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutUsersInput | Prisma.job_analysesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.job_analysesCreateManyUsersInputEnvelope;
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
};
export type job_analysesUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutUsersInput, Prisma.job_analysesUncheckedCreateWithoutUsersInput> | Prisma.job_analysesCreateWithoutUsersInput[] | Prisma.job_analysesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutUsersInput | Prisma.job_analysesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.job_analysesUpsertWithWhereUniqueWithoutUsersInput | Prisma.job_analysesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.job_analysesCreateManyUsersInputEnvelope;
    set?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    disconnect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    delete?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    update?: Prisma.job_analysesUpdateWithWhereUniqueWithoutUsersInput | Prisma.job_analysesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.job_analysesUpdateManyWithWhereWithoutUsersInput | Prisma.job_analysesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.job_analysesScalarWhereInput | Prisma.job_analysesScalarWhereInput[];
};
export type job_analysesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.job_analysesCreateWithoutUsersInput, Prisma.job_analysesUncheckedCreateWithoutUsersInput> | Prisma.job_analysesCreateWithoutUsersInput[] | Prisma.job_analysesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.job_analysesCreateOrConnectWithoutUsersInput | Prisma.job_analysesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.job_analysesUpsertWithWhereUniqueWithoutUsersInput | Prisma.job_analysesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.job_analysesCreateManyUsersInputEnvelope;
    set?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    disconnect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    delete?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    connect?: Prisma.job_analysesWhereUniqueInput | Prisma.job_analysesWhereUniqueInput[];
    update?: Prisma.job_analysesUpdateWithWhereUniqueWithoutUsersInput | Prisma.job_analysesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.job_analysesUpdateManyWithWhereWithoutUsersInput | Prisma.job_analysesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.job_analysesScalarWhereInput | Prisma.job_analysesScalarWhereInput[];
};
export type job_analysesCreateWithoutAi_runsInput = {
    id?: string;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
    jobs: Prisma.jobsCreateNestedOneWithoutJob_analysesInput;
    users: Prisma.usersCreateNestedOneWithoutJob_analysesInput;
};
export type job_analysesUncheckedCreateWithoutAi_runsInput = {
    id?: string;
    job_id: string;
    user_id: string;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
};
export type job_analysesCreateOrConnectWithoutAi_runsInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    create: Prisma.XOR<Prisma.job_analysesCreateWithoutAi_runsInput, Prisma.job_analysesUncheckedCreateWithoutAi_runsInput>;
};
export type job_analysesCreateManyAi_runsInputEnvelope = {
    data: Prisma.job_analysesCreateManyAi_runsInput | Prisma.job_analysesCreateManyAi_runsInput[];
    skipDuplicates?: boolean;
};
export type job_analysesUpsertWithWhereUniqueWithoutAi_runsInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    update: Prisma.XOR<Prisma.job_analysesUpdateWithoutAi_runsInput, Prisma.job_analysesUncheckedUpdateWithoutAi_runsInput>;
    create: Prisma.XOR<Prisma.job_analysesCreateWithoutAi_runsInput, Prisma.job_analysesUncheckedCreateWithoutAi_runsInput>;
};
export type job_analysesUpdateWithWhereUniqueWithoutAi_runsInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    data: Prisma.XOR<Prisma.job_analysesUpdateWithoutAi_runsInput, Prisma.job_analysesUncheckedUpdateWithoutAi_runsInput>;
};
export type job_analysesUpdateManyWithWhereWithoutAi_runsInput = {
    where: Prisma.job_analysesScalarWhereInput;
    data: Prisma.XOR<Prisma.job_analysesUpdateManyMutationInput, Prisma.job_analysesUncheckedUpdateManyWithoutAi_runsInput>;
};
export type job_analysesScalarWhereInput = {
    AND?: Prisma.job_analysesScalarWhereInput | Prisma.job_analysesScalarWhereInput[];
    OR?: Prisma.job_analysesScalarWhereInput[];
    NOT?: Prisma.job_analysesScalarWhereInput | Prisma.job_analysesScalarWhereInput[];
    id?: Prisma.UuidFilter<"job_analyses"> | string;
    job_id?: Prisma.UuidFilter<"job_analyses"> | string;
    user_id?: Prisma.UuidFilter<"job_analyses"> | string;
    ai_run_id?: Prisma.UuidNullableFilter<"job_analyses"> | string | null;
    requirement_summary?: Prisma.StringNullableFilter<"job_analyses"> | string | null;
    strengths?: Prisma.JsonFilter<"job_analyses">;
    gaps?: Prisma.JsonFilter<"job_analyses">;
    application_bullets?: Prisma.JsonFilter<"job_analyses">;
    interview_questions?: Prisma.JsonFilter<"job_analyses">;
    citations?: Prisma.JsonFilter<"job_analyses">;
    overall_match_score?: Prisma.IntNullableFilter<"job_analyses"> | number | null;
    created_at?: Prisma.DateTimeFilter<"job_analyses"> | Date | string;
};
export type job_analysesCreateWithoutJobsInput = {
    id?: string;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
    ai_runs?: Prisma.ai_runsCreateNestedOneWithoutJob_analysesInput;
    users: Prisma.usersCreateNestedOneWithoutJob_analysesInput;
};
export type job_analysesUncheckedCreateWithoutJobsInput = {
    id?: string;
    user_id: string;
    ai_run_id?: string | null;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
};
export type job_analysesCreateOrConnectWithoutJobsInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    create: Prisma.XOR<Prisma.job_analysesCreateWithoutJobsInput, Prisma.job_analysesUncheckedCreateWithoutJobsInput>;
};
export type job_analysesCreateManyJobsInputEnvelope = {
    data: Prisma.job_analysesCreateManyJobsInput | Prisma.job_analysesCreateManyJobsInput[];
    skipDuplicates?: boolean;
};
export type job_analysesUpsertWithWhereUniqueWithoutJobsInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    update: Prisma.XOR<Prisma.job_analysesUpdateWithoutJobsInput, Prisma.job_analysesUncheckedUpdateWithoutJobsInput>;
    create: Prisma.XOR<Prisma.job_analysesCreateWithoutJobsInput, Prisma.job_analysesUncheckedCreateWithoutJobsInput>;
};
export type job_analysesUpdateWithWhereUniqueWithoutJobsInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    data: Prisma.XOR<Prisma.job_analysesUpdateWithoutJobsInput, Prisma.job_analysesUncheckedUpdateWithoutJobsInput>;
};
export type job_analysesUpdateManyWithWhereWithoutJobsInput = {
    where: Prisma.job_analysesScalarWhereInput;
    data: Prisma.XOR<Prisma.job_analysesUpdateManyMutationInput, Prisma.job_analysesUncheckedUpdateManyWithoutJobsInput>;
};
export type job_analysesCreateWithoutUsersInput = {
    id?: string;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
    ai_runs?: Prisma.ai_runsCreateNestedOneWithoutJob_analysesInput;
    jobs: Prisma.jobsCreateNestedOneWithoutJob_analysesInput;
};
export type job_analysesUncheckedCreateWithoutUsersInput = {
    id?: string;
    job_id: string;
    ai_run_id?: string | null;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
};
export type job_analysesCreateOrConnectWithoutUsersInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    create: Prisma.XOR<Prisma.job_analysesCreateWithoutUsersInput, Prisma.job_analysesUncheckedCreateWithoutUsersInput>;
};
export type job_analysesCreateManyUsersInputEnvelope = {
    data: Prisma.job_analysesCreateManyUsersInput | Prisma.job_analysesCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type job_analysesUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    update: Prisma.XOR<Prisma.job_analysesUpdateWithoutUsersInput, Prisma.job_analysesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.job_analysesCreateWithoutUsersInput, Prisma.job_analysesUncheckedCreateWithoutUsersInput>;
};
export type job_analysesUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.job_analysesWhereUniqueInput;
    data: Prisma.XOR<Prisma.job_analysesUpdateWithoutUsersInput, Prisma.job_analysesUncheckedUpdateWithoutUsersInput>;
};
export type job_analysesUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.job_analysesScalarWhereInput;
    data: Prisma.XOR<Prisma.job_analysesUpdateManyMutationInput, Prisma.job_analysesUncheckedUpdateManyWithoutUsersInput>;
};
export type job_analysesCreateManyAi_runsInput = {
    id?: string;
    job_id: string;
    user_id: string;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
};
export type job_analysesUpdateWithoutAi_runsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jobs?: Prisma.jobsUpdateOneRequiredWithoutJob_analysesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutJob_analysesNestedInput;
};
export type job_analysesUncheckedUpdateWithoutAi_runsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type job_analysesUncheckedUpdateManyWithoutAi_runsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type job_analysesCreateManyJobsInput = {
    id?: string;
    user_id: string;
    ai_run_id?: string | null;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
};
export type job_analysesUpdateWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUpdateOneWithoutJob_analysesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutJob_analysesNestedInput;
};
export type job_analysesUncheckedUpdateWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ai_run_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type job_analysesUncheckedUpdateManyWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ai_run_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type job_analysesCreateManyUsersInput = {
    id?: string;
    job_id: string;
    ai_run_id?: string | null;
    requirement_summary?: string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: number | null;
    created_at?: Date | string;
};
export type job_analysesUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUpdateOneWithoutJob_analysesNestedInput;
    jobs?: Prisma.jobsUpdateOneRequiredWithoutJob_analysesNestedInput;
};
export type job_analysesUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ai_run_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type job_analysesUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ai_run_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requirement_summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strengths?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    gaps?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    application_bullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    interview_questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    overall_match_score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type job_analysesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    job_id?: boolean;
    user_id?: boolean;
    ai_run_id?: boolean;
    requirement_summary?: boolean;
    strengths?: boolean;
    gaps?: boolean;
    application_bullets?: boolean;
    interview_questions?: boolean;
    citations?: boolean;
    overall_match_score?: boolean;
    created_at?: boolean;
    ai_runs?: boolean | Prisma.job_analyses$ai_runsArgs<ExtArgs>;
    jobs?: boolean | Prisma.jobsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["job_analyses"]>;
export type job_analysesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    job_id?: boolean;
    user_id?: boolean;
    ai_run_id?: boolean;
    requirement_summary?: boolean;
    strengths?: boolean;
    gaps?: boolean;
    application_bullets?: boolean;
    interview_questions?: boolean;
    citations?: boolean;
    overall_match_score?: boolean;
    created_at?: boolean;
    ai_runs?: boolean | Prisma.job_analyses$ai_runsArgs<ExtArgs>;
    jobs?: boolean | Prisma.jobsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["job_analyses"]>;
export type job_analysesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    job_id?: boolean;
    user_id?: boolean;
    ai_run_id?: boolean;
    requirement_summary?: boolean;
    strengths?: boolean;
    gaps?: boolean;
    application_bullets?: boolean;
    interview_questions?: boolean;
    citations?: boolean;
    overall_match_score?: boolean;
    created_at?: boolean;
    ai_runs?: boolean | Prisma.job_analyses$ai_runsArgs<ExtArgs>;
    jobs?: boolean | Prisma.jobsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["job_analyses"]>;
export type job_analysesSelectScalar = {
    id?: boolean;
    job_id?: boolean;
    user_id?: boolean;
    ai_run_id?: boolean;
    requirement_summary?: boolean;
    strengths?: boolean;
    gaps?: boolean;
    application_bullets?: boolean;
    interview_questions?: boolean;
    citations?: boolean;
    overall_match_score?: boolean;
    created_at?: boolean;
};
export type job_analysesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "job_id" | "user_id" | "ai_run_id" | "requirement_summary" | "strengths" | "gaps" | "application_bullets" | "interview_questions" | "citations" | "overall_match_score" | "created_at", ExtArgs["result"]["job_analyses"]>;
export type job_analysesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ai_runs?: boolean | Prisma.job_analyses$ai_runsArgs<ExtArgs>;
    jobs?: boolean | Prisma.jobsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type job_analysesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ai_runs?: boolean | Prisma.job_analyses$ai_runsArgs<ExtArgs>;
    jobs?: boolean | Prisma.jobsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type job_analysesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ai_runs?: boolean | Prisma.job_analyses$ai_runsArgs<ExtArgs>;
    jobs?: boolean | Prisma.jobsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $job_analysesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "job_analyses";
    objects: {
        ai_runs: Prisma.$ai_runsPayload<ExtArgs> | null;
        jobs: Prisma.$jobsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        job_id: string;
        user_id: string;
        ai_run_id: string | null;
        requirement_summary: string | null;
        strengths: runtime.JsonValue;
        gaps: runtime.JsonValue;
        application_bullets: runtime.JsonValue;
        interview_questions: runtime.JsonValue;
        citations: runtime.JsonValue;
        overall_match_score: number | null;
        created_at: Date;
    }, ExtArgs["result"]["job_analyses"]>;
    composites: {};
};
export type job_analysesGetPayload<S extends boolean | null | undefined | job_analysesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$job_analysesPayload, S>;
export type job_analysesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<job_analysesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Job_analysesCountAggregateInputType | true;
};
export interface job_analysesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['job_analyses'];
        meta: {
            name: 'job_analyses';
        };
    };
    findUnique<T extends job_analysesFindUniqueArgs>(args: Prisma.SelectSubset<T, job_analysesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__job_analysesClient<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends job_analysesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, job_analysesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__job_analysesClient<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends job_analysesFindFirstArgs>(args?: Prisma.SelectSubset<T, job_analysesFindFirstArgs<ExtArgs>>): Prisma.Prisma__job_analysesClient<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends job_analysesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, job_analysesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__job_analysesClient<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends job_analysesFindManyArgs>(args?: Prisma.SelectSubset<T, job_analysesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends job_analysesCreateArgs>(args: Prisma.SelectSubset<T, job_analysesCreateArgs<ExtArgs>>): Prisma.Prisma__job_analysesClient<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends job_analysesCreateManyArgs>(args?: Prisma.SelectSubset<T, job_analysesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends job_analysesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, job_analysesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends job_analysesDeleteArgs>(args: Prisma.SelectSubset<T, job_analysesDeleteArgs<ExtArgs>>): Prisma.Prisma__job_analysesClient<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends job_analysesUpdateArgs>(args: Prisma.SelectSubset<T, job_analysesUpdateArgs<ExtArgs>>): Prisma.Prisma__job_analysesClient<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends job_analysesDeleteManyArgs>(args?: Prisma.SelectSubset<T, job_analysesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends job_analysesUpdateManyArgs>(args: Prisma.SelectSubset<T, job_analysesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends job_analysesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, job_analysesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends job_analysesUpsertArgs>(args: Prisma.SelectSubset<T, job_analysesUpsertArgs<ExtArgs>>): Prisma.Prisma__job_analysesClient<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends job_analysesCountArgs>(args?: Prisma.Subset<T, job_analysesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Job_analysesCountAggregateOutputType> : number>;
    aggregate<T extends Job_analysesAggregateArgs>(args: Prisma.Subset<T, Job_analysesAggregateArgs>): Prisma.PrismaPromise<GetJob_analysesAggregateType<T>>;
    groupBy<T extends job_analysesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: job_analysesGroupByArgs['orderBy'];
    } : {
        orderBy?: job_analysesGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, job_analysesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJob_analysesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: job_analysesFieldRefs;
}
export interface Prisma__job_analysesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ai_runs<T extends Prisma.job_analyses$ai_runsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.job_analyses$ai_runsArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    jobs<T extends Prisma.jobsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.jobsDefaultArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface job_analysesFieldRefs {
    readonly id: Prisma.FieldRef<"job_analyses", 'String'>;
    readonly job_id: Prisma.FieldRef<"job_analyses", 'String'>;
    readonly user_id: Prisma.FieldRef<"job_analyses", 'String'>;
    readonly ai_run_id: Prisma.FieldRef<"job_analyses", 'String'>;
    readonly requirement_summary: Prisma.FieldRef<"job_analyses", 'String'>;
    readonly strengths: Prisma.FieldRef<"job_analyses", 'Json'>;
    readonly gaps: Prisma.FieldRef<"job_analyses", 'Json'>;
    readonly application_bullets: Prisma.FieldRef<"job_analyses", 'Json'>;
    readonly interview_questions: Prisma.FieldRef<"job_analyses", 'Json'>;
    readonly citations: Prisma.FieldRef<"job_analyses", 'Json'>;
    readonly overall_match_score: Prisma.FieldRef<"job_analyses", 'Int'>;
    readonly created_at: Prisma.FieldRef<"job_analyses", 'DateTime'>;
}
export type job_analysesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    where: Prisma.job_analysesWhereUniqueInput;
};
export type job_analysesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    where: Prisma.job_analysesWhereUniqueInput;
};
export type job_analysesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    where?: Prisma.job_analysesWhereInput;
    orderBy?: Prisma.job_analysesOrderByWithRelationInput | Prisma.job_analysesOrderByWithRelationInput[];
    cursor?: Prisma.job_analysesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Job_analysesScalarFieldEnum | Prisma.Job_analysesScalarFieldEnum[];
};
export type job_analysesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    where?: Prisma.job_analysesWhereInput;
    orderBy?: Prisma.job_analysesOrderByWithRelationInput | Prisma.job_analysesOrderByWithRelationInput[];
    cursor?: Prisma.job_analysesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Job_analysesScalarFieldEnum | Prisma.Job_analysesScalarFieldEnum[];
};
export type job_analysesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    where?: Prisma.job_analysesWhereInput;
    orderBy?: Prisma.job_analysesOrderByWithRelationInput | Prisma.job_analysesOrderByWithRelationInput[];
    cursor?: Prisma.job_analysesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Job_analysesScalarFieldEnum | Prisma.Job_analysesScalarFieldEnum[];
};
export type job_analysesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.job_analysesCreateInput, Prisma.job_analysesUncheckedCreateInput>;
};
export type job_analysesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.job_analysesCreateManyInput | Prisma.job_analysesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type job_analysesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    data: Prisma.job_analysesCreateManyInput | Prisma.job_analysesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.job_analysesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type job_analysesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.job_analysesUpdateInput, Prisma.job_analysesUncheckedUpdateInput>;
    where: Prisma.job_analysesWhereUniqueInput;
};
export type job_analysesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.job_analysesUpdateManyMutationInput, Prisma.job_analysesUncheckedUpdateManyInput>;
    where?: Prisma.job_analysesWhereInput;
    limit?: number;
};
export type job_analysesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.job_analysesUpdateManyMutationInput, Prisma.job_analysesUncheckedUpdateManyInput>;
    where?: Prisma.job_analysesWhereInput;
    limit?: number;
    include?: Prisma.job_analysesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type job_analysesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    where: Prisma.job_analysesWhereUniqueInput;
    create: Prisma.XOR<Prisma.job_analysesCreateInput, Prisma.job_analysesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.job_analysesUpdateInput, Prisma.job_analysesUncheckedUpdateInput>;
};
export type job_analysesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
    where: Prisma.job_analysesWhereUniqueInput;
};
export type job_analysesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_analysesWhereInput;
    limit?: number;
};
export type job_analyses$ai_runsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    where?: Prisma.ai_runsWhereInput;
};
export type job_analysesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_analysesSelect<ExtArgs> | null;
    omit?: Prisma.job_analysesOmit<ExtArgs> | null;
    include?: Prisma.job_analysesInclude<ExtArgs> | null;
};
