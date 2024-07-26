export interface ExamReservationProctorDTO {
  examReservationId: number;
  startDate?: Date;
  endDate?: Date;
  proctorTokenEmail?: string;
  createdAt?: Date;
  updatedAt?: Date;
  studentName?: string;
}
