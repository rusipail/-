export const hashArr = ["#message", "#community", "#menu", "#vote"] as const;

export type Hash = (typeof hashArr)[number]; 