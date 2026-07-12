import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type jobsModel = runtime.Types.Result.DefaultSelection<Prisma.$jobsPayload>;
export type AggregateJobs = {
    _count: JobsCountAggregateOutputType | null;
    _min: JobsMinAggregateOutputType | null;
    _max: JobsMaxAggregateOutputType | null;
};
export type JobsMinAggregateOutputType = {
    id: string | null;
    user_id: string | null;
    company: string | null;
    role_title: string | null;
    job_url: string | null;
    location: string | null;
    status: string | null;
    jd_text: string | null;
    notes: string | null;
    applied_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type JobsMaxAggregateOutputType = {
    id: string | null;
    user_id: string | null;
    company: string | null;
    role_title: string | null;
    job_url: string | null;
    location: string | null;
    status: string | null;
    jd_text: string | null;
    notes: string | null;
    applied_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type JobsCountAggregateOutputType = {
    id: number;
    user_id: number;
    company: number;
    role_title: number;
    job_url: number;
    location: number;
    status: number;
    jd_text: number;
    notes: number;
    applied_at: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type JobsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    company?: true;
    role_title?: true;
    job_url?: true;
    location?: true;
    status?: true;
    jd_text?: true;
    notes?: true;
    applied_at?: true;
    created_at?: true;
    updated_at?: true;
};
export type JobsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    company?: true;
    role_title?: true;
    job_url?: true;
    location?: true;
    status?: true;
    jd_text?: true;
    notes?: true;
    applied_at?: true;
    created_at?: true;
    updated_at?: true;
};
export type JobsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    company?: true;
    role_title?: true;
    job_url?: true;
    location?: true;
    status?: true;
    jd_text?: true;
    notes?: true;
    applied_at?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type JobsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.jobsWhereInput;
    orderBy?: Prisma.jobsOrderByWithRelationInput | Prisma.jobsOrderByWithRelationInput[];
    cursor?: Prisma.jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobsCountAggregateInputType;
    _min?: JobsMinAggregateInputType;
    _max?: JobsMaxAggregateInputType;
};
export type GetJobsAggregateType<T extends JobsAggregateArgs> = {
    [P in keyof T & keyof AggregateJobs]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobs[P]> : Prisma.GetScalarType<T[P], AggregateJobs[P]>;
};
export type jobsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.jobsWhereInput;
    orderBy?: Prisma.jobsOrderByWithAggregationInput | Prisma.jobsOrderByWithAggregationInput[];
    by: Prisma.JobsScalarFieldEnum[] | Prisma.JobsScalarFieldEnum;
    having?: Prisma.jobsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobsCountAggregateInputType | true;
    _min?: JobsMinAggregateInputType;
    _max?: JobsMaxAggregateInputType;
};
export type JobsGroupByOutputType = {
    id: string;
    user_id: string;
    company: string;
    role_title: string;
    job_url: string | null;
    location: string | null;
    status: string;
    jd_text: string;
    notes: string | null;
    applied_at: Date | null;
    created_at: Date;
    updated_at: Date;
    _count: JobsCountAggregateOutputType | null;
    _min: JobsMinAggregateOutputType | null;
    _max: JobsMaxAggregateOutputType | null;
};
export type GetJobsGroupByPayload<T extends jobsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobsGroupByOutputType[P]>;
}>>;
export type jobsWhereInput = {
    AND?: Prisma.jobsWhereInput | Prisma.jobsWhereInput[];
    OR?: Prisma.jobsWhereInput[];
    NOT?: Prisma.jobsWhereInput | Prisma.jobsWhereInput[];
    id?: Prisma.UuidFilter<"jobs"> | string;
    user_id?: Prisma.UuidFilter<"jobs"> | string;
    company?: Prisma.StringFilter<"jobs"> | string;
    role_title?: Prisma.StringFilter<"jobs"> | string;
    job_url?: Prisma.StringNullableFilter<"jobs"> | string | null;
    location?: Prisma.StringNullableFilter<"jobs"> | string | null;
    status?: Prisma.StringFilter<"jobs"> | string;
    jd_text?: Prisma.StringFilter<"jobs"> | string;
    notes?: Prisma.StringNullableFilter<"jobs"> | string | null;
    applied_at?: Prisma.DateTimeNullableFilter<"jobs"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"jobs"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"jobs"> | Date | string;
    job_analyses?: Prisma.Job_analysesListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type jobsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    role_title?: Prisma.SortOrder;
    job_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    jd_text?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    applied_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    job_analyses?: Prisma.job_analysesOrderByRelationAggregateInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type jobsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.jobsWhereInput | Prisma.jobsWhereInput[];
    OR?: Prisma.jobsWhereInput[];
    NOT?: Prisma.jobsWhereInput | Prisma.jobsWhereInput[];
    user_id?: Prisma.UuidFilter<"jobs"> | string;
    company?: Prisma.StringFilter<"jobs"> | string;
    role_title?: Prisma.StringFilter<"jobs"> | string;
    job_url?: Prisma.StringNullableFilter<"jobs"> | string | null;
    location?: Prisma.StringNullableFilter<"jobs"> | string | null;
    status?: Prisma.StringFilter<"jobs"> | string;
    jd_text?: Prisma.StringFilter<"jobs"> | string;
    notes?: Prisma.StringNullableFilter<"jobs"> | string | null;
    applied_at?: Prisma.DateTimeNullableFilter<"jobs"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"jobs"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"jobs"> | Date | string;
    job_analyses?: Prisma.Job_analysesListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type jobsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    role_title?: Prisma.SortOrder;
    job_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    jd_text?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    applied_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.jobsCountOrderByAggregateInput;
    _max?: Prisma.jobsMaxOrderByAggregateInput;
    _min?: Prisma.jobsMinOrderByAggregateInput;
};
export type jobsScalarWhereWithAggregatesInput = {
    AND?: Prisma.jobsScalarWhereWithAggregatesInput | Prisma.jobsScalarWhereWithAggregatesInput[];
    OR?: Prisma.jobsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.jobsScalarWhereWithAggregatesInput | Prisma.jobsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"jobs"> | string;
    user_id?: Prisma.UuidWithAggregatesFilter<"jobs"> | string;
    company?: Prisma.StringWithAggregatesFilter<"jobs"> | string;
    role_title?: Prisma.StringWithAggregatesFilter<"jobs"> | string;
    job_url?: Prisma.StringNullableWithAggregatesFilter<"jobs"> | string | null;
    location?: Prisma.StringNullableWithAggregatesFilter<"jobs"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"jobs"> | string;
    jd_text?: Prisma.StringWithAggregatesFilter<"jobs"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"jobs"> | string | null;
    applied_at?: Prisma.DateTimeNullableWithAggregatesFilter<"jobs"> | Date | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"jobs"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"jobs"> | Date | string;
};
export type jobsCreateInput = {
    id?: string;
    company: string;
    role_title: string;
    job_url?: string | null;
    location?: string | null;
    status?: string;
    jd_text: string;
    notes?: string | null;
    applied_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutJobsInput;
    users: Prisma.usersCreateNestedOneWithoutJobsInput;
};
export type jobsUncheckedCreateInput = {
    id?: string;
    user_id: string;
    company: string;
    role_title: string;
    job_url?: string | null;
    location?: string | null;
    status?: string;
    jd_text: string;
    notes?: string | null;
    applied_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutJobsInput;
};
export type jobsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutJobsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutJobsNestedInput;
};
export type jobsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutJobsNestedInput;
};
export type jobsCreateManyInput = {
    id?: string;
    user_id: string;
    company: string;
    role_title: string;
    job_url?: string | null;
    location?: string | null;
    status?: string;
    jd_text: string;
    notes?: string | null;
    applied_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type jobsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type jobsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobsScalarRelationFilter = {
    is?: Prisma.jobsWhereInput;
    isNot?: Prisma.jobsWhereInput;
};
export type jobsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    role_title?: Prisma.SortOrder;
    job_url?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    jd_text?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    applied_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type jobsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    role_title?: Prisma.SortOrder;
    job_url?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    jd_text?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    applied_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type jobsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    role_title?: Prisma.SortOrder;
    job_url?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    jd_text?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    applied_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type JobsListRelationFilter = {
    every?: Prisma.jobsWhereInput;
    some?: Prisma.jobsWhereInput;
    none?: Prisma.jobsWhereInput;
};
export type jobsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type jobsCreateNestedOneWithoutJob_analysesInput = {
    create?: Prisma.XOR<Prisma.jobsCreateWithoutJob_analysesInput, Prisma.jobsUncheckedCreateWithoutJob_analysesInput>;
    connectOrCreate?: Prisma.jobsCreateOrConnectWithoutJob_analysesInput;
    connect?: Prisma.jobsWhereUniqueInput;
};
export type jobsUpdateOneRequiredWithoutJob_analysesNestedInput = {
    create?: Prisma.XOR<Prisma.jobsCreateWithoutJob_analysesInput, Prisma.jobsUncheckedCreateWithoutJob_analysesInput>;
    connectOrCreate?: Prisma.jobsCreateOrConnectWithoutJob_analysesInput;
    upsert?: Prisma.jobsUpsertWithoutJob_analysesInput;
    connect?: Prisma.jobsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.jobsUpdateToOneWithWhereWithoutJob_analysesInput, Prisma.jobsUpdateWithoutJob_analysesInput>, Prisma.jobsUncheckedUpdateWithoutJob_analysesInput>;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type jobsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.jobsCreateWithoutUsersInput, Prisma.jobsUncheckedCreateWithoutUsersInput> | Prisma.jobsCreateWithoutUsersInput[] | Prisma.jobsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.jobsCreateOrConnectWithoutUsersInput | Prisma.jobsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.jobsCreateManyUsersInputEnvelope;
    connect?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
};
export type jobsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.jobsCreateWithoutUsersInput, Prisma.jobsUncheckedCreateWithoutUsersInput> | Prisma.jobsCreateWithoutUsersInput[] | Prisma.jobsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.jobsCreateOrConnectWithoutUsersInput | Prisma.jobsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.jobsCreateManyUsersInputEnvelope;
    connect?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
};
export type jobsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.jobsCreateWithoutUsersInput, Prisma.jobsUncheckedCreateWithoutUsersInput> | Prisma.jobsCreateWithoutUsersInput[] | Prisma.jobsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.jobsCreateOrConnectWithoutUsersInput | Prisma.jobsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.jobsUpsertWithWhereUniqueWithoutUsersInput | Prisma.jobsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.jobsCreateManyUsersInputEnvelope;
    set?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
    disconnect?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
    delete?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
    connect?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
    update?: Prisma.jobsUpdateWithWhereUniqueWithoutUsersInput | Prisma.jobsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.jobsUpdateManyWithWhereWithoutUsersInput | Prisma.jobsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.jobsScalarWhereInput | Prisma.jobsScalarWhereInput[];
};
export type jobsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.jobsCreateWithoutUsersInput, Prisma.jobsUncheckedCreateWithoutUsersInput> | Prisma.jobsCreateWithoutUsersInput[] | Prisma.jobsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.jobsCreateOrConnectWithoutUsersInput | Prisma.jobsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.jobsUpsertWithWhereUniqueWithoutUsersInput | Prisma.jobsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.jobsCreateManyUsersInputEnvelope;
    set?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
    disconnect?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
    delete?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
    connect?: Prisma.jobsWhereUniqueInput | Prisma.jobsWhereUniqueInput[];
    update?: Prisma.jobsUpdateWithWhereUniqueWithoutUsersInput | Prisma.jobsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.jobsUpdateManyWithWhereWithoutUsersInput | Prisma.jobsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.jobsScalarWhereInput | Prisma.jobsScalarWhereInput[];
};
export type jobsCreateWithoutJob_analysesInput = {
    id?: string;
    company: string;
    role_title: string;
    job_url?: string | null;
    location?: string | null;
    status?: string;
    jd_text: string;
    notes?: string | null;
    applied_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutJobsInput;
};
export type jobsUncheckedCreateWithoutJob_analysesInput = {
    id?: string;
    user_id: string;
    company: string;
    role_title: string;
    job_url?: string | null;
    location?: string | null;
    status?: string;
    jd_text: string;
    notes?: string | null;
    applied_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type jobsCreateOrConnectWithoutJob_analysesInput = {
    where: Prisma.jobsWhereUniqueInput;
    create: Prisma.XOR<Prisma.jobsCreateWithoutJob_analysesInput, Prisma.jobsUncheckedCreateWithoutJob_analysesInput>;
};
export type jobsUpsertWithoutJob_analysesInput = {
    update: Prisma.XOR<Prisma.jobsUpdateWithoutJob_analysesInput, Prisma.jobsUncheckedUpdateWithoutJob_analysesInput>;
    create: Prisma.XOR<Prisma.jobsCreateWithoutJob_analysesInput, Prisma.jobsUncheckedCreateWithoutJob_analysesInput>;
    where?: Prisma.jobsWhereInput;
};
export type jobsUpdateToOneWithWhereWithoutJob_analysesInput = {
    where?: Prisma.jobsWhereInput;
    data: Prisma.XOR<Prisma.jobsUpdateWithoutJob_analysesInput, Prisma.jobsUncheckedUpdateWithoutJob_analysesInput>;
};
export type jobsUpdateWithoutJob_analysesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutJobsNestedInput;
};
export type jobsUncheckedUpdateWithoutJob_analysesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type jobsCreateWithoutUsersInput = {
    id?: string;
    company: string;
    role_title: string;
    job_url?: string | null;
    location?: string | null;
    status?: string;
    jd_text: string;
    notes?: string | null;
    applied_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    job_analyses?: Prisma.job_analysesCreateNestedManyWithoutJobsInput;
};
export type jobsUncheckedCreateWithoutUsersInput = {
    id?: string;
    company: string;
    role_title: string;
    job_url?: string | null;
    location?: string | null;
    status?: string;
    jd_text: string;
    notes?: string | null;
    applied_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    job_analyses?: Prisma.job_analysesUncheckedCreateNestedManyWithoutJobsInput;
};
export type jobsCreateOrConnectWithoutUsersInput = {
    where: Prisma.jobsWhereUniqueInput;
    create: Prisma.XOR<Prisma.jobsCreateWithoutUsersInput, Prisma.jobsUncheckedCreateWithoutUsersInput>;
};
export type jobsCreateManyUsersInputEnvelope = {
    data: Prisma.jobsCreateManyUsersInput | Prisma.jobsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type jobsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.jobsWhereUniqueInput;
    update: Prisma.XOR<Prisma.jobsUpdateWithoutUsersInput, Prisma.jobsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.jobsCreateWithoutUsersInput, Prisma.jobsUncheckedCreateWithoutUsersInput>;
};
export type jobsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.jobsWhereUniqueInput;
    data: Prisma.XOR<Prisma.jobsUpdateWithoutUsersInput, Prisma.jobsUncheckedUpdateWithoutUsersInput>;
};
export type jobsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.jobsScalarWhereInput;
    data: Prisma.XOR<Prisma.jobsUpdateManyMutationInput, Prisma.jobsUncheckedUpdateManyWithoutUsersInput>;
};
export type jobsScalarWhereInput = {
    AND?: Prisma.jobsScalarWhereInput | Prisma.jobsScalarWhereInput[];
    OR?: Prisma.jobsScalarWhereInput[];
    NOT?: Prisma.jobsScalarWhereInput | Prisma.jobsScalarWhereInput[];
    id?: Prisma.UuidFilter<"jobs"> | string;
    user_id?: Prisma.UuidFilter<"jobs"> | string;
    company?: Prisma.StringFilter<"jobs"> | string;
    role_title?: Prisma.StringFilter<"jobs"> | string;
    job_url?: Prisma.StringNullableFilter<"jobs"> | string | null;
    location?: Prisma.StringNullableFilter<"jobs"> | string | null;
    status?: Prisma.StringFilter<"jobs"> | string;
    jd_text?: Prisma.StringFilter<"jobs"> | string;
    notes?: Prisma.StringNullableFilter<"jobs"> | string | null;
    applied_at?: Prisma.DateTimeNullableFilter<"jobs"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"jobs"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"jobs"> | Date | string;
};
export type jobsCreateManyUsersInput = {
    id?: string;
    company: string;
    role_title: string;
    job_url?: string | null;
    location?: string | null;
    status?: string;
    jd_text: string;
    notes?: string | null;
    applied_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type jobsUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUpdateManyWithoutJobsNestedInput;
};
export type jobsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job_analyses?: Prisma.job_analysesUncheckedUpdateManyWithoutJobsNestedInput;
};
export type jobsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.StringFieldUpdateOperationsInput | string;
    role_title?: Prisma.StringFieldUpdateOperationsInput | string;
    job_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    jd_text?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    applied_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobsCountOutputType = {
    job_analyses: number;
};
export type JobsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job_analyses?: boolean | JobsCountOutputTypeCountJob_analysesArgs;
};
export type JobsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobsCountOutputTypeSelect<ExtArgs> | null;
};
export type JobsCountOutputTypeCountJob_analysesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_analysesWhereInput;
};
export type jobsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    company?: boolean;
    role_title?: boolean;
    job_url?: boolean;
    location?: boolean;
    status?: boolean;
    jd_text?: boolean;
    notes?: boolean;
    applied_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    job_analyses?: boolean | Prisma.jobs$job_analysesArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.JobsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobs"]>;
