import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type profile_sourcesModel = runtime.Types.Result.DefaultSelection<Prisma.$profile_sourcesPayload>;
export type AggregateProfile_sources = {
    _count: Profile_sourcesCountAggregateOutputType | null;
    _avg: Profile_sourcesAvgAggregateOutputType | null;
    _sum: Profile_sourcesSumAggregateOutputType | null;
    _min: Profile_sourcesMinAggregateOutputType | null;
    _max: Profile_sourcesMaxAggregateOutputType | null;
};
export type Profile_sourcesAvgAggregateOutputType = {
    chunk_count: number | null;
};
export type Profile_sourcesSumAggregateOutputType = {
    chunk_count: number | null;
};
export type Profile_sourcesMinAggregateOutputType = {
    id: string | null;
    user_id: string | null;
    source_type: string | null;
    title: string | null;
    content: string | null;
    status: string | null;
    chunk_count: number | null;
    error_message: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Profile_sourcesMaxAggregateOutputType = {
    id: string | null;
    user_id: string | null;
    source_type: string | null;
    title: string | null;
    content: string | null;
    status: string | null;
    chunk_count: number | null;
    error_message: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Profile_sourcesCountAggregateOutputType = {
    id: number;
    user_id: number;
    source_type: number;
    title: number;
    content: number;
    status: number;
    chunk_count: number;
    error_message: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Profile_sourcesAvgAggregateInputType = {
    chunk_count?: true;
};
export type Profile_sourcesSumAggregateInputType = {
    chunk_count?: true;
};
export type Profile_sourcesMinAggregateInputType = {
    id?: true;
    user_id?: true;
    source_type?: true;
    title?: true;
    content?: true;
    status?: true;
    chunk_count?: true;
    error_message?: true;
    created_at?: true;
    updated_at?: true;
};
export type Profile_sourcesMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    source_type?: true;
    title?: true;
    content?: true;
    status?: true;
    chunk_count?: true;
    error_message?: true;
    created_at?: true;
    updated_at?: true;
};
export type Profile_sourcesCountAggregateInputType = {
    id?: true;
    user_id?: true;
    source_type?: true;
    title?: true;
    content?: true;
    status?: true;
    chunk_count?: true;
    error_message?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Profile_sourcesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_sourcesWhereInput;
    orderBy?: Prisma.profile_sourcesOrderByWithRelationInput | Prisma.profile_sourcesOrderByWithRelationInput[];
    cursor?: Prisma.profile_sourcesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Profile_sourcesCountAggregateInputType;
    _avg?: Profile_sourcesAvgAggregateInputType;
    _sum?: Profile_sourcesSumAggregateInputType;
    _min?: Profile_sourcesMinAggregateInputType;
    _max?: Profile_sourcesMaxAggregateInputType;
};
export type GetProfile_sourcesAggregateType<T extends Profile_sourcesAggregateArgs> = {
    [P in keyof T & keyof AggregateProfile_sources]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProfile_sources[P]> : Prisma.GetScalarType<T[P], AggregateProfile_sources[P]>;
};
export type profile_sourcesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_sourcesWhereInput;
    orderBy?: Prisma.profile_sourcesOrderByWithAggregationInput | Prisma.profile_sourcesOrderByWithAggregationInput[];
    by: Prisma.Profile_sourcesScalarFieldEnum[] | Prisma.Profile_sourcesScalarFieldEnum;
    having?: Prisma.profile_sourcesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Profile_sourcesCountAggregateInputType | true;
    _avg?: Profile_sourcesAvgAggregateInputType;
    _sum?: Profile_sourcesSumAggregateInputType;
    _min?: Profile_sourcesMinAggregateInputType;
    _max?: Profile_sourcesMaxAggregateInputType;
};
export type Profile_sourcesGroupByOutputType = {
    id: string;
    user_id: string;
    source_type: string;
    title: string;
    content: string;
    status: string;
    chunk_count: number;
    error_message: string | null;
    created_at: Date;
    updated_at: Date;
    _count: Profile_sourcesCountAggregateOutputType | null;
    _avg: Profile_sourcesAvgAggregateOutputType | null;
    _sum: Profile_sourcesSumAggregateOutputType | null;
    _min: Profile_sourcesMinAggregateOutputType | null;
    _max: Profile_sourcesMaxAggregateOutputType | null;
};
export type GetProfile_sourcesGroupByPayload<T extends profile_sourcesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Profile_sourcesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Profile_sourcesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Profile_sourcesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Profile_sourcesGroupByOutputType[P]>;
}>>;
export type profile_sourcesWhereInput = {
    AND?: Prisma.profile_sourcesWhereInput | Prisma.profile_sourcesWhereInput[];
    OR?: Prisma.profile_sourcesWhereInput[];
    NOT?: Prisma.profile_sourcesWhereInput | Prisma.profile_sourcesWhereInput[];
    id?: Prisma.UuidFilter<"profile_sources"> | string;
    user_id?: Prisma.UuidFilter<"profile_sources"> | string;
    source_type?: Prisma.StringFilter<"profile_sources"> | string;
    title?: Prisma.StringFilter<"profile_sources"> | string;
    content?: Prisma.StringFilter<"profile_sources"> | string;
    status?: Prisma.StringFilter<"profile_sources"> | string;
    chunk_count?: Prisma.IntFilter<"profile_sources"> | number;
    error_message?: Prisma.StringNullableFilter<"profile_sources"> | string | null;
    created_at?: Prisma.DateTimeFilter<"profile_sources"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"profile_sources"> | Date | string;
    profile_chunks?: Prisma.Profile_chunksListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type profile_sourcesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    source_type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    chunk_count?: Prisma.SortOrder;
    error_message?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    profile_chunks?: Prisma.profile_chunksOrderByRelationAggregateInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type profile_sourcesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.profile_sourcesWhereInput | Prisma.profile_sourcesWhereInput[];
    OR?: Prisma.profile_sourcesWhereInput[];
    NOT?: Prisma.profile_sourcesWhereInput | Prisma.profile_sourcesWhereInput[];
    user_id?: Prisma.UuidFilter<"profile_sources"> | string;
    source_type?: Prisma.StringFilter<"profile_sources"> | string;
    title?: Prisma.StringFilter<"profile_sources"> | string;
    content?: Prisma.StringFilter<"profile_sources"> | string;
    status?: Prisma.StringFilter<"profile_sources"> | string;
    chunk_count?: Prisma.IntFilter<"profile_sources"> | number;
    error_message?: Prisma.StringNullableFilter<"profile_sources"> | string | null;
    created_at?: Prisma.DateTimeFilter<"profile_sources"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"profile_sources"> | Date | string;
    profile_chunks?: Prisma.Profile_chunksListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type profile_sourcesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    source_type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    chunk_count?: Prisma.SortOrder;
    error_message?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.profile_sourcesCountOrderByAggregateInput;
    _avg?: Prisma.profile_sourcesAvgOrderByAggregateInput;
    _max?: Prisma.profile_sourcesMaxOrderByAggregateInput;
    _min?: Prisma.profile_sourcesMinOrderByAggregateInput;
    _sum?: Prisma.profile_sourcesSumOrderByAggregateInput;
};
export type profile_sourcesScalarWhereWithAggregatesInput = {
    AND?: Prisma.profile_sourcesScalarWhereWithAggregatesInput | Prisma.profile_sourcesScalarWhereWithAggregatesInput[];
    OR?: Prisma.profile_sourcesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.profile_sourcesScalarWhereWithAggregatesInput | Prisma.profile_sourcesScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"profile_sources"> | string;
    user_id?: Prisma.UuidWithAggregatesFilter<"profile_sources"> | string;
    source_type?: Prisma.StringWithAggregatesFilter<"profile_sources"> | string;
    title?: Prisma.StringWithAggregatesFilter<"profile_sources"> | string;
    content?: Prisma.StringWithAggregatesFilter<"profile_sources"> | string;
    status?: Prisma.StringWithAggregatesFilter<"profile_sources"> | string;
    chunk_count?: Prisma.IntWithAggregatesFilter<"profile_sources"> | number;
    error_message?: Prisma.StringNullableWithAggregatesFilter<"profile_sources"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"profile_sources"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"profile_sources"> | Date | string;
};
export type profile_sourcesCreateInput = {
    id?: string;
    source_type: string;
    title: string;
    content: string;
    status?: string;
    chunk_count?: number;
    error_message?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    profile_chunks?: Prisma.profile_chunksCreateNestedManyWithoutProfile_sourcesInput;
    users: Prisma.usersCreateNestedOneWithoutProfile_sourcesInput;
};
export type profile_sourcesUncheckedCreateInput = {
    id?: string;
    user_id: string;
    source_type: string;
    title: string;
    content: string;
    status?: string;
    chunk_count?: number;
    error_message?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    profile_chunks?: Prisma.profile_chunksUncheckedCreateNestedManyWithoutProfile_sourcesInput;
};
export type profile_sourcesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile_chunks?: Prisma.profile_chunksUpdateManyWithoutProfile_sourcesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutProfile_sourcesNestedInput;
};
export type profile_sourcesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile_chunks?: Prisma.profile_chunksUncheckedUpdateManyWithoutProfile_sourcesNestedInput;
};
export type profile_sourcesCreateManyInput = {
    id?: string;
    user_id: string;
    source_type: string;
    title: string;
    content: string;
    status?: string;
    chunk_count?: number;
    error_message?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type profile_sourcesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_sourcesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Profile_sourcesScalarRelationFilter = {
    is?: Prisma.profile_sourcesWhereInput;
    isNot?: Prisma.profile_sourcesWhereInput;
};
export type profile_sourcesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    source_type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    chunk_count?: Prisma.SortOrder;
    error_message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type profile_sourcesAvgOrderByAggregateInput = {
    chunk_count?: Prisma.SortOrder;
};
export type profile_sourcesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    source_type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    chunk_count?: Prisma.SortOrder;
    error_message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type profile_sourcesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    source_type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    chunk_count?: Prisma.SortOrder;
    error_message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type profile_sourcesSumOrderByAggregateInput = {
    chunk_count?: Prisma.SortOrder;
};
export type Profile_sourcesListRelationFilter = {
    every?: Prisma.profile_sourcesWhereInput;
    some?: Prisma.profile_sourcesWhereInput;
    none?: Prisma.profile_sourcesWhereInput;
};
export type profile_sourcesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type profile_sourcesUpdateOneRequiredWithoutProfile_chunksNestedInput = {
    create?: Prisma.XOR<Prisma.profile_sourcesCreateWithoutProfile_chunksInput, Prisma.profile_sourcesUncheckedCreateWithoutProfile_chunksInput>;
    connectOrCreate?: Prisma.profile_sourcesCreateOrConnectWithoutProfile_chunksInput;
    upsert?: Prisma.profile_sourcesUpsertWithoutProfile_chunksInput;
    connect?: Prisma.profile_sourcesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.profile_sourcesUpdateToOneWithWhereWithoutProfile_chunksInput, Prisma.profile_sourcesUpdateWithoutProfile_chunksInput>, Prisma.profile_sourcesUncheckedUpdateWithoutProfile_chunksInput>;
};
export type profile_sourcesCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.profile_sourcesCreateWithoutUsersInput, Prisma.profile_sourcesUncheckedCreateWithoutUsersInput> | Prisma.profile_sourcesCreateWithoutUsersInput[] | Prisma.profile_sourcesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.profile_sourcesCreateOrConnectWithoutUsersInput | Prisma.profile_sourcesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.profile_sourcesCreateManyUsersInputEnvelope;
    connect?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
};
export type profile_sourcesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.profile_sourcesCreateWithoutUsersInput, Prisma.profile_sourcesUncheckedCreateWithoutUsersInput> | Prisma.profile_sourcesCreateWithoutUsersInput[] | Prisma.profile_sourcesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.profile_sourcesCreateOrConnectWithoutUsersInput | Prisma.profile_sourcesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.profile_sourcesCreateManyUsersInputEnvelope;
    connect?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
};
export type profile_sourcesUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.profile_sourcesCreateWithoutUsersInput, Prisma.profile_sourcesUncheckedCreateWithoutUsersInput> | Prisma.profile_sourcesCreateWithoutUsersInput[] | Prisma.profile_sourcesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.profile_sourcesCreateOrConnectWithoutUsersInput | Prisma.profile_sourcesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.profile_sourcesUpsertWithWhereUniqueWithoutUsersInput | Prisma.profile_sourcesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.profile_sourcesCreateManyUsersInputEnvelope;
    set?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
    disconnect?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
    delete?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
    connect?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
    update?: Prisma.profile_sourcesUpdateWithWhereUniqueWithoutUsersInput | Prisma.profile_sourcesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.profile_sourcesUpdateManyWithWhereWithoutUsersInput | Prisma.profile_sourcesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.profile_sourcesScalarWhereInput | Prisma.profile_sourcesScalarWhereInput[];
};
export type profile_sourcesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.profile_sourcesCreateWithoutUsersInput, Prisma.profile_sourcesUncheckedCreateWithoutUsersInput> | Prisma.profile_sourcesCreateWithoutUsersInput[] | Prisma.profile_sourcesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.profile_sourcesCreateOrConnectWithoutUsersInput | Prisma.profile_sourcesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.profile_sourcesUpsertWithWhereUniqueWithoutUsersInput | Prisma.profile_sourcesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.profile_sourcesCreateManyUsersInputEnvelope;
    set?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
    disconnect?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
    delete?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
    connect?: Prisma.profile_sourcesWhereUniqueInput | Prisma.profile_sourcesWhereUniqueInput[];
    update?: Prisma.profile_sourcesUpdateWithWhereUniqueWithoutUsersInput | Prisma.profile_sourcesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.profile_sourcesUpdateManyWithWhereWithoutUsersInput | Prisma.profile_sourcesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.profile_sourcesScalarWhereInput | Prisma.profile_sourcesScalarWhereInput[];
};
export type profile_sourcesCreateWithoutProfile_chunksInput = {
    id?: string;
    source_type: string;
    title: string;
    content: string;
    status?: string;
    chunk_count?: number;
    error_message?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutProfile_sourcesInput;
};
export type profile_sourcesUncheckedCreateWithoutProfile_chunksInput = {
    id?: string;
    user_id: string;
    source_type: string;
    title: string;
    content: string;
    status?: string;
    chunk_count?: number;
    error_message?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type profile_sourcesCreateOrConnectWithoutProfile_chunksInput = {
    where: Prisma.profile_sourcesWhereUniqueInput;
    create: Prisma.XOR<Prisma.profile_sourcesCreateWithoutProfile_chunksInput, Prisma.profile_sourcesUncheckedCreateWithoutProfile_chunksInput>;
};
export type profile_sourcesUpsertWithoutProfile_chunksInput = {
    update: Prisma.XOR<Prisma.profile_sourcesUpdateWithoutProfile_chunksInput, Prisma.profile_sourcesUncheckedUpdateWithoutProfile_chunksInput>;
    create: Prisma.XOR<Prisma.profile_sourcesCreateWithoutProfile_chunksInput, Prisma.profile_sourcesUncheckedCreateWithoutProfile_chunksInput>;
    where?: Prisma.profile_sourcesWhereInput;
};
export type profile_sourcesUpdateToOneWithWhereWithoutProfile_chunksInput = {
    where?: Prisma.profile_sourcesWhereInput;
    data: Prisma.XOR<Prisma.profile_sourcesUpdateWithoutProfile_chunksInput, Prisma.profile_sourcesUncheckedUpdateWithoutProfile_chunksInput>;
};
export type profile_sourcesUpdateWithoutProfile_chunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutProfile_sourcesNestedInput;
};
export type profile_sourcesUncheckedUpdateWithoutProfile_chunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_sourcesCreateWithoutUsersInput = {
    id?: string;
    source_type: string;
    title: string;
    content: string;
    status?: string;
    chunk_count?: number;
    error_message?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    profile_chunks?: Prisma.profile_chunksCreateNestedManyWithoutProfile_sourcesInput;
};
export type profile_sourcesUncheckedCreateWithoutUsersInput = {
    id?: string;
    source_type: string;
    title: string;
    content: string;
    status?: string;
    chunk_count?: number;
    error_message?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    profile_chunks?: Prisma.profile_chunksUncheckedCreateNestedManyWithoutProfile_sourcesInput;
};
export type profile_sourcesCreateOrConnectWithoutUsersInput = {
    where: Prisma.profile_sourcesWhereUniqueInput;
    create: Prisma.XOR<Prisma.profile_sourcesCreateWithoutUsersInput, Prisma.profile_sourcesUncheckedCreateWithoutUsersInput>;
};
export type profile_sourcesCreateManyUsersInputEnvelope = {
    data: Prisma.profile_sourcesCreateManyUsersInput | Prisma.profile_sourcesCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type profile_sourcesUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.profile_sourcesWhereUniqueInput;
    update: Prisma.XOR<Prisma.profile_sourcesUpdateWithoutUsersInput, Prisma.profile_sourcesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.profile_sourcesCreateWithoutUsersInput, Prisma.profile_sourcesUncheckedCreateWithoutUsersInput>;
};
export type profile_sourcesUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.profile_sourcesWhereUniqueInput;
    data: Prisma.XOR<Prisma.profile_sourcesUpdateWithoutUsersInput, Prisma.profile_sourcesUncheckedUpdateWithoutUsersInput>;
};
export type profile_sourcesUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.profile_sourcesScalarWhereInput;
    data: Prisma.XOR<Prisma.profile_sourcesUpdateManyMutationInput, Prisma.profile_sourcesUncheckedUpdateManyWithoutUsersInput>;
};
export type profile_sourcesScalarWhereInput = {
    AND?: Prisma.profile_sourcesScalarWhereInput | Prisma.profile_sourcesScalarWhereInput[];
    OR?: Prisma.profile_sourcesScalarWhereInput[];
    NOT?: Prisma.profile_sourcesScalarWhereInput | Prisma.profile_sourcesScalarWhereInput[];
    id?: Prisma.UuidFilter<"profile_sources"> | string;
    user_id?: Prisma.UuidFilter<"profile_sources"> | string;
    source_type?: Prisma.StringFilter<"profile_sources"> | string;
    title?: Prisma.StringFilter<"profile_sources"> | string;
    content?: Prisma.StringFilter<"profile_sources"> | string;
    status?: Prisma.StringFilter<"profile_sources"> | string;
    chunk_count?: Prisma.IntFilter<"profile_sources"> | number;
    error_message?: Prisma.StringNullableFilter<"profile_sources"> | string | null;
    created_at?: Prisma.DateTimeFilter<"profile_sources"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"profile_sources"> | Date | string;
};
export type profile_sourcesCreateManyUsersInput = {
    id?: string;
    source_type: string;
    title: string;
    content: string;
    status?: string;
    chunk_count?: number;
    error_message?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type profile_sourcesUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile_chunks?: Prisma.profile_chunksUpdateManyWithoutProfile_sourcesNestedInput;
};
export type profile_sourcesUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile_chunks?: Prisma.profile_chunksUncheckedUpdateManyWithoutProfile_sourcesNestedInput;
};
export type profile_sourcesUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source_type?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_count?: Prisma.IntFieldUpdateOperationsInput | number;
    error_message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Profile_sourcesCountOutputType = {
    profile_chunks: number;
};
export type Profile_sourcesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile_chunks?: boolean | Profile_sourcesCountOutputTypeCountProfile_chunksArgs;
};
export type Profile_sourcesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Profile_sourcesCountOutputTypeSelect<ExtArgs> | null;
};
export type Profile_sourcesCountOutputTypeCountProfile_chunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_chunksWhereInput;
};
export type profile_sourcesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    source_type?: boolean;
    title?: boolean;
    content?: boolean;
    status?: boolean;
    chunk_count?: boolean;
    error_message?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    profile_chunks?: boolean | Prisma.profile_sources$profile_chunksArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Profile_sourcesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["profile_sources"]>;
