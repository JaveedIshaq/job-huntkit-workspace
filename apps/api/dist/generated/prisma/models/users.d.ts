import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type usersModel = runtime.Types.Result.DefaultSelection<Prisma.$usersPayload>;
export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null;
    _min: UsersMinAggregateOutputType | null;
    _max: UsersMaxAggregateOutputType | null;
};
export type UsersMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password_hash: string | null;
    display_name: string | null;
    headline: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type UsersMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password_hash: string | null;
    display_name: string | null;
    headline: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type UsersCountAggregateOutputType = {
    id: number;
    email: number;
    password_hash: number;
    display_name: number;
    headline: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type UsersMinAggregateInputType = {
    id?: true;
    email?: true;
    password_hash?: true;
    display_name?: true;
    headline?: true;
    created_at?: true;
    updated_at?: true;
};
export type UsersMaxAggregateInputType = {
    id?: true;
    email?: true;
    password_hash?: true;
    display_name?: true;
    headline?: true;
    created_at?: true;
    updated_at?: true;
};
export type UsersCountAggregateInputType = {
    id?: true;
    email?: true;
    password_hash?: true;
    display_name?: true;
    headline?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type UsersAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput | Prisma.usersOrderByWithRelationInput[];
    cursor?: Prisma.usersWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UsersCountAggregateInputType;
    _min?: UsersMinAggregateInputType;
    _max?: UsersMaxAggregateInputType;
};
export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
    [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUsers[P]> : Prisma.GetScalarType<T[P], AggregateUsers[P]>;
};
export type usersGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithAggregationInput | Prisma.usersOrderByWithAggregationInput[];
    by: Prisma.UsersScalarFieldEnum[] | Prisma.UsersScalarFieldEnum;
    having?: Prisma.usersScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsersCountAggregateInputType | true;
    _min?: UsersMinAggregateInputType;
    _max?: UsersMaxAggregateInputType;
};
export type UsersGroupByOutputType = {
    id: string;
    email: string;
    password_hash: string | null;
    display_name: string | null;
    headline: string | null;
    created_at: Date;
    updated_at: Date;
    _count: UsersCountAggregateOutputType | null;
    _min: UsersMinAggregateOutputType | null;
    _max: UsersMaxAggregateOutputType | null;
};
export type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UsersGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UsersGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UsersGroupByOutputType[P]>;
}>>;
export type usersWhereInput = {
    AND?: Prisma.usersWhereInput | Prisma.usersWhereInput[];
    OR?: Prisma.usersWhereInput[];
    NOT?: Prisma.usersWhereInput | Prisma.usersWhereInput[];
    id?: Prisma.UuidFilter<"users"> | string;
    email?: Prisma.StringFilter<"users"> | string;
    password_hash?: Prisma.StringNullableFilter<"users"> | string | null;
    display_name?: Prisma.StringNullableFilter<"users"> | string | null;
    headline?: Prisma.StringNullableFilter<"users"> | string | null;
    created_at?: Prisma.DateTimeFilter<"users"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"users"> | Date | string;
    ai_runs?: Prisma.Ai_runsListRelationFilter;
    job_analyses?: Prisma.Job_analysesListRelationFilter;
    jobs?: Prisma.JobsListRelationFilter;
    profile_chunks?: Prisma.Profile_chunksListRelationFilter;
    profile_sources?: Prisma.Profile_sourcesListRelationFilter;
};
export type usersOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrderInput | Prisma.SortOrder;
    display_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    headline?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    ai_runs?: Prisma.ai_runsOrderByRelationAggregateInput;
    job_analyses?: Prisma.job_analysesOrderByRelationAggregateInput;
    jobs?: Prisma.jobsOrderByRelationAggregateInput;
    profile_chunks?: Prisma.profile_chunksOrderByRelationAggregateInput;
    profile_sources?: Prisma.profile_sourcesOrderByRelationAggregateInput;
};
export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.usersWhereInput | Prisma.usersWhereInput[];
    OR?: Prisma.usersWhereInput[];
    NOT?: Prisma.usersWhereInput | Prisma.usersWhereInput[];
    password_hash?: Prisma.StringNullableFilter<"users"> | string | null;
    display_name?: Prisma.StringNullableFilter<"users"> | string | null;
    headline?: Prisma.StringNullableFilter<"users"> | string | null;
    created_at?: Prisma.DateTimeFilter<"users"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"users"> | Date | string;
    ai_runs?: Prisma.Ai_runsListRelationFilter;
    job_analyses?: Prisma.Job_analysesListRelationFilter;
    jobs?: Prisma.JobsListRelationFilter;
    profile_chunks?: Prisma.Profile_chunksListRelationFilter;
    profile_sources?: Prisma.Profile_sourcesListRelationFilter;
}, "id" | "email">;
export type usersOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrderInput | Prisma.SortOrder;
    display_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    headline?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.usersCountOrderByAggregateInput;
    _max?: Prisma.usersMaxOrderByAggregateInput;
    _min?: Prisma.usersMinOrderByAggregateInput;
};
export type usersScalarWhereWithAggregatesInput = {
    AND?: Prisma.usersScalarWhereWithAggregatesInput | Prisma.usersScalarWhereWithAggregatesInput[];
    OR?: Prisma.usersScalarWhereWithAggregatesInput[];
    NOT?: Prisma.usersScalarWhereWithAggregatesInput | Prisma.usersScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"users"> | string;
    email?: Prisma.StringWithAggregatesFilter<"users"> | string;
    password_hash?: Prisma.StringNullableWithAggregatesFilter<"users"> | string | null;
    display_name?: Prisma.StringNullableWithAggregatesFilter<"users"> | string | null;
    headline?: Prisma.StringNullableWithAggregatesFilter<"users"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"users"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"users"> | Date | string;
};
export type usersCreateInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsCreateNestedManyWithoutUsersInput;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsUncheckedCreateNestedManyWithoutUsersInput;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsUncheckedCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksUncheckedCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUpdateManyWithoutUsersNestedInput;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUncheckedUpdateManyWithoutUsersNestedInput;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUncheckedUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUncheckedUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateManyInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type usersUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type usersUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsersScalarRelationFilter = {
    is?: Prisma.usersWhereInput;
    isNot?: Prisma.usersWhereInput;
};
export type usersCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    display_name?: Prisma.SortOrder;
    headline?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type usersMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    display_name?: Prisma.SortOrder;
    headline?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type usersMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    display_name?: Prisma.SortOrder;
    headline?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type usersCreateNestedOneWithoutAi_runsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutAi_runsInput, Prisma.usersUncheckedCreateWithoutAi_runsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutAi_runsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutAi_runsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutAi_runsInput, Prisma.usersUncheckedCreateWithoutAi_runsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutAi_runsInput;
    upsert?: Prisma.usersUpsertWithoutAi_runsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutAi_runsInput, Prisma.usersUpdateWithoutAi_runsInput>, Prisma.usersUncheckedUpdateWithoutAi_runsInput>;
};
export type usersCreateNestedOneWithoutJob_analysesInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutJob_analysesInput, Prisma.usersUncheckedCreateWithoutJob_analysesInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutJob_analysesInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutJob_analysesNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutJob_analysesInput, Prisma.usersUncheckedCreateWithoutJob_analysesInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutJob_analysesInput;
    upsert?: Prisma.usersUpsertWithoutJob_analysesInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutJob_analysesInput, Prisma.usersUpdateWithoutJob_analysesInput>, Prisma.usersUncheckedUpdateWithoutJob_analysesInput>;
};
export type usersCreateNestedOneWithoutJobsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutJobsInput, Prisma.usersUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutJobsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutJobsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutJobsInput, Prisma.usersUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutJobsInput;
    upsert?: Prisma.usersUpsertWithoutJobsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutJobsInput, Prisma.usersUpdateWithoutJobsInput>, Prisma.usersUncheckedUpdateWithoutJobsInput>;
};
export type usersUpdateOneRequiredWithoutProfile_chunksNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutProfile_chunksInput, Prisma.usersUncheckedCreateWithoutProfile_chunksInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutProfile_chunksInput;
    upsert?: Prisma.usersUpsertWithoutProfile_chunksInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutProfile_chunksInput, Prisma.usersUpdateWithoutProfile_chunksInput>, Prisma.usersUncheckedUpdateWithoutProfile_chunksInput>;
};
export type usersCreateNestedOneWithoutProfile_sourcesInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutProfile_sourcesInput, Prisma.usersUncheckedCreateWithoutProfile_sourcesInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutProfile_sourcesInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutProfile_sourcesNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutProfile_sourcesInput, Prisma.usersUncheckedCreateWithoutProfile_sourcesInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutProfile_sourcesInput;
    upsert?: Prisma.usersUpsertWithoutProfile_sourcesInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutProfile_sourcesInput, Prisma.usersUpdateWithoutProfile_sourcesInput>, Prisma.usersUncheckedUpdateWithoutProfile_sourcesInput>;
};
export type usersCreateWithoutAi_runsInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutAi_runsInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsUncheckedCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksUncheckedCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutAi_runsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutAi_runsInput, Prisma.usersUncheckedCreateWithoutAi_runsInput>;
};
export type usersUpsertWithoutAi_runsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutAi_runsInput, Prisma.usersUncheckedUpdateWithoutAi_runsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutAi_runsInput, Prisma.usersUncheckedCreateWithoutAi_runsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutAi_runsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutAi_runsInput, Prisma.usersUncheckedUpdateWithoutAi_runsInput>;
};
export type usersUpdateWithoutAi_runsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutAi_runsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUncheckedUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUncheckedUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutJob_analysesInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutJob_analysesInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsUncheckedCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsUncheckedCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksUncheckedCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutJob_analysesInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutJob_analysesInput, Prisma.usersUncheckedCreateWithoutJob_analysesInput>;
};
export type usersUpsertWithoutJob_analysesInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutJob_analysesInput, Prisma.usersUncheckedUpdateWithoutJob_analysesInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutJob_analysesInput, Prisma.usersUncheckedCreateWithoutJob_analysesInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutJob_analysesInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutJob_analysesInput, Prisma.usersUncheckedUpdateWithoutJob_analysesInput>;
};
export type usersUpdateWithoutJob_analysesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutJob_analysesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUncheckedUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUncheckedUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUncheckedUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutJobsInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsCreateNestedManyWithoutUsersInput;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutJobsInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsUncheckedCreateNestedManyWithoutUsersInput;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksUncheckedCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutJobsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutJobsInput, Prisma.usersUncheckedCreateWithoutJobsInput>;
};
export type usersUpsertWithoutJobsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutJobsInput, Prisma.usersUncheckedUpdateWithoutJobsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutJobsInput, Prisma.usersUncheckedCreateWithoutJobsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutJobsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutJobsInput, Prisma.usersUncheckedUpdateWithoutJobsInput>;
};
export type usersUpdateWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUpdateManyWithoutUsersNestedInput;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUncheckedUpdateManyWithoutUsersNestedInput;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUncheckedUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutProfile_chunksInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsCreateNestedManyWithoutUsersInput;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutProfile_chunksInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsUncheckedCreateNestedManyWithoutUsersInput;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsUncheckedCreateNestedManyWithoutUsersInput;
    profile_sources?: Prisma.profile_sourcesUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutProfile_chunksInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutProfile_chunksInput, Prisma.usersUncheckedCreateWithoutProfile_chunksInput>;
};
export type usersUpsertWithoutProfile_chunksInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutProfile_chunksInput, Prisma.usersUncheckedUpdateWithoutProfile_chunksInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutProfile_chunksInput, Prisma.usersUncheckedCreateWithoutProfile_chunksInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutProfile_chunksInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutProfile_chunksInput, Prisma.usersUncheckedUpdateWithoutProfile_chunksInput>;
};
export type usersUpdateWithoutProfile_chunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUpdateManyWithoutUsersNestedInput;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutProfile_chunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUncheckedUpdateManyWithoutUsersNestedInput;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUncheckedUpdateManyWithoutUsersNestedInput;
    profile_sources?: Prisma.profile_sourcesUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutProfile_sourcesInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsCreateNestedManyWithoutUsersInput;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutProfile_sourcesInput = {
    id?: string;
    email: string;
    password_hash?: string | null;
    display_name?: string | null;
    headline?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    ai_runs?: Prisma.ai_runsUncheckedCreateNestedManyWithoutUsersInput;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutUsersInput;
    jobs?: Prisma.jobsUncheckedCreateNestedManyWithoutUsersInput;
    profile_chunks?: Prisma.profile_chunksUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutProfile_sourcesInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutProfile_sourcesInput, Prisma.usersUncheckedCreateWithoutProfile_sourcesInput>;
};
export type usersUpsertWithoutProfile_sourcesInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutProfile_sourcesInput, Prisma.usersUncheckedUpdateWithoutProfile_sourcesInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutProfile_sourcesInput, Prisma.usersUncheckedCreateWithoutProfile_sourcesInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutProfile_sourcesInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutProfile_sourcesInput, Prisma.usersUncheckedUpdateWithoutProfile_sourcesInput>;
};
export type usersUpdateWithoutProfile_sourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUpdateManyWithoutUsersNestedInput;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutProfile_sourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    display_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ai_runs?: Prisma.ai_runsUncheckedUpdateManyWithoutUsersNestedInput;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutUsersNestedInput;
    jobs?: Prisma.jobsUncheckedUpdateManyWithoutUsersNestedInput;
    profile_chunks?: Prisma.profile_chunksUncheckedUpdateManyWithoutUsersNestedInput;
};
export type UsersCountOutputType = {
    ai_runs: number;
    job_analyses: number;
    jobs: number;
    profile_chunks: number;
    profile_sources: number;
};
export type UsersCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ai_runs?: boolean | UsersCountOutputTypeCountAi_runsArgs;
    job_analyses?: boolean | UsersCountOutputTypeCountJob_analysesArgs;
    jobs?: boolean | UsersCountOutputTypeCountJobsArgs;
    profile_chunks?: boolean | UsersCountOutputTypeCountProfile_chunksArgs;
    profile_sources?: boolean | UsersCountOutputTypeCountProfile_sourcesArgs;
};
export type UsersCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsersCountOutputTypeSelect<ExtArgs> | null;
};
export type UsersCountOutputTypeCountAi_runsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ai_runsWhereInput;
};
export type UsersCountOutputTypeCountJob_analysesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_analysesWhereInput;
};
export type UsersCountOutputTypeCountJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.jobsWhereInput;
};
export type UsersCountOutputTypeCountProfile_chunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_chunksWhereInput;
};
export type UsersCountOutputTypeCountProfile_sourcesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_sourcesWhereInput;
};
export type usersSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password_hash?: boolean;
    display_name?: boolean;
    headline?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    ai_runs?: boolean | Prisma.users$ai_runsArgs<ExtArgs>;
    job_analyses?: boolean | Prisma.users$job_analysesArgs<ExtArgs>;
    jobs?: boolean | Prisma.users$jobsArgs<ExtArgs>;
    profile_chunks?: boolean | Prisma.users$profile_chunksArgs<ExtArgs>;
    profile_sources?: boolean | Prisma.users$profile_sourcesArgs<ExtArgs>;
    _count?: boolean | Prisma.UsersCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["users"]>;
