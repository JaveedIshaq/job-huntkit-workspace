"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobStatus = void 0;
exports.composeRoleAtCompany = composeRoleAtCompany;
exports.rewriteRoleCompany = rewriteRoleCompany;
var JobStatus;
(function (JobStatus) {
    JobStatus["SAVED"] = "saved";
    JobStatus["APPLIED"] = "applied";
    JobStatus["SCREENING"] = "screening";
    JobStatus["INTERVIEW"] = "interview";
    JobStatus["OFFER"] = "offer";
    JobStatus["REJECTED"] = "rejected";
    JobStatus["WITHDRAWN"] = "withdrawn";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
/**
 * Store/display titles as "Role at Company" without duplicating
 * if the role already ends with " at {company}".
 */
function composeRoleAtCompany(roleTitle, company) {
    const role = roleTitle.trim();
    const co = company.trim();
    if (!role)
        return co;
    if (!co)
        return role;
    const suffix = ` at ${co}`.toLowerCase();
    if (role.toLowerCase().endsWith(suffix))
        return role;
    if (/\bat\b/i.test(role) && role.toLowerCase().includes(co.toLowerCase())) {
        return role;
    }
    return `${role} at ${co}`;
}
/** When company is renamed, rewrite a trailing " at OldCompany" suffix. */
function rewriteRoleCompany(roleTitle, oldCompany, newCompany) {
    const role = roleTitle.trim();
    const next = newCompany.trim();
    const prev = oldCompany.trim();
    if (!next)
        return role;
    if (prev) {
        const suffix = ` at ${prev}`;
        if (role.toLowerCase().endsWith(suffix.toLowerCase())) {
            return `${role.slice(0, -suffix.length)} at ${next}`;
        }
    }
    return composeRoleAtCompany(role, next);
}
//# sourceMappingURL=index.js.map