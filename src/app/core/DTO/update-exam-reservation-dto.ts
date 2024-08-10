

export interface UpdateExamReservationDTO {
  examReservationId: number;
  studentTokenEmail?: string;
  startDate?: Date;
  endDate?: Date;
  proctorTokenEmail?: string;
  uniqueKey?: string;
  userId?: number;
  studentName?: string;
  phone?  : string;
  score   : number;
  email?  : string;
  examId? : number;
}