export type profile_sourcesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    source_type?: boolean;
    title?: boolean;
    content?: boolean;
    status?: boolean;
    chunk_count?: boolean;
    error_message?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["profile_sources"]>;
export type profile_sourcesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    source_type?: boolean;
    title?: boolean;
    content?: boolean;
    status?: boolean;
    chunk_count?: boolean;
    error_message?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["profile_sources"]>;
export type profile_sourcesSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    source_type?: boolean;
    title?: boolean;
    content?: boolean;
    status?: boolean;
    chunk_count?: boolean;
    error_message?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type profile_sourcesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "source_type" | "title" | "content" | "status" | "chunk_count" | "error_message" | "created_at" | "updated_at", ExtArgs["result"]["profile_sources"]>;
export type profile_sourcesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile_chunks?: boolean | Prisma.profile_sources$profile_chunksArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Profile_sourcesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type profile_sourcesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type profile_sourcesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $profile_sourcesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "profile_sources";
    objects: {
        profile_chunks: Prisma.$profile_chunksPayload<ExtArgs>[];
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        user_id: string;
        source_type: string;
        title: string;
        content: string;
        status: string;
        chunk_count: number;
        error_message: string | null;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["profile_sources"]>;
    composites: {};
};
export type profile_sourcesGetPayload<S extends boolean | null | undefined | profile_sourcesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload, S>;
export type profile_sourcesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<profile_sourcesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Profile_sourcesCountAggregateInputType | true;
};
export interface profile_sourcesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['profile_sources'];
        meta: {
            name: 'profile_sources';
        };
    };
    findUnique<T extends profile_sourcesFindUniqueArgs>(args: Prisma.SelectSubset<T, profile_sourcesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends profile_sourcesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, profile_sourcesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends profile_sourcesFindFirstArgs>(args?: Prisma.SelectSubset<T, profile_sourcesFindFirstArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends profile_sourcesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, profile_sourcesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends profile_sourcesFindManyArgs>(args?: Prisma.SelectSubset<T, profile_sourcesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends profile_sourcesCreateArgs>(args: Prisma.SelectSubset<T, profile_sourcesCreateArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends profile_sourcesCreateManyArgs>(args?: Prisma.SelectSubset<T, profile_sourcesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends profile_sourcesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, profile_sourcesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends profile_sourcesDeleteArgs>(args: Prisma.SelectSubset<T, profile_sourcesDeleteArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends profile_sourcesUpdateArgs>(args: Prisma.SelectSubset<T, profile_sourcesUpdateArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends profile_sourcesDeleteManyArgs>(args?: Prisma.SelectSubset<T, profile_sourcesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends profile_sourcesUpdateManyArgs>(args: Prisma.SelectSubset<T, profile_sourcesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends profile_sourcesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, profile_sourcesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends profile_sourcesUpsertArgs>(args: Prisma.SelectSubset<T, profile_sourcesUpsertArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends profile_sourcesCountArgs>(args?: Prisma.Subset<T, profile_sourcesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Profile_sourcesCountAggregateOutputType> : number>;
    aggregate<T extends Profile_sourcesAggregateArgs>(args: Prisma.Subset<T, Profile_sourcesAggregateArgs>): Prisma.PrismaPromise<GetProfile_sourcesAggregateType<T>>;
    groupBy<T extends profile_sourcesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: profile_sourcesGroupByArgs['orderBy'];
    } : {
        orderBy?: profile_sourcesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, profile_sourcesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfile_sourcesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: profile_sourcesFieldRefs;
}
export interface Prisma__profile_sourcesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    profile_chunks<T extends Prisma.profile_sources$profile_chunksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.profile_sources$profile_chunksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface profile_sourcesFieldRefs {
    readonly id: Prisma.FieldRef<"profile_sources", 'String'>;
    readonly user_id: Prisma.FieldRef<"profile_sources", 'String'>;
    readonly source_type: Prisma.FieldRef<"profile_sources", 'String'>;
    readonly title: Prisma.FieldRef<"profile_sources", 'String'>;
    readonly content: Prisma.FieldRef<"profile_sources", 'String'>;
    readonly status: Prisma.FieldRef<"profile_sources", 'String'>;
    readonly chunk_count: Prisma.FieldRef<"profile_sources", 'Int'>;
    readonly error_message: Prisma.FieldRef<"profile_sources", 'String'>;
    readonly created_at: Prisma.FieldRef<"profile_sources", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"profile_sources", 'DateTime'>;
}
export type profile_sourcesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelect<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    include?: Prisma.profile_sourcesInclude<ExtArgs> | null;
    where: Prisma.profile_sourcesWhereUniqueInput;
};
export type profile_sourcesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelect<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    include?: Prisma.profile_sourcesInclude<ExtArgs> | null;
    where: Prisma.profile_sourcesWhereUniqueInput;
};
export type profile_sourcesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type profile_sourcesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type profile_sourcesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type profile_sourcesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelect<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    include?: Prisma.profile_sourcesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.profile_sourcesCreateInput, Prisma.profile_sourcesUncheckedCreateInput>;
};
export type profile_sourcesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.profile_sourcesCreateManyInput | Prisma.profile_sourcesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type profile_sourcesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    data: Prisma.profile_sourcesCreateManyInput | Prisma.profile_sourcesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.profile_sourcesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type profile_sourcesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelect<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    include?: Prisma.profile_sourcesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.profile_sourcesUpdateInput, Prisma.profile_sourcesUncheckedUpdateInput>;
    where: Prisma.profile_sourcesWhereUniqueInput;
};
export type profile_sourcesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.profile_sourcesUpdateManyMutationInput, Prisma.profile_sourcesUncheckedUpdateManyInput>;
    where?: Prisma.profile_sourcesWhereInput;
    limit?: number;
};
export type profile_sourcesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.profile_sourcesUpdateManyMutationInput, Prisma.profile_sourcesUncheckedUpdateManyInput>;
    where?: Prisma.profile_sourcesWhereInput;
    limit?: number;
    include?: Prisma.profile_sourcesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type profile_sourcesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelect<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    include?: Prisma.profile_sourcesInclude<ExtArgs> | null;
    where: Prisma.profile_sourcesWhereUniqueInput;
    create: Prisma.XOR<Prisma.profile_sourcesCreateInput, Prisma.profile_sourcesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.profile_sourcesUpdateInput, Prisma.profile_sourcesUncheckedUpdateInput>;
};
export type profile_sourcesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelect<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    include?: Prisma.profile_sourcesInclude<ExtArgs> | null;
    where: Prisma.profile_sourcesWhereUniqueInput;
};
export type profile_sourcesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_sourcesWhereInput;
    limit?: number;
};
export type profile_sources$profile_chunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type profile_sourcesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_sourcesSelect<ExtArgs> | null;
    omit?: Prisma.profile_sourcesOmit<ExtArgs> | null;
    include?: Prisma.profile_sourcesInclude<ExtArgs> | null;
};
