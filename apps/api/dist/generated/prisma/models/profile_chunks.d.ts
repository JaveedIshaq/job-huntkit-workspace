import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type profile_chunksModel = runtime.Types.Result.DefaultSelection<Prisma.$profile_chunksPayload>;
export type AggregateProfile_chunks = {
    _count: Profile_chunksCountAggregateOutputType | null;
    _avg: Profile_chunksAvgAggregateOutputType | null;
    _sum: Profile_chunksSumAggregateOutputType | null;
    _min: Profile_chunksMinAggregateOutputType | null;
    _max: Profile_chunksMaxAggregateOutputType | null;
};
export type Profile_chunksAvgAggregateOutputType = {
    chunk_index: number | null;
    token_count: number | null;
};
export type Profile_chunksSumAggregateOutputType = {
    chunk_index: number | null;
    token_count: number | null;
};
export type Profile_chunksMinAggregateOutputType = {
    id: string | null;
    profile_source_id: string | null;
    user_id: string | null;
    chunk_index: number | null;
    content: string | null;
    token_count: number | null;
    created_at: Date | null;
};
export type Profile_chunksMaxAggregateOutputType = {
    id: string | null;
    profile_source_id: string | null;
    user_id: string | null;
    chunk_index: number | null;
    content: string | null;
    token_count: number | null;
    created_at: Date | null;
};
export type Profile_chunksCountAggregateOutputType = {
    id: number;
    profile_source_id: number;
    user_id: number;
    chunk_index: number;
    content: number;
    token_count: number;
    metadata: number;
    created_at: number;
    _all: number;
};
export type Profile_chunksAvgAggregateInputType = {
    chunk_index?: true;
    token_count?: true;
};
export type Profile_chunksSumAggregateInputType = {
    chunk_index?: true;
    token_count?: true;
};
export type Profile_chunksMinAggregateInputType = {
    id?: true;
    profile_source_id?: true;
    user_id?: true;
    chunk_index?: true;
    content?: true;
    token_count?: true;
    created_at?: true;
};
export type Profile_chunksMaxAggregateInputType = {
    id?: true;
    profile_source_id?: true;
    user_id?: true;
    chunk_index?: true;
    content?: true;
    token_count?: true;
    created_at?: true;
};
export type Profile_chunksCountAggregateInputType = {
    id?: true;
    profile_source_id?: true;
    user_id?: true;
    chunk_index?: true;
    content?: true;
    token_count?: true;
    metadata?: true;
    created_at?: true;
    _all?: true;
};
export type Profile_chunksAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_chunksWhereInput;
    orderBy?: Prisma.profile_chunksOrderByWithRelationInput | Prisma.profile_chunksOrderByWithRelationInput[];
    cursor?: Prisma.profile_chunksWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Profile_chunksCountAggregateInputType;
    _avg?: Profile_chunksAvgAggregateInputType;
    _sum?: Profile_chunksSumAggregateInputType;
    _min?: Profile_chunksMinAggregateInputType;
    _max?: Profile_chunksMaxAggregateInputType;
};
export type GetProfile_chunksAggregateType<T extends Profile_chunksAggregateArgs> = {
    [P in keyof T & keyof AggregateProfile_chunks]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProfile_chunks[P]> : Prisma.GetScalarType<T[P], AggregateProfile_chunks[P]>;
};
export type profile_chunksGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_chunksWhereInput;
    orderBy?: Prisma.profile_chunksOrderByWithAggregationInput | Prisma.profile_chunksOrderByWithAggregationInput[];
    by: Prisma.Profile_chunksScalarFieldEnum[] | Prisma.Profile_chunksScalarFieldEnum;
    having?: Prisma.profile_chunksScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Profile_chunksCountAggregateInputType | true;
    _avg?: Profile_chunksAvgAggregateInputType;
    _sum?: Profile_chunksSumAggregateInputType;
    _min?: Profile_chunksMinAggregateInputType;
    _max?: Profile_chunksMaxAggregateInputType;
};
export type Profile_chunksGroupByOutputType = {
    id: string;
    profile_source_id: string;
    user_id: string;
    chunk_index: number;
    content: string;
    token_count: number | null;
    metadata: runtime.JsonValue;
    created_at: Date;
    _count: Profile_chunksCountAggregateOutputType | null;
    _avg: Profile_chunksAvgAggregateOutputType | null;
    _sum: Profile_chunksSumAggregateOutputType | null;
    _min: Profile_chunksMinAggregateOutputType | null;
    _max: Profile_chunksMaxAggregateOutputType | null;
};
export type GetProfile_chunksGroupByPayload<T extends profile_chunksGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Profile_chunksGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Profile_chunksGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Profile_chunksGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Profile_chunksGroupByOutputType[P]>;
}>>;
export type profile_chunksWhereInput = {
    AND?: Prisma.profile_chunksWhereInput | Prisma.profile_chunksWhereInput[];
    OR?: Prisma.profile_chunksWhereInput[];
    NOT?: Prisma.profile_chunksWhereInput | Prisma.profile_chunksWhereInput[];
    id?: Prisma.UuidFilter<"profile_chunks"> | string;
    profile_source_id?: Prisma.UuidFilter<"profile_chunks"> | string;
    user_id?: Prisma.UuidFilter<"profile_chunks"> | string;
    chunk_index?: Prisma.IntFilter<"profile_chunks"> | number;
    content?: Prisma.StringFilter<"profile_chunks"> | string;
    token_count?: Prisma.IntNullableFilter<"profile_chunks"> | number | null;
    metadata?: Prisma.JsonFilter<"profile_chunks">;
    created_at?: Prisma.DateTimeFilter<"profile_chunks"> | Date | string;
    profile_sources?: Prisma.XOR<Prisma.Profile_sourcesScalarRelationFilter, Prisma.profile_sourcesWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type profile_chunksOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    profile_source_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    chunk_index?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    token_count?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    profile_sources?: Prisma.profile_sourcesOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type profile_chunksWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    profile_source_id_chunk_index?: Prisma.profile_chunksProfile_source_idChunk_indexCompoundUniqueInput;
    AND?: Prisma.profile_chunksWhereInput | Prisma.profile_chunksWhereInput[];
    OR?: Prisma.profile_chunksWhereInput[];
    NOT?: Prisma.profile_chunksWhereInput | Prisma.profile_chunksWhereInput[];
    profile_source_id?: Prisma.UuidFilter<"profile_chunks"> | string;
    user_id?: Prisma.UuidFilter<"profile_chunks"> | string;
    chunk_index?: Prisma.IntFilter<"profile_chunks"> | number;
    content?: Prisma.StringFilter<"profile_chunks"> | string;
    token_count?: Prisma.IntNullableFilter<"profile_chunks"> | number | null;
    metadata?: Prisma.JsonFilter<"profile_chunks">;
    created_at?: Prisma.DateTimeFilter<"profile_chunks"> | Date | string;
    profile_sources?: Prisma.XOR<Prisma.Profile_sourcesScalarRelationFilter, Prisma.profile_sourcesWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id" | "profile_source_id_chunk_index">;
export type profile_chunksOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    profile_source_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    chunk_index?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    token_count?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.profile_chunksCountOrderByAggregateInput;
    _avg?: Prisma.profile_chunksAvgOrderByAggregateInput;
    _max?: Prisma.profile_chunksMaxOrderByAggregateInput;
    _min?: Prisma.profile_chunksMinOrderByAggregateInput;
    _sum?: Prisma.profile_chunksSumOrderByAggregateInput;
};
export type profile_chunksScalarWhereWithAggregatesInput = {
    AND?: Prisma.profile_chunksScalarWhereWithAggregatesInput | Prisma.profile_chunksScalarWhereWithAggregatesInput[];
    OR?: Prisma.profile_chunksScalarWhereWithAggregatesInput[];
    NOT?: Prisma.profile_chunksScalarWhereWithAggregatesInput | Prisma.profile_chunksScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"profile_chunks"> | string;
    profile_source_id?: Prisma.UuidWithAggregatesFilter<"profile_chunks"> | string;
    user_id?: Prisma.UuidWithAggregatesFilter<"profile_chunks"> | string;
    chunk_index?: Prisma.IntWithAggregatesFilter<"profile_chunks"> | number;
    content?: Prisma.StringWithAggregatesFilter<"profile_chunks"> | string;
    token_count?: Prisma.IntNullableWithAggregatesFilter<"profile_chunks"> | number | null;
    metadata?: Prisma.JsonWithAggregatesFilter<"profile_chunks">;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"profile_chunks"> | Date | string;
};
export type profile_chunksUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile_sources?: Prisma.profile_sourcesUpdateOneRequiredWithoutProfile_chunksNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutProfile_chunksNestedInput;
};
export type profile_chunksUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    profile_source_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_chunksUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_chunksUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    profile_source_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_chunksProfile_source_idChunk_indexCompoundUniqueInput = {
    profile_source_id: string;
    chunk_index: number;
};
export type profile_chunksCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    profile_source_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    chunk_index?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    token_count?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type profile_chunksAvgOrderByAggregateInput = {
    chunk_index?: Prisma.SortOrder;
    token_count?: Prisma.SortOrder;
};
export type profile_chunksMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    profile_source_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    chunk_index?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    token_count?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type profile_chunksMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    profile_source_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    chunk_index?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    token_count?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type profile_chunksSumOrderByAggregateInput = {
    chunk_index?: Prisma.SortOrder;
    token_count?: Prisma.SortOrder;
};
export type Profile_chunksListRelationFilter = {
    every?: Prisma.profile_chunksWhereInput;
    some?: Prisma.profile_chunksWhereInput;
    none?: Prisma.profile_chunksWhereInput;
};
export type profile_chunksOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type profile_chunksCreateNestedManyWithoutProfile_sourcesInput = {
    connect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
};
export type profile_chunksUncheckedCreateNestedManyWithoutProfile_sourcesInput = {
    connect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
};
export type profile_chunksUpdateManyWithoutProfile_sourcesNestedInput = {
    set?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    disconnect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    delete?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    connect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    update?: Prisma.profile_chunksUpdateWithWhereUniqueWithoutProfile_sourcesInput | Prisma.profile_chunksUpdateWithWhereUniqueWithoutProfile_sourcesInput[];
    updateMany?: Prisma.profile_chunksUpdateManyWithWhereWithoutProfile_sourcesInput | Prisma.profile_chunksUpdateManyWithWhereWithoutProfile_sourcesInput[];
    deleteMany?: Prisma.profile_chunksScalarWhereInput | Prisma.profile_chunksScalarWhereInput[];
};
export type profile_chunksUncheckedUpdateManyWithoutProfile_sourcesNestedInput = {
    set?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    disconnect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    delete?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    connect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    update?: Prisma.profile_chunksUpdateWithWhereUniqueWithoutProfile_sourcesInput | Prisma.profile_chunksUpdateWithWhereUniqueWithoutProfile_sourcesInput[];
    updateMany?: Prisma.profile_chunksUpdateManyWithWhereWithoutProfile_sourcesInput | Prisma.profile_chunksUpdateManyWithWhereWithoutProfile_sourcesInput[];
    deleteMany?: Prisma.profile_chunksScalarWhereInput | Prisma.profile_chunksScalarWhereInput[];
};
export type profile_chunksCreateNestedManyWithoutUsersInput = {
    connect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
};
export type profile_chunksUncheckedCreateNestedManyWithoutUsersInput = {
    connect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
};
export type profile_chunksUpdateManyWithoutUsersNestedInput = {
    set?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    disconnect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    delete?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    connect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    update?: Prisma.profile_chunksUpdateWithWhereUniqueWithoutUsersInput | Prisma.profile_chunksUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.profile_chunksUpdateManyWithWhereWithoutUsersInput | Prisma.profile_chunksUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.profile_chunksScalarWhereInput | Prisma.profile_chunksScalarWhereInput[];
};
export type profile_chunksUncheckedUpdateManyWithoutUsersNestedInput = {
    set?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    disconnect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    delete?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    connect?: Prisma.profile_chunksWhereUniqueInput | Prisma.profile_chunksWhereUniqueInput[];
    update?: Prisma.profile_chunksUpdateWithWhereUniqueWithoutUsersInput | Prisma.profile_chunksUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.profile_chunksUpdateManyWithWhereWithoutUsersInput | Prisma.profile_chunksUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.profile_chunksScalarWhereInput | Prisma.profile_chunksScalarWhereInput[];
};
export type profile_chunksUpdateWithWhereUniqueWithoutProfile_sourcesInput = {
    where: Prisma.profile_chunksWhereUniqueInput;
    data: Prisma.XOR<Prisma.profile_chunksUpdateWithoutProfile_sourcesInput, Prisma.profile_chunksUncheckedUpdateWithoutProfile_sourcesInput>;
};
export type profile_chunksUpdateManyWithWhereWithoutProfile_sourcesInput = {
    where: Prisma.profile_chunksScalarWhereInput;
    data: Prisma.XOR<Prisma.profile_chunksUpdateManyMutationInput, Prisma.profile_chunksUncheckedUpdateManyWithoutProfile_sourcesInput>;
};
export type profile_chunksScalarWhereInput = {
    AND?: Prisma.profile_chunksScalarWhereInput | Prisma.profile_chunksScalarWhereInput[];
    OR?: Prisma.profile_chunksScalarWhereInput[];
    NOT?: Prisma.profile_chunksScalarWhereInput | Prisma.profile_chunksScalarWhereInput[];
    id?: Prisma.UuidFilter<"profile_chunks"> | string;
    profile_source_id?: Prisma.UuidFilter<"profile_chunks"> | string;
    user_id?: Prisma.UuidFilter<"profile_chunks"> | string;
    chunk_index?: Prisma.IntFilter<"profile_chunks"> | number;
    content?: Prisma.StringFilter<"profile_chunks"> | string;
    token_count?: Prisma.IntNullableFilter<"profile_chunks"> | number | null;
    metadata?: Prisma.JsonFilter<"profile_chunks">;
    created_at?: Prisma.DateTimeFilter<"profile_chunks"> | Date | string;
};
export type profile_chunksUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.profile_chunksWhereUniqueInput;
    data: Prisma.XOR<Prisma.profile_chunksUpdateWithoutUsersInput, Prisma.profile_chunksUncheckedUpdateWithoutUsersInput>;
};
export type profile_chunksUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.profile_chunksScalarWhereInput;
    data: Prisma.XOR<Prisma.profile_chunksUpdateManyMutationInput, Prisma.profile_chunksUncheckedUpdateManyWithoutUsersInput>;
};
export type profile_chunksUpdateWithoutProfile_sourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutProfile_chunksNestedInput;
};
export type profile_chunksUncheckedUpdateWithoutProfile_sourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_chunksUncheckedUpdateManyWithoutProfile_sourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_chunksUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile_sources?: Prisma.profile_sourcesUpdateOneRequiredWithoutProfile_chunksNestedInput;
};
export type profile_chunksUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    profile_source_id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_chunksUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    profile_source_id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunk_index?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    token_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type profile_chunksSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    profile_source_id?: boolean;
    user_id?: boolean;
    chunk_index?: boolean;
    content?: boolean;
    token_count?: boolean;
    metadata?: boolean;
    created_at?: boolean;
    profile_sources?: boolean | Prisma.profile_sourcesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["profile_chunks"]>;
