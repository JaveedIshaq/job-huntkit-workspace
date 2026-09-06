"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARSE_JOB_PAGE_SYSTEM_PROMPT = void 0;
exports.PARSE_JOB_PAGE_SYSTEM_PROMPT = `You extract structured job application fields from messy pasted web page text.
The paste usually includes navigation, cookie banners, footers, and ads — ignore those.

Return JSON only:
{
  "company": string,
  "roleTitle": string,
  "location": string | null,
  "jobUrl": string | null,
  "jdText": string
}

Rules:
- company and roleTitle must be non-empty strings when reasonably present; otherwise use empty string "".
- roleTitle: the job role/title only (e.g. "Flutter Developer"), NOT "Flutter Developer at Acme". The API will append " at {company}" when saving.
- location: city/remote/hybrid if present, else null.
- jobUrl: a real http(s) apply/posting URL if clearly present in the paste, else null. Never invent a URL.
- jdText: the cleaned job description only — responsibilities, requirements, benefits. Strip site chrome. Keep meaningful newlines. Do not invent requirements that are not in the paste.
- If the paste is not a job posting, still return the schema with empty strings / nulls and put a short note in jdText starting with "[Could not extract a job description]"
`;
//# sourceMappingURL=parse-job-page.constants.js.map