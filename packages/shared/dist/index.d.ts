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
/**
 * Store/display titles as "Role at Company" without duplicating
 * if the role already ends with " at {company}".
 */
export declare function composeRoleAtCompany(roleTitle: string, company: string): string;
/** When company is renamed, rewrite a trailing " at OldCompany" suffix. */
export declare function rewriteRoleCompany(roleTitle: string, oldCompany: string, newCompany: string): string;
