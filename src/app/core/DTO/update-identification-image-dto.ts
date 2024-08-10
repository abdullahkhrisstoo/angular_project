export interface UpdateIdentificationImageDTO {
    pathImageBack?: string;
    pathImageFront?: string;
    imageBack?: File;
    imageFront?: File;
    examReservationId?: number;
    identificationImageId:number;

}
