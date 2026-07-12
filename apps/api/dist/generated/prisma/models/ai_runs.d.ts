import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ai_runsModel = runtime.Types.Result.DefaultSelection<Prisma.$ai_runsPayload>;
export type AggregateAi_runs = {
    _count: Ai_runsCountAggregateOutputType | null;
    _avg: Ai_runsAvgAggregateOutputType | null;
    _sum: Ai_runsSumAggregateOutputType | null;
    _min: Ai_runsMinAggregateOutputType | null;
    _max: Ai_runsMaxAggregateOutputType | null;
};
export type Ai_runsAvgAggregateOutputType = {
    prompt_tokens: number | null;
    completion_tokens: number | null;
    total_tokens: number | null;
    latency_ms: number | null;
};
export type Ai_runsSumAggregateOutputType = {
    prompt_tokens: number | null;
    completion_tokens: number | null;
    total_tokens: number | null;
    latency_ms: number | null;
};
export type Ai_runsMinAggregateOutputType = {
    id: string | null;
    user_id: string | null;
    run_type: string | null;
    model: string | null;
    prompt_tokens: number | null;
    completion_tokens: number | null;
    total_tokens: number | null;
    latency_ms: number | null;
    status: string | null;
    error_message: string | null;
    input_preview: string | null;
    output_preview: string | null;
    created_at: Date | null;
};
export type Ai_runsMaxAggregateOutputType = {
    id: string | null;
    user_id: string | null;
    run_type: string | null;
    model: string | null;
    prompt_tokens: number | null;
    completion_tokens: number | null;
    total_tokens: number | null;
    latency_ms: number | null;
    status: string | null;
    error_message: string | null;
    input_preview: string | null;
    output_preview: string | null;
    created_at: Date | null;
};
export type Ai_runsCountAggregateOutputType = {
    id: number;
    user_id: number;
    run_type: number;
    model: number;
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    latency_ms: number;
    status: number;
    error_message: number;
    input_preview: number;
    output_preview: number;
    retrieved_chunk_ids: number;
    metadata: number;
    created_at: number;
    _all: number;
};
export type Ai_runsAvgAggregateInputType = {
    prompt_tokens?: true;
    completion_tokens?: true;
    total_tokens?: true;
    latency_ms?: true;
};
export type Ai_runsSumAggregateInputType = {
    prompt_tokens?: true;
    completion_tokens?: true;
    total_tokens?: true;
    latency_ms?: true;
};
export type Ai_runsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    run_type?: true;
    model?: true;
    prompt_tokens?: true;
    completion_tokens?: true;
    total_tokens?: true;
    latency_ms?: true;
    status?: true;
    error_message?: true;
    input_preview?: true;
    output_preview?: true;
    created_at?: true;
};
export type Ai_runsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    run_type?: true;
    model?: true;
    prompt_tokens?: true;
    completion_tokens?: true;
    total_tokens?: true;
    latency_ms?: true;
    status?: true;
    error_message?: true;
    input_preview?: true;
    output_preview?: true;
    created_at?: true;
};
export type Ai_runsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    run_type?: true;
    model?: true;
    prompt_tokens?: true;
    completion_tokens?: true;
    total_tokens?: true;
    latency_ms?: true;
    status?: true;
    error_message?: true;
    input_preview?: true;
    output_preview?: true;
    retrieved_chunk_ids?: true;
    metadata?: true;
    created_at?: true;
    _all?: true;
};
export type Ai_runsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ai_runsWhereInput;
    orderBy?: Prisma.ai_runsOrderByWithRelationInput | Prisma.ai_runsOrderByWithRelationInput[];
    cursor?: Prisma.ai_runsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Ai_runsCountAggregateInputType;
    _avg?: Ai_runsAvgAggregateInputType;
    _sum?: Ai_runsSumAggregateInputType;
    _min?: Ai_runsMinAggregateInputType;
    _max?: Ai_runsMaxAggregateInputType;
};
export type GetAi_runsAggregateType<T extends Ai_runsAggregateArgs> = {
    [P in keyof T & keyof AggregateAi_runs]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAi_runs[P]> : Prisma.GetScalarType<T[P], AggregateAi_runs[P]>;
};
export type ai_runsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ai_runsWhereInput;
    orderBy?: Prisma.ai_runsOrderByWithAggregationInput | Prisma.ai_runsOrderByWithAggregationInput[];
    by: Prisma.Ai_runsScalarFieldEnum[] | Prisma.Ai_runsScalarFieldEnum;
    having?: Prisma.ai_runsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Ai_runsCountAggregateInputType | true;
    _avg?: Ai_runsAvgAggregateInputType;
    _sum?: Ai_runsSumAggregateInputType;
    _min?: Ai_runsMinAggregateInputType;
    _max?: Ai_runsMaxAggregateInputType;
};
export type Ai_runsGroupByOutputType = {
    id: string;
    user_id: string;
    run_type: string;
    model: string;
    prompt_tokens: number | null;
    completion_tokens: number | null;
    total_tokens: number | null;
    latency_ms: number | null;
    status: string;
    error_message: string | null;
    input_preview: string | null;
    output_preview: string | null;
    retrieved_chunk_ids: string[];
    metadata: runtime.JsonValue;
    created_at: Date;
    _count: Ai_runsCountAggregateOutputType | null;
    _avg: Ai_runsAvgAggregateOutputType | null;
    _sum: Ai_runsSumAggregateOutputType | null;
    _min: Ai_runsMinAggregateOutputType | null;
    _max: Ai_runsMaxAggregateOutputType | null;
};
export type GetAi_runsGroupByPayload<T extends ai_runsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Ai_runsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Ai_runsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Ai_runsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Ai_runsGroupByOutputType[P]>;
}>>;
export type ai_runsWhereInput = {
    AND?: Prisma.ai_runsWhereInput | Prisma.ai_runsWhereInput[];
    OR?: Prisma.ai_runsWhereInput[];
    NOT?: Prisma.ai_runsWhereInput | Prisma.ai_runsWhereInput[];
    id?: Prisma.UuidFilter<"ai_runs"> | string;
    user_id?: Prisma.UuidFilter<"ai_runs"> | string;
    run_type?: Prisma.StringFilter<"ai_runs"> | string;
    model?: Prisma.StringFilter<"ai_runs"> | string;
    prompt_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    completion_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    total_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    latency_ms?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    status?: Prisma.StringFilter<"ai_runs"> | string;
    error_message?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    input_preview?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    output_preview?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    retrieved_chunk_ids?: Prisma.StringNullableListFilter<"ai_runs">;
    metadata?: Prisma.JsonFilter<"ai_runs">;
    created_at?: Prisma.DateTimeFilter<"ai_runs"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    job_analyses?: Prisma.Job_analysesListRelationFilter;
};
export type ai_runsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    run_type?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    prompt_tokens?: Prisma.SortOrderInput | Prisma.SortOrder;
    completion_tokens?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_tokens?: Prisma.SortOrderInput | Prisma.SortOrder;
    latency_ms?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error_message?: Prisma.SortOrderInput | Prisma.SortOrder;
    input_preview?: Prisma.SortOrderInput | Prisma.SortOrder;
    output_preview?: Prisma.SortOrderInput | Prisma.SortOrder;
    retrieved_chunk_ids?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
    job_analyses?: Prisma.job_analysesOrderByRelationAggregateInput;
};
export type ai_runsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ai_runsWhereInput | Prisma.ai_runsWhereInput[];
    OR?: Prisma.ai_runsWhereInput[];
    NOT?: Prisma.ai_runsWhereInput | Prisma.ai_runsWhereInput[];
    user_id?: Prisma.UuidFilter<"ai_runs"> | string;
    run_type?: Prisma.StringFilter<"ai_runs"> | string;
    model?: Prisma.StringFilter<"ai_runs"> | string;
    prompt_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    completion_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    total_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    latency_ms?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    status?: Prisma.StringFilter<"ai_runs"> | string;
    error_message?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    input_preview?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    output_preview?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    retrieved_chunk_ids?: Prisma.StringNullableListFilter<"ai_runs">;
    metadata?: Prisma.JsonFilter<"ai_runs">;
    created_at?: Prisma.DateTimeFilter<"ai_runs"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    job_analyses?: Prisma.Job_analysesListRelationFilter;
}, "id">;
export type ai_runsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    run_type?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    prompt_tokens?: Prisma.SortOrderInput | Prisma.SortOrder;
    completion_tokens?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_tokens?: Prisma.SortOrderInput | Prisma.SortOrder;
    latency_ms?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error_message?: Prisma.SortOrderInput | Prisma.SortOrder;
    input_preview?: Prisma.SortOrderInput | Prisma.SortOrder;
    output_preview?: Prisma.SortOrderInput | Prisma.SortOrder;
    retrieved_chunk_ids?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.ai_runsCountOrderByAggregateInput;
    _avg?: Prisma.ai_runsAvgOrderByAggregateInput;
    _max?: Prisma.ai_runsMaxOrderByAggregateInput;
    _min?: Prisma.ai_runsMinOrderByAggregateInput;
    _sum?: Prisma.ai_runsSumOrderByAggregateInput;
};
export type ai_runsScalarWhereWithAggregatesInput = {
    AND?: Prisma.ai_runsScalarWhereWithAggregatesInput | Prisma.ai_runsScalarWhereWithAggregatesInput[];
    OR?: Prisma.ai_runsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ai_runsScalarWhereWithAggregatesInput | Prisma.ai_runsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ai_runs"> | string;
    user_id?: Prisma.UuidWithAggregatesFilter<"ai_runs"> | string;
    run_type?: Prisma.StringWithAggregatesFilter<"ai_runs"> | string;
    model?: Prisma.StringWithAggregatesFilter<"ai_runs"> | string;
    prompt_tokens?: Prisma.IntNullableWithAggregatesFilter<"ai_runs"> | number | null;
    completion_tokens?: Prisma.IntNullableWithAggregatesFilter<"ai_runs"> | number | null;
    total_tokens?: Prisma.IntNullableWithAggregatesFilter<"ai_runs"> | number | null;
    latency_ms?: Prisma.IntNullableWithAggregatesFilter<"ai_runs"> | number | null;
    status?: Prisma.StringWithAggregatesFilter<"ai_runs"> | string;
    error_message?: Prisma.StringNullableWithAggregatesFilter<"ai_runs"> | string | null;
    input_preview?: Prisma.StringNullableWithAggregatesFilter<"ai_runs"> | string | null;
    output_preview?: Prisma.StringNullableWithAggregatesFilter<"ai_runs"> | string | null;
    retrieved_chunk_ids?: Prisma.StringNullableListFilter<"ai_runs">;
    metadata?: Prisma.JsonWithAggregatesFilter<"ai_runs">;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"ai_runs"> | Date | string;
};
export type ai_runsCreateInput = {
    id?: string;
    run_type: string;
    model: string;
    prompt_tokens?: number | null;
    completion_tokens?: number | null;
    total_tokens?: number | null;
    latency_ms?: number | null;
    status: string;
    error_message?: string | null;
    input_preview?: string | null;
    output_preview?: string | null;
    retrieved_chunk_ids?: Prisma.ai_runsCreateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutAi_runsInput;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutAi_runsInput;
};
export type ai_runsUncheckedCreateInput = {
    id?: string;
    user_id: string;
    run_type: string;
    model: string;
    prompt_tokens?: number | null;
    completion_tokens?: number | null;
    total_tokens?: number | null;
    latency_ms?: number | null;
    status: string;
    error_message?: string | null;
    input_preview?: string | null;
    output_preview?: string | null;
    retrieved_chunk_ids?: Prisma.ai_runsCreateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutAi_runsInput;
};
export type ai_runsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutAi_runsNestedInput;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutAi_runsNestedInput;
};
export type ai_runsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutAi_runsNestedInput;
};
export type ai_runsCreateManyInput = {
    id?: string;
    user_id: string;
    run_type: string;
    model: string;
    prompt_tokens?: number | null;
    completion_tokens?: number | null;
    total_tokens?: number | null;
    latency_ms?: number | null;
    status: string;
    error_message?: string | null;
    input_preview?: string | null;
    output_preview?: string | null;
    retrieved_chunk_ids?: Prisma.ai_runsCreateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type ai_runsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ai_runsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type ai_runsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    run_type?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    prompt_tokens?: Prisma.SortOrder;
    completion_tokens?: Prisma.SortOrder;
    total_tokens?: Prisma.SortOrder;
    latency_ms?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error_message?: Prisma.SortOrder;
    input_preview?: Prisma.SortOrder;
    output_preview?: Prisma.SortOrder;
    retrieved_chunk_ids?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type ai_runsAvgOrderByAggregateInput = {
    prompt_tokens?: Prisma.SortOrder;
    completion_tokens?: Prisma.SortOrder;
    total_tokens?: Prisma.SortOrder;
    latency_ms?: Prisma.SortOrder;
};
export type ai_runsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    run_type?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    prompt_tokens?: Prisma.SortOrder;
    completion_tokens?: Prisma.SortOrder;
    total_tokens?: Prisma.SortOrder;
    latency_ms?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error_message?: Prisma.SortOrder;
    input_preview?: Prisma.SortOrder;
    output_preview?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type ai_runsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    run_type?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    prompt_tokens?: Prisma.SortOrder;
    completion_tokens?: Prisma.SortOrder;
    total_tokens?: Prisma.SortOrder;
    latency_ms?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error_message?: Prisma.SortOrder;
    input_preview?: Prisma.SortOrder;
    output_preview?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type ai_runsSumOrderByAggregateInput = {
    prompt_tokens?: Prisma.SortOrder;
    completion_tokens?: Prisma.SortOrder;
    total_tokens?: Prisma.SortOrder;
    latency_ms?: Prisma.SortOrder;
};
export type Ai_runsNullableScalarRelationFilter = {
    is?: Prisma.ai_runsWhereInput | null;
    isNot?: Prisma.ai_runsWhereInput | null;
};
export type Ai_runsListRelationFilter = {
    every?: Prisma.ai_runsWhereInput;
    some?: Prisma.ai_runsWhereInput;
    none?: Prisma.ai_runsWhereInput;
};
export type ai_runsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ai_runsCreateretrieved_chunk_idsInput = {
    set: string[];
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type ai_runsUpdateretrieved_chunk_idsInput = {
    set?: string[];
    push?: string | string[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type ai_runsCreateNestedOneWithoutJob_analysesInput = {
    create?: Prisma.XOR<Prisma.ai_runsCreateWithoutJob_analysesInput, Prisma.ai_runsUncheckedCreateWithoutJob_analysesInput>;
    connectOrCreate?: Prisma.ai_runsCreateOrConnectWithoutJob_analysesInput;
    connect?: Prisma.ai_runsWhereUniqueInput;
};
export type ai_runsUpdateOneWithoutJob_analysesNestedInput = {
    create?: Prisma.XOR<Prisma.ai_runsCreateWithoutJob_analysesInput, Prisma.ai_runsUncheckedCreateWithoutJob_analysesInput>;
    connectOrCreate?: Prisma.ai_runsCreateOrConnectWithoutJob_analysesInput;
    upsert?: Prisma.ai_runsUpsertWithoutJob_analysesInput;
    disconnect?: Prisma.ai_runsWhereInput | boolean;
    delete?: Prisma.ai_runsWhereInput | boolean;
    connect?: Prisma.ai_runsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ai_runsUpdateToOneWithWhereWithoutJob_analysesInput, Prisma.ai_runsUpdateWithoutJob_analysesInput>, Prisma.ai_runsUncheckedUpdateWithoutJob_analysesInput>;
};
export type ai_runsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.ai_runsCreateWithoutUsersInput, Prisma.ai_runsUncheckedCreateWithoutUsersInput> | Prisma.ai_runsCreateWithoutUsersInput[] | Prisma.ai_runsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.ai_runsCreateOrConnectWithoutUsersInput | Prisma.ai_runsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.ai_runsCreateManyUsersInputEnvelope;
    connect?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
};
export type ai_runsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.ai_runsCreateWithoutUsersInput, Prisma.ai_runsUncheckedCreateWithoutUsersInput> | Prisma.ai_runsCreateWithoutUsersInput[] | Prisma.ai_runsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.ai_runsCreateOrConnectWithoutUsersInput | Prisma.ai_runsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.ai_runsCreateManyUsersInputEnvelope;
    connect?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
};
export type ai_runsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.ai_runsCreateWithoutUsersInput, Prisma.ai_runsUncheckedCreateWithoutUsersInput> | Prisma.ai_runsCreateWithoutUsersInput[] | Prisma.ai_runsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.ai_runsCreateOrConnectWithoutUsersInput | Prisma.ai_runsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.ai_runsUpsertWithWhereUniqueWithoutUsersInput | Prisma.ai_runsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.ai_runsCreateManyUsersInputEnvelope;
    set?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
    disconnect?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
    delete?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
    connect?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
    update?: Prisma.ai_runsUpdateWithWhereUniqueWithoutUsersInput | Prisma.ai_runsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.ai_runsUpdateManyWithWhereWithoutUsersInput | Prisma.ai_runsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.ai_runsScalarWhereInput | Prisma.ai_runsScalarWhereInput[];
};
export type ai_runsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.ai_runsCreateWithoutUsersInput, Prisma.ai_runsUncheckedCreateWithoutUsersInput> | Prisma.ai_runsCreateWithoutUsersInput[] | Prisma.ai_runsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.ai_runsCreateOrConnectWithoutUsersInput | Prisma.ai_runsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.ai_runsUpsertWithWhereUniqueWithoutUsersInput | Prisma.ai_runsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.ai_runsCreateManyUsersInputEnvelope;
    set?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
    disconnect?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
    delete?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
    connect?: Prisma.ai_runsWhereUniqueInput | Prisma.ai_runsWhereUniqueInput[];
    update?: Prisma.ai_runsUpdateWithWhereUniqueWithoutUsersInput | Prisma.ai_runsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.ai_runsUpdateManyWithWhereWithoutUsersInput | Prisma.ai_runsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.ai_runsScalarWhereInput | Prisma.ai_runsScalarWhereInput[];
};
export type ai_runsCreateWithoutJob_analysesInput = {
    id?: string;
    run_type: string;
    model: string;
    prompt_tokens?: number | null;
    completion_tokens?: number | null;
    total_tokens?: number | null;
    latency_ms?: number | null;
    status: string;
    error_message?: string | null;
    input_preview?: string | null;
    output_preview?: string | null;
    retrieved_chunk_ids?: Prisma.ai_runsCreateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutAi_runsInput;
};
export type ai_runsUncheckedCreateWithoutJob_analysesInput = {
    id?: string;
    user_id: string;
    run_type: string;
    model: string;
    prompt_tokens?: number | null;
    completion_tokens?: number | null;
    total_tokens?: number | null;
    latency_ms?: number | null;
    status: string;
    error_message?: string | null;
    input_preview?: string | null;
    output_preview?: string | null;
    retrieved_chunk_ids?: Prisma.ai_runsCreateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type ai_runsCreateOrConnectWithoutJob_analysesInput = {
    where: Prisma.ai_runsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ai_runsCreateWithoutJob_analysesInput, Prisma.ai_runsUncheckedCreateWithoutJob_analysesInput>;
};
export type ai_runsUpsertWithoutJob_analysesInput = {
    update: Prisma.XOR<Prisma.ai_runsUpdateWithoutJob_analysesInput, Prisma.ai_runsUncheckedUpdateWithoutJob_analysesInput>;
    create: Prisma.XOR<Prisma.ai_runsCreateWithoutJob_analysesInput, Prisma.ai_runsUncheckedCreateWithoutJob_analysesInput>;
    where?: Prisma.ai_runsWhereInput;
};
export type ai_runsUpdateToOneWithWhereWithoutJob_analysesInput = {
    where?: Prisma.ai_runsWhereInput;
    data: Prisma.XOR<Prisma.ai_runsUpdateWithoutJob_analysesInput, Prisma.ai_runsUncheckedUpdateWithoutJob_analysesInput>;
};
export type ai_runsUpdateWithoutJob_analysesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutAi_runsNestedInput;
};
export type ai_runsUncheckedUpdateWithoutJob_analysesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ai_runsCreateWithoutUsersInput = {
    id?: string;
    run_type: string;
    model: string;
    prompt_tokens?: number | null;
    completion_tokens?: number | null;
    total_tokens?: number | null;
    latency_ms?: number | null;
    status: string;
    error_message?: string | null;
    input_preview?: string | null;
    output_preview?: string | null;
    retrieved_chunk_ids?: Prisma.ai_runsCreateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutAi_runsInput;
};
export type ai_runsUncheckedCreateWithoutUsersInput = {
    id?: string;
    run_type: string;
    model: string;
    prompt_tokens?: number | null;
    completion_tokens?: number | null;
    total_tokens?: number | null;
    latency_ms?: number | null;
    status: string;
    error_message?: string | null;
    input_preview?: string | null;
    output_preview?: string | null;
    retrieved_chunk_ids?: Prisma.ai_runsCreateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutAi_runsInput;
};
export type ai_runsCreateOrConnectWithoutUsersInput = {
    where: Prisma.ai_runsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ai_runsCreateWithoutUsersInput, Prisma.ai_runsUncheckedCreateWithoutUsersInput>;
};
export type ai_runsCreateManyUsersInputEnvelope = {
    data: Prisma.ai_runsCreateManyUsersInput | Prisma.ai_runsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type ai_runsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.ai_runsWhereUniqueInput;
    update: Prisma.XOR<Prisma.ai_runsUpdateWithoutUsersInput, Prisma.ai_runsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.ai_runsCreateWithoutUsersInput, Prisma.ai_runsUncheckedCreateWithoutUsersInput>;
};
export type ai_runsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.ai_runsWhereUniqueInput;
    data: Prisma.XOR<Prisma.ai_runsUpdateWithoutUsersInput, Prisma.ai_runsUncheckedUpdateWithoutUsersInput>;
};
export type ai_runsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.ai_runsScalarWhereInput;
    data: Prisma.XOR<Prisma.ai_runsUpdateManyMutationInput, Prisma.ai_runsUncheckedUpdateManyWithoutUsersInput>;
};
export type ai_runsScalarWhereInput = {
    AND?: Prisma.ai_runsScalarWhereInput | Prisma.ai_runsScalarWhereInput[];
    OR?: Prisma.ai_runsScalarWhereInput[];
    NOT?: Prisma.ai_runsScalarWhereInput | Prisma.ai_runsScalarWhereInput[];
    id?: Prisma.UuidFilter<"ai_runs"> | string;
    user_id?: Prisma.UuidFilter<"ai_runs"> | string;
    run_type?: Prisma.StringFilter<"ai_runs"> | string;
    model?: Prisma.StringFilter<"ai_runs"> | string;
    prompt_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    completion_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    total_tokens?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    latency_ms?: Prisma.IntNullableFilter<"ai_runs"> | number | null;
    status?: Prisma.StringFilter<"ai_runs"> | string;
    error_message?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    input_preview?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    output_preview?: Prisma.StringNullableFilter<"ai_runs"> | string | null;
    retrieved_chunk_ids?: Prisma.StringNullableListFilter<"ai_runs">;
    metadata?: Prisma.JsonFilter<"ai_runs">;
    created_at?: Prisma.DateTimeFilter<"ai_runs"> | Date | string;
};
export type ai_runsCreateManyUsersInput = {
    id?: string;
    run_type: string;
    model: string;
    prompt_tokens?: number | null;
    completion_tokens?: number | null;
    total_tokens?: number | null;
    latency_ms?: number | null;
    status: string;
    error_message?: string | null;
    input_preview?: string | null;
    output_preview?: string | null;
    retrieved_chunk_ids?: Prisma.ai_runsCreateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type ai_runsUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutAi_runsNestedInput;
};
export type ai_runsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutAi_runsNestedInput;
};
export type ai_runsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    run_type?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    prompt_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completion_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_tokens?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latency_ms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    input_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    output_preview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    retrieved_chunk_ids?: Prisma.ai_runsUpdateretrieved_chunk_idsInput | string[];
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Ai_runsCountOutputType = {
    job_analyses: number;
};
export type Ai_runsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job_analyses?: boolean | Ai_runsCountOutputTypeCountJob_analysesArgs;
};
export type Ai_runsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Ai_runsCountOutputTypeSelect<ExtArgs> | null;
};
export type Ai_runsCountOutputTypeCountJob_analysesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_analysesWhereInput;
};
export type ai_runsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    run_type?: boolean;
    model?: boolean;
    prompt_tokens?: boolean;
    completion_tokens?: boolean;
    total_tokens?: boolean;
    latency_ms?: boolean;
    status?: boolean;
    error_message?: boolean;
    input_preview?: boolean;
    output_preview?: boolean;
    retrieved_chunk_ids?: boolean;
    metadata?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    job_analyses?: boolean | Prisma.ai_runs$job_analysesArgs<ExtArgs>;
    _count?: boolean | Prisma.Ai_runsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ai_runs"]>;
