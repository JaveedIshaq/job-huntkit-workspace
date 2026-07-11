export declare enum JobStatus {
    SAVED = "saved",
    APPLIED = "applied",
    SCREENING = "screening",
    INTERVIEW = "interview",
    OFFER = "offer",
    REJECTED = "rejected",
    WITHDRAWN = "withdrawn"
}
export type ApiHealthResponse = {
    status: 'ok';
    db: 'ok' | 'error';
};
