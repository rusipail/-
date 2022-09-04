export const hashArr = ["#message", "#community", "#schedule"] as const;

export type Hash = (typeof hashArr)[number]; 