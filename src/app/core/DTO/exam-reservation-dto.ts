

export interface ExamReservationDTO {
  examReservationId: number;
  studentTokenEmail?: string;
  startDate?: Date;
  endDate?: Date;
  proctorTokenEmail?: string;
  uniqueKey?: string;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  studentName?: string;
  phone?: string;
  score?: number;
  email?: string;
  examId?: number;
}