export type profile_chunksSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    profile_source_id?: boolean;
    user_id?: boolean;
    chunk_index?: boolean;
    content?: boolean;
    token_count?: boolean;
    metadata?: boolean;
    created_at?: boolean;
    profile_sources?: boolean | Prisma.profile_sourcesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["profile_chunks"]>;
export type profile_chunksSelectScalar = {
    id?: boolean;
    profile_source_id?: boolean;
    user_id?: boolean;
    chunk_index?: boolean;
    content?: boolean;
    token_count?: boolean;
    metadata?: boolean;
    created_at?: boolean;
};
export type profile_chunksOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "profile_source_id" | "user_id" | "chunk_index" | "content" | "token_count" | "metadata" | "created_at", ExtArgs["result"]["profile_chunks"]>;
export type profile_chunksInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile_sources?: boolean | Prisma.profile_sourcesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type profile_chunksIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile_sources?: boolean | Prisma.profile_sourcesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $profile_chunksPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "profile_chunks";
    objects: {
        profile_sources: Prisma.$profile_sourcesPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        profile_source_id: string;
        user_id: string;
        chunk_index: number;
        content: string;
        token_count: number | null;
        metadata: runtime.JsonValue;
        created_at: Date;
    }, ExtArgs["result"]["profile_chunks"]>;
    composites: {};
};
export type profile_chunksGetPayload<S extends boolean | null | undefined | profile_chunksDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload, S>;
export type profile_chunksCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<profile_chunksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Profile_chunksCountAggregateInputType | true;
};
export interface profile_chunksDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['profile_chunks'];
        meta: {
            name: 'profile_chunks';
        };
    };
    findUnique<T extends profile_chunksFindUniqueArgs>(args: Prisma.SelectSubset<T, profile_chunksFindUniqueArgs<ExtArgs>>): Prisma.Prisma__profile_chunksClient<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends profile_chunksFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, profile_chunksFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__profile_chunksClient<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends profile_chunksFindFirstArgs>(args?: Prisma.SelectSubset<T, profile_chunksFindFirstArgs<ExtArgs>>): Prisma.Prisma__profile_chunksClient<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends profile_chunksFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, profile_chunksFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__profile_chunksClient<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends profile_chunksFindManyArgs>(args?: Prisma.SelectSubset<T, profile_chunksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    delete<T extends profile_chunksDeleteArgs>(args: Prisma.SelectSubset<T, profile_chunksDeleteArgs<ExtArgs>>): Prisma.Prisma__profile_chunksClient<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends profile_chunksUpdateArgs>(args: Prisma.SelectSubset<T, profile_chunksUpdateArgs<ExtArgs>>): Prisma.Prisma__profile_chunksClient<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends profile_chunksDeleteManyArgs>(args?: Prisma.SelectSubset<T, profile_chunksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends profile_chunksUpdateManyArgs>(args: Prisma.SelectSubset<T, profile_chunksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends profile_chunksUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, profile_chunksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$profile_chunksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    count<T extends profile_chunksCountArgs>(args?: Prisma.Subset<T, profile_chunksCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Profile_chunksCountAggregateOutputType> : number>;
    aggregate<T extends Profile_chunksAggregateArgs>(args: Prisma.Subset<T, Profile_chunksAggregateArgs>): Prisma.PrismaPromise<GetProfile_chunksAggregateType<T>>;
    groupBy<T extends profile_chunksGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: profile_chunksGroupByArgs['orderBy'];
    } : {
        orderBy?: profile_chunksGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, profile_chunksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfile_chunksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: profile_chunksFieldRefs;
}
export interface Prisma__profile_chunksClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    profile_sources<T extends Prisma.profile_sourcesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.profile_sourcesDefaultArgs<ExtArgs>>): Prisma.Prisma__profile_sourcesClient<runtime.Types.Result.GetResult<Prisma.$profile_sourcesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface profile_chunksFieldRefs {
    readonly id: Prisma.FieldRef<"profile_chunks", 'String'>;
    readonly profile_source_id: Prisma.FieldRef<"profile_chunks", 'String'>;
    readonly user_id: Prisma.FieldRef<"profile_chunks", 'String'>;
    readonly chunk_index: Prisma.FieldRef<"profile_chunks", 'Int'>;
    readonly content: Prisma.FieldRef<"profile_chunks", 'String'>;
    readonly token_count: Prisma.FieldRef<"profile_chunks", 'Int'>;
    readonly metadata: Prisma.FieldRef<"profile_chunks", 'Json'>;
    readonly created_at: Prisma.FieldRef<"profile_chunks", 'DateTime'>;
}
export type profile_chunksFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_chunksSelect<ExtArgs> | null;
    omit?: Prisma.profile_chunksOmit<ExtArgs> | null;
    include?: Prisma.profile_chunksInclude<ExtArgs> | null;
    where: Prisma.profile_chunksWhereUniqueInput;
};
export type profile_chunksFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_chunksSelect<ExtArgs> | null;
    omit?: Prisma.profile_chunksOmit<ExtArgs> | null;
    include?: Prisma.profile_chunksInclude<ExtArgs> | null;
    where: Prisma.profile_chunksWhereUniqueInput;
};
export type profile_chunksFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type profile_chunksFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type profile_chunksFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type profile_chunksUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_chunksSelect<ExtArgs> | null;
    omit?: Prisma.profile_chunksOmit<ExtArgs> | null;
    include?: Prisma.profile_chunksInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.profile_chunksUpdateInput, Prisma.profile_chunksUncheckedUpdateInput>;
    where: Prisma.profile_chunksWhereUniqueInput;
};
export type profile_chunksUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.profile_chunksUpdateManyMutationInput, Prisma.profile_chunksUncheckedUpdateManyInput>;
    where?: Prisma.profile_chunksWhereInput;
    limit?: number;
};
export type profile_chunksUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_chunksSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.profile_chunksOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.profile_chunksUpdateManyMutationInput, Prisma.profile_chunksUncheckedUpdateManyInput>;
    where?: Prisma.profile_chunksWhereInput;
    limit?: number;
    include?: Prisma.profile_chunksIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type profile_chunksDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_chunksSelect<ExtArgs> | null;
    omit?: Prisma.profile_chunksOmit<ExtArgs> | null;
    include?: Prisma.profile_chunksInclude<ExtArgs> | null;
    where: Prisma.profile_chunksWhereUniqueInput;
};
export type profile_chunksDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.profile_chunksWhereInput;
    limit?: number;
};
export type profile_chunksDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.profile_chunksSelect<ExtArgs> | null;
    omit?: Prisma.profile_chunksOmit<ExtArgs> | null;
    include?: Prisma.profile_chunksInclude<ExtArgs> | null;
};
