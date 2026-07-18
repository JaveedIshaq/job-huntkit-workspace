import type { AuthUser } from '../shared/types/auth-user.type';
import { ProfileIngestService } from './profile-ingest.service';
import { ProfileRetrievalService } from './profile-retrieval.service';
import { CreateSourceDto } from './dto/create-source.dto';
export declare class ProfileController {
    private readonly ingest;
    private readonly retrieval;
    constructor(ingest: ProfileIngestService, retrieval: ProfileRetrievalService);
    create(user: AuthUser, dto: CreateSourceDto): Promise<{
        source: {
            id: string;
            sourceType: string;
            title: string;
            status: string;
            chunkCount: number;
            errorMessage: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    list(user: AuthUser): Promise<{
        items: {
            id: string;
            sourceType: string;
            title: string;
            status: string;
            chunkCount: number;
            errorMessage: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getOne(user: AuthUser, id: string): Promise<{
        source: {
            id: string;
            sourceType: string;
            title: string;
            status: string;
            chunkCount: number;
            errorMessage: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(user: AuthUser, id: string): Promise<{
        success: boolean;
    }>;
    reindex(user: AuthUser, id: string): Promise<{
        source: {
            id: string;
            sourceType: string;
            title: string;
            status: string;
            chunkCount: number;
            errorMessage: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    search(user: AuthUser, q: string): Promise<{
        results: import("./profile-retrieval.service").RetrievedChunk[];
    }>;
}
