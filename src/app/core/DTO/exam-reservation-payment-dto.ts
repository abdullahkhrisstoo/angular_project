import { CardInfoDTO } from "./card-info-dto";

export interface ExamReservationPaymentDTO {
    userId: number;
    studentEmail: string;
    studentName: string;
    examName: string;
    examDuration: number;
    price: number;
    cardInfoDTO: CardInfoDTO;
    startTime: string;
    endTime: string;
    reservationDate: string;

    
}