export type jobsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    company?: boolean;
    role_title?: boolean;
    job_url?: boolean;
    location?: boolean;
    status?: boolean;
    jd_text?: boolean;
    notes?: boolean;
    applied_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobs"]>;
export type jobsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    company?: boolean;
    role_title?: boolean;
    job_url?: boolean;
    location?: boolean;
    status?: boolean;
    jd_text?: boolean;
    notes?: boolean;
    applied_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobs"]>;
export type jobsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    company?: boolean;
    role_title?: boolean;
    job_url?: boolean;
    location?: boolean;
    status?: boolean;
    jd_text?: boolean;
    notes?: boolean;
    applied_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type jobsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "company" | "role_title" | "job_url" | "location" | "status" | "jd_text" | "notes" | "applied_at" | "created_at" | "updated_at", ExtArgs["result"]["jobs"]>;
export type jobsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job_analyses?: boolean | Prisma.jobs$job_analysesArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.JobsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type jobsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type jobsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $jobsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "jobs";
    objects: {
        job_analyses: Prisma.$job_analysesPayload<ExtArgs>[];
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        user_id: string;
        company: string;
        role_title: string;
        job_url: string | null;
        location: string | null;
        status: string;
        jd_text: string;
        notes: string | null;
        applied_at: Date | null;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["jobs"]>;
    composites: {};
};
export type jobsGetPayload<S extends boolean | null | undefined | jobsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$jobsPayload, S>;
export type jobsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<jobsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobsCountAggregateInputType | true;
};
export interface jobsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['jobs'];
        meta: {
            name: 'jobs';
        };
    };
    findUnique<T extends jobsFindUniqueArgs>(args: Prisma.SelectSubset<T, jobsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends jobsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, jobsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends jobsFindFirstArgs>(args?: Prisma.SelectSubset<T, jobsFindFirstArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends jobsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, jobsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends jobsFindManyArgs>(args?: Prisma.SelectSubset<T, jobsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends jobsCreateArgs>(args: Prisma.SelectSubset<T, jobsCreateArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends jobsCreateManyArgs>(args?: Prisma.SelectSubset<T, jobsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends jobsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, jobsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends jobsDeleteArgs>(args: Prisma.SelectSubset<T, jobsDeleteArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends jobsUpdateArgs>(args: Prisma.SelectSubset<T, jobsUpdateArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends jobsDeleteManyArgs>(args?: Prisma.SelectSubset<T, jobsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends jobsUpdateManyArgs>(args: Prisma.SelectSubset<T, jobsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends jobsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, jobsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends jobsUpsertArgs>(args: Prisma.SelectSubset<T, jobsUpsertArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends jobsCountArgs>(args?: Prisma.Subset<T, jobsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobsCountAggregateOutputType> : number>;
    aggregate<T extends JobsAggregateArgs>(args: Prisma.Subset<T, JobsAggregateArgs>): Prisma.PrismaPromise<GetJobsAggregateType<T>>;
    groupBy<T extends jobsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: jobsGroupByArgs['orderBy'];
    } : {
        orderBy?: jobsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, jobsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: jobsFieldRefs;
}
export interface Prisma__jobsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job_analyses<T extends Prisma.jobs$job_analysesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.jobs$job_analysesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_analysesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface jobsFieldRefs {
    readonly id: Prisma.FieldRef<"jobs", 'String'>;
    readonly user_id: Prisma.FieldRef<"jobs", 'String'>;
    readonly company: Prisma.FieldRef<"jobs", 'String'>;
    readonly role_title: Prisma.FieldRef<"jobs", 'String'>;
    readonly job_url: Prisma.FieldRef<"jobs", 'String'>;
    readonly location: Prisma.FieldRef<"jobs", 'String'>;
    readonly status: Prisma.FieldRef<"jobs", 'String'>;
    readonly jd_text: Prisma.FieldRef<"jobs", 'String'>;
    readonly notes: Prisma.FieldRef<"jobs", 'String'>;
    readonly applied_at: Prisma.FieldRef<"jobs", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"jobs", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"jobs", 'DateTime'>;
}
export type jobsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    include?: Prisma.jobsInclude<ExtArgs> | null;
    where: Prisma.jobsWhereUniqueInput;
};
export type jobsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    include?: Prisma.jobsInclude<ExtArgs> | null;
    where: Prisma.jobsWhereUniqueInput;
};
export type jobsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type jobsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type jobsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type jobsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    include?: Prisma.jobsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.jobsCreateInput, Prisma.jobsUncheckedCreateInput>;
};
export type jobsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.jobsCreateManyInput | Prisma.jobsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type jobsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    data: Prisma.jobsCreateManyInput | Prisma.jobsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.jobsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type jobsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    include?: Prisma.jobsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.jobsUpdateInput, Prisma.jobsUncheckedUpdateInput>;
    where: Prisma.jobsWhereUniqueInput;
};
export type jobsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.jobsUpdateManyMutationInput, Prisma.jobsUncheckedUpdateManyInput>;
    where?: Prisma.jobsWhereInput;
    limit?: number;
};
export type jobsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.jobsUpdateManyMutationInput, Prisma.jobsUncheckedUpdateManyInput>;
    where?: Prisma.jobsWhereInput;
    limit?: number;
    include?: Prisma.jobsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type jobsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    include?: Prisma.jobsInclude<ExtArgs> | null;
    where: Prisma.jobsWhereUniqueInput;
    create: Prisma.XOR<Prisma.jobsCreateInput, Prisma.jobsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.jobsUpdateInput, Prisma.jobsUncheckedUpdateInput>;
};
export type jobsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    include?: Prisma.jobsInclude<ExtArgs> | null;
    where: Prisma.jobsWhereUniqueInput;
};
export type jobsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.jobsWhereInput;
    limit?: number;
};
export type jobs$job_analysesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type jobsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    include?: Prisma.jobsInclude<ExtArgs> | null;
};
