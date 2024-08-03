export interface ExamInfoStructureDTO {
    examId: number;
    examName?: string;
    examDuration?: number;
    examDescription?: string;
    price?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