export type usersSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password_hash?: boolean;
    display_name?: boolean;
    headline?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["users"]>;
export type usersSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password_hash?: boolean;
    display_name?: boolean;
    headline?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["users"]>;
export type usersSelectScalar = {
    id?: boolean;
    email?: boolean;
    password_hash?: boolean;
    display_name?: boolean;
    headline?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type usersOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password_hash" | "display_name" | "headline" | "created_at" | "updated_at", ExtArgs["result"]["users"]>;
export type usersInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ai_runs?: boolean | Prisma.users$ai_runsArgs<ExtArgs>;
    job_analyses?: boolean | Prisma.users$job_analysesArgs<ExtArgs>;
    jobs?: boolean | Prisma.users$jobsArgs<ExtArgs>;
    profile_chunks?: boolean | Prisma.users$profile_chunksArgs<ExtArgs>;
    profile_sources?: boolean | Prisma.users$profile_sourcesArgs<ExtArgs>;
    _count?: boolean | Prisma.UsersCountOutputTypeDefaultArgs<ExtArgs>;
};
export type usersIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type usersIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $usersPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "users";
    objects: {
        ai_runs: Prisma.$ai_runsPayload<ExtArgs>[];
        job_analyses: Prisma.$job_analysesPayload<ExtArgs>[];
        jobs: Prisma.$jobsPayload<ExtArgs>[];
        profile_chunks: Prisma.$profile_chunksPayload<ExtArgs>[];
        profile_sources: Prisma.$profile_sourcesPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password_hash: string | null;
        display_name: string | null;
        headline: string | null;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["users"]>;
    composites: {};
};
export type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$usersPayload, S>;
export type usersCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UsersCountAggregateInputType | true;
};
export interface usersDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['users'];
        meta: {
            name: 'users';
        };
    };
    findUnique<T extends usersFindUniqueArgs>(args: Prisma.SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends usersFindFirstArgs>(args?: Prisma.SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends usersFindManyArgs>(args?: Prisma.SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends usersCreateArgs>(args: Prisma.SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends usersCreateManyArgs>(args?: Prisma.SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends usersDeleteArgs>(args: Prisma.SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends usersUpdateArgs>(args: Prisma.SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends usersDeleteManyArgs>(args?: Prisma.SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends usersUpdateManyArgs>(args: Prisma.SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends usersUpsertArgs>(args: Prisma.SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends usersCountArgs>(args?: Prisma.Subset<T, usersCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UsersCountAggregateOutputType> : number>;
    aggregate<T extends UsersAggregateArgs>(args: Prisma.Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>;
    groupBy<T extends usersGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: usersGroupByArgs['orderBy'];
    } : {
        orderBy?: usersGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: usersFieldRefs;
}
export interface Prisma__usersClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ai_runs<T extends Prisma.users$ai_runsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$ai_runsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ai_runsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    job_analyses<T extends Prisma.users$job_analysesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$job_analysesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    jobs<T extends Prisma.users$jobsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    profile_chunks<T extends Prisma.users$profile_chunksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$profile_chunksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    profile_sources<T extends Prisma.users$profile_sourcesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$profile_sourcesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface usersFieldRefs {
    readonly id: Prisma.FieldRef<"users", 'String'>;
    readonly email: Prisma.FieldRef<"users", 'String'>;
    readonly password_hash: Prisma.FieldRef<"users", 'String'>;
    readonly display_name: Prisma.FieldRef<"users", 'String'>;
    readonly headline: Prisma.FieldRef<"users", 'String'>;
    readonly created_at: Prisma.FieldRef<"users", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"users", 'DateTime'>;
}
export type usersFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where: Prisma.usersWhereUniqueInput;
};
export type usersFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where: Prisma.usersWhereUniqueInput;
};
export type usersFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput | Prisma.usersOrderByWithRelationInput[];
    cursor?: Prisma.usersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsersScalarFieldEnum | Prisma.UsersScalarFieldEnum[];
};
export type usersFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput | Prisma.usersOrderByWithRelationInput[];
    cursor?: Prisma.usersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsersScalarFieldEnum | Prisma.UsersScalarFieldEnum[];
};
export type usersFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput | Prisma.usersOrderByWithRelationInput[];
    cursor?: Prisma.usersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsersScalarFieldEnum | Prisma.UsersScalarFieldEnum[];
};
export type usersCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usersCreateInput, Prisma.usersUncheckedCreateInput>;
};
export type usersCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.usersCreateManyInput | Prisma.usersCreateManyInput[];
    skipDuplicates?: boolean;
};
export type usersCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    data: Prisma.usersCreateManyInput | Prisma.usersCreateManyInput[];
    skipDuplicates?: boolean;
};
export type usersUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usersUpdateInput, Prisma.usersUncheckedUpdateInput>;
    where: Prisma.usersWhereUniqueInput;
};
export type usersUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.usersUpdateManyMutationInput, Prisma.usersUncheckedUpdateManyInput>;
    where?: Prisma.usersWhereInput;
    limit?: number;
};
export type usersUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usersUpdateManyMutationInput, Prisma.usersUncheckedUpdateManyInput>;
    where?: Prisma.usersWhereInput;
    limit?: number;
};
export type usersUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateInput, Prisma.usersUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.usersUpdateInput, Prisma.usersUncheckedUpdateInput>;
};
export type usersDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where: Prisma.usersWhereUniqueInput;
};
export type usersDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usersWhereInput;
    limit?: number;
};
export type users$ai_runsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type users$job_analysesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type users$jobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    include?: Prisma.jobsInclude<ExtArgs> | null;
    where?: Prisma.jobsWhereInput;
    orderBy?: Prisma.jobsOrderByWithRelationInput | Prisma.jobsOrderByWithRelationInput[];
    cursor?: Prisma.jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobsScalarFieldEnum | Prisma.JobsScalarFieldEnum[];
};
export type users$profile_chunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_chunksSelect<ExtArgs> | null;
    omit?: Prisma.profile_chunksOmit<ExtArgs> | null;
    include?: Prisma.profile_chunksInclude<ExtArgs> | null;
    where?: Prisma.profile_chunksWhereInput;
    orderBy?: Prisma.profile_chunksOrderByWithRelationInput | Prisma.profile_chunksOrderByWithRelationInput[];
    cursor?: Prisma.profile_chunksWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Profile_chunksScalarFieldEnum | Prisma.Profile_chunksScalarFieldEnum[];
};
export type users$profile_sourcesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelect<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    include?: Prisma.profile_sourcesInclude<ExtArgs> | null;
    where?: Prisma.profile_sourcesWhereInput;
    orderBy?: Prisma.profile_sourcesOrderByWithRelationInput | Prisma.profile_sourcesOrderByWithRelationInput[];
    cursor?: Prisma.profile_sourcesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Profile_sourcesScalarFieldEnum | Prisma.Profile_sourcesScalarFieldEnum[];
};
export type usersDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
};
