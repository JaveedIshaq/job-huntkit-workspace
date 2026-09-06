export enum JobStatus {
  SAVED = 'saved',
  APPLIED = 'applied',
  SCREENING = 'screening',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export type ApiHealthResponse = {
  status: 'ok';
  db: 'ok' | 'error';
};

/**
 * Store/display titles as "Role at Company" without duplicating
 * if the role already ends with " at {company}".
 */
export function composeRoleAtCompany(
  roleTitle: string,
  company: string,
): string {
  const role = roleTitle.trim();
  const co = company.trim();
  if (!role) return co;
  if (!co) return role;
  const suffix = ` at ${co}`.toLowerCase();
  if (role.toLowerCase().endsWith(suffix)) return role;
  if (/\bat\b/i.test(role) && role.toLowerCase().includes(co.toLowerCase())) {
    return role;
  }
  return `${role} at ${co}`;
}

/** When company is renamed, rewrite a trailing " at OldCompany" suffix. */
export function rewriteRoleCompany(
  roleTitle: string,
  oldCompany: string,
  newCompany: string,
): string {
  const role = roleTitle.trim();
  const next = newCompany.trim();
  const prev = oldCompany.trim();
  if (!next) return role;
  if (prev) {
    const suffix = ` at ${prev}`;
    if (role.toLowerCase().endsWith(suffix.toLowerCase())) {
      return `${role.slice(0, -suffix.length)} at ${next}`;
    }
  }
  return composeRoleAtCompany(role, next);
}