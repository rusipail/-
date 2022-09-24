export const hashArr = ["#message", "#community", "#schedule", "#vote"] as const;

export type Hash = (typeof hashArr)[number]; 