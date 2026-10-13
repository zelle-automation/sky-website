export const pkr = (n: number) => `PKR ${Math.round(n).toLocaleString("en-US")}`;
export const amount = (n: number) => Math.round(n).toLocaleString("en-US");
export const count = (n: number | null) => (n == null ? "" : n.toLocaleString("en-US"));
