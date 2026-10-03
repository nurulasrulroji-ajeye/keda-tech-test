export interface SalesPoint {
  label: string;
  revenue: number;
  profit: number;
}

export type Range = "week" | "month";

export const rangeLabels: Record<Range, string> = {
  week: "7 Hari",
  month: "12 Bulan",
};

export const salesData: Record<Range, SalesPoint[]> = {
  week: [
    { label: "Sen", revenue: 4.2, profit: 1.1 },
    { label: "Sel", revenue: 5.1, profit: 1.4 },
    { label: "Rab", revenue: 4.8, profit: 1.3 },
    { label: "Kam", revenue: 6.3, profit: 1.9 },
    { label: "Jum", revenue: 7.4, profit: 2.3 },
    { label: "Sab", revenue: 9.2, profit: 3.1 },
    { label: "Min", revenue: 8.1, profit: 2.6 },
  ],
  month: [
    { label: "Jan", revenue: 112, profit: 29 },
    { label: "Feb", revenue: 124, profit: 32 },
    { label: "Mar", revenue: 139, profit: 37 },
    { label: "Apr", revenue: 131, profit: 35 },
    { label: "Mei", revenue: 152, profit: 42 },
    { label: "Jun", revenue: 168, profit: 48 },
    { label: "Jul", revenue: 161, profit: 45 },
    { label: "Agu", revenue: 177, profit: 52 },
    { label: "Sep", revenue: 189, profit: 57 },
    { label: "Okt", revenue: 204, profit: 63 },
    { label: "Nov", revenue: 218, profit: 69 },
    { label: "Des", revenue: 236, profit: 78 },
  ],
};
