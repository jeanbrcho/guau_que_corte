export interface IShift {
  date: string;
  time: string;
  petName: string;
  phone?: string;
  serviceId: string;
  userId?: string; // ✅ lo hacés opcional
}