export type ai_runsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    run_type?: boolean;
    model?: boolean;
    prompt_tokens?: boolean;
    completion_tokens?: boolean;
    total_tokens?: boolean;
    latency_ms?: boolean;
    status?: boolean;
    error_message?: boolean;
    input_preview?: boolean;
    output_preview?: boolean;
    retrieved_chunk_ids?: boolean;
    metadata?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ai_runs"]>;
export type ai_runsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    run_type?: boolean;
    model?: boolean;
    prompt_tokens?: boolean;
    completion_tokens?: boolean;
    total_tokens?: boolean;
    latency_ms?: boolean;
    status?: boolean;
    error_message?: boolean;
    input_preview?: boolean;
    output_preview?: boolean;
    retrieved_chunk_ids?: boolean;
    metadata?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ai_runs"]>;
export type ai_runsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    run_type?: boolean;
    model?: boolean;
    prompt_tokens?: boolean;
    completion_tokens?: boolean;
    total_tokens?: boolean;
    latency_ms?: boolean;
    status?: boolean;
    error_message?: boolean;
    input_preview?: boolean;
    output_preview?: boolean;
    retrieved_chunk_ids?: boolean;
    metadata?: boolean;
    created_at?: boolean;
};
export type ai_runsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "run_type" | "model" | "prompt_tokens" | "completion_tokens" | "total_tokens" | "latency_ms" | "status" | "error_message" | "input_preview" | "output_preview" | "retrieved_chunk_ids" | "metadata" | "created_at", ExtArgs["result"]["ai_runs"]>;
export type ai_runsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    job_analyses?: boolean | Prisma.ai_runs$job_analysesArgs<ExtArgs>;
    _count?: boolean | Prisma.Ai_runsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ai_runsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type ai_runsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $ai_runsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ai_runs";
    objects: {
        users: Prisma.$usersPayload<ExtArgs>;
        job_analyses: Prisma.$job_analysesPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        user_id: string;
        run_type: string;
        model: string;
        prompt_tokens: number | null;
        completion_tokens: number | null;
        total_tokens: number | null;
        latency_ms: number | null;
        status: string;
        error_message: string | null;
        input_preview: string | null;
        output_preview: string | null;
        retrieved_chunk_ids: string[];
        metadata: runtime.JsonValue;
        created_at: Date;
    }, ExtArgs["result"]["ai_runs"]>;
    composites: {};
};
export type ai_runsGetPayload<S extends boolean | null | undefined | ai_runsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ai_runsPayload, S>;
export type ai_runsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ai_runsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Ai_runsCountAggregateInputType | true;
};
export interface ai_runsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ai_runs'];
        meta: {
            name: 'ai_runs';
        };
    };
    findUnique<T extends ai_runsFindUniqueArgs>(args: Prisma.SelectSubset<T, ai_runsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ai_runsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ai_runsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ai_runsFindFirstArgs>(args?: Prisma.SelectSubset<T, ai_runsFindFirstArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ai_runsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ai_runsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ai_runsFindManyArgs>(args?: Prisma.SelectSubset<T, ai_runsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ai_runsCreateArgs>(args: Prisma.SelectSubset<T, ai_runsCreateArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ai_runsCreateManyArgs>(args?: Prisma.SelectSubset<T, ai_runsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ai_runsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ai_runsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ai_runsDeleteArgs>(args: Prisma.SelectSubset<T, ai_runsDeleteArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ai_runsUpdateArgs>(args: Prisma.SelectSubset<T, ai_runsUpdateArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ai_runsDeleteManyArgs>(args?: Prisma.SelectSubset<T, ai_runsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ai_runsUpdateManyArgs>(args: Prisma.SelectSubset<T, ai_runsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ai_runsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ai_runsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ai_runsUpsertArgs>(args: Prisma.SelectSubset<T, ai_runsUpsertArgs<ExtArgs>>): Prisma.Prisma__ai_runsClient<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ai_runsCountArgs>(args?: Prisma.Subset<T, ai_runsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Ai_runsCountAggregateOutputType> : number>;
    aggregate<T extends Ai_runsAggregateArgs>(args: Prisma.Subset<T, Ai_runsAggregateArgs>): Prisma.PrismaPromise<GetAi_runsAggregateType<T>>;
    groupBy<T extends ai_runsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ai_runsGroupByArgs['orderBy'];
    } : {
        orderBy?: ai_runsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ai_runsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAi_runsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ai_runsFieldRefs;
}
export interface Prisma__ai_runsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    job_analyses<T extends Prisma.ai_runs$job_analysesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ai_runs$job_analysesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ai_runsFieldRefs {
    readonly id: Prisma.FieldRef<"ai_runs", 'String'>;
    readonly user_id: Prisma.FieldRef<"ai_runs", 'String'>;
    readonly run_type: Prisma.FieldRef<"ai_runs", 'String'>;
    readonly model: Prisma.FieldRef<"ai_runs", 'String'>;
    readonly prompt_tokens: Prisma.FieldRef<"ai_runs", 'Int'>;
    readonly completion_tokens: Prisma.FieldRef<"ai_runs", 'Int'>;
    readonly total_tokens: Prisma.FieldRef<"ai_runs", 'Int'>;
    readonly latency_ms: Prisma.FieldRef<"ai_runs", 'Int'>;
    readonly status: Prisma.FieldRef<"ai_runs", 'String'>;
    readonly error_message: Prisma.FieldRef<"ai_runs", 'String'>;
    readonly input_preview: Prisma.FieldRef<"ai_runs", 'String'>;
    readonly output_preview: Prisma.FieldRef<"ai_runs", 'String'>;
    readonly retrieved_chunk_ids: Prisma.FieldRef<"ai_runs", 'String[]'>;
    readonly metadata: Prisma.FieldRef<"ai_runs", 'Json'>;
    readonly created_at: Prisma.FieldRef<"ai_runs", 'DateTime'>;
}
export type ai_runsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    where: Prisma.ai_runsWhereUniqueInput;
};
export type ai_runsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    where: Prisma.ai_runsWhereUniqueInput;
};
export type ai_runsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    where?: Prisma.ai_runsWhereInput;
    orderBy?: Prisma.ai_runsOrderByWithRelationInput | Prisma.ai_runsOrderByWithRelationInput[];
    cursor?: Prisma.ai_runsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ai_runsScalarFieldEnum | Prisma.Ai_runsScalarFieldEnum[];
};
export type ai_runsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    where?: Prisma.ai_runsWhereInput;
    orderBy?: Prisma.ai_runsOrderByWithRelationInput | Prisma.ai_runsOrderByWithRelationInput[];
    cursor?: Prisma.ai_runsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ai_runsScalarFieldEnum | Prisma.Ai_runsScalarFieldEnum[];
};
export type ai_runsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    where?: Prisma.ai_runsWhereInput;
    orderBy?: Prisma.ai_runsOrderByWithRelationInput | Prisma.ai_runsOrderByWithRelationInput[];
    cursor?: Prisma.ai_runsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ai_runsScalarFieldEnum | Prisma.Ai_runsScalarFieldEnum[];
};
export type ai_runsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ai_runsCreateInput, Prisma.ai_runsUncheckedCreateInput>;
};
export type ai_runsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ai_runsCreateManyInput | Prisma.ai_runsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ai_runsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    data: Prisma.ai_runsCreateManyInput | Prisma.ai_runsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ai_runsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ai_runsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ai_runsUpdateInput, Prisma.ai_runsUncheckedUpdateInput>;
    where: Prisma.ai_runsWhereUniqueInput;
};
export type ai_runsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ai_runsUpdateManyMutationInput, Prisma.ai_runsUncheckedUpdateManyInput>;
    where?: Prisma.ai_runsWhereInput;
    limit?: number;
};
export type ai_runsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ai_runsUpdateManyMutationInput, Prisma.ai_runsUncheckedUpdateManyInput>;
    where?: Prisma.ai_runsWhereInput;
    limit?: number;
    include?: Prisma.ai_runsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ai_runsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    where: Prisma.ai_runsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ai_runsCreateInput, Prisma.ai_runsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ai_runsUpdateInput, Prisma.ai_runsUncheckedUpdateInput>;
};
export type ai_runsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
    where: Prisma.ai_runsWhereUniqueInput;
};
export type ai_runsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ai_runsWhereInput;
    limit?: number;
};
export type ai_runs$job_analysesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ai_runsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ai_runsSelect<ExtArgs> | null;
    omit?: Prisma.ai_runsOmit<ExtArgs> | null;
    include?: Prisma.ai_runsInclude<ExtArgs> | null;
};
