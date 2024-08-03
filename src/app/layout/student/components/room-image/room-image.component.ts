import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IdentificationImageService } from '../../../../core/services/identification-image.service';
import Dropzone from 'dropzone';
import { CreateRoomReservationImageDTO } from '../../../../core/DTO/create-room-image-dto';
import { RoomImageService } from '../../../../core/services/room-image.service';

@Component({
  selector: 'app-room-image',
  templateUrl: './room-image.component.html',
  styleUrl: './room-image.component.css'
})
export class RoomImageComponent {
  roomImageForm: FormGroup;
  @ViewChild('dropzoneElement') dropzoneElement!: ElementRef;

  images: { [key: string]: File | undefined } = {
    front: undefined,
    back: undefined,
    left: undefined,
    right: undefined
  };


  constructor(private fb: FormBuilder, private roomService: RoomImageService) {
    this.roomImageForm = this.fb.group({
      examReservationId: [''],
      place: ['']
    });
  }

  ngAfterViewInit(): void {
    this.initializeDropzone();
  }

  initializeDropzone(): void {
    const dropzoneOptions: Dropzone.DropzoneOptions = {
      url: './', // Placeholder URL
      autoProcessQueue: false,
      addRemoveLinks: true,
      maxFiles: 4,
      acceptedFiles: 'image/*',
      init: () => {
        const dropzone = Dropzone.forElement(this.dropzoneElement.nativeElement);
  
        dropzone.on('addedfile', (file) => {
          if (file.name.toLowerCase().includes('front')) {
            this.images['front'] = file;
          } else if (file.name.toLowerCase().includes('back')) {
            this.images['back'] = file;
          } else if (file.name.toLowerCase().includes('left')) {
            this.images['left'] = file;
          } else if (file.name.toLowerCase().includes('right')) {
            this.images['right'] = file;
          }
  
          if (dropzone.files.length > 4) {
            dropzone.removeFile(dropzone.files[0]);
          }
        });
  
        dropzone.on('removedfile', (file) => {
          if (file === this.images['front']) {
            this.images['front'] = undefined;
          } else if (file === this.images['back']) {
            this.images['back'] = undefined;
          } else if (file === this.images['left']) {
            this.images['left'] = undefined;
          } else if (file === this.images['right']) {
            this.images['right'] = undefined;
          }
        });
      }
    };
  
    if (this.dropzoneElement.nativeElement) {
      new Dropzone(this.dropzoneElement.nativeElement, dropzoneOptions);
    }
  }
  createRoomImage(): void {
    const dtoList: CreateRoomReservationImageDTO[] = Object.keys(this.images).map(key => ({
      path: key,
      image: this.images[key],
      examReservationId: this.roomImageForm.get('examReservationId')?.value,
      place: this.roomImageForm.get('place')?.value || ''
    }));

    this.roomService.createRoomImage(dtoList).subscribe(
      response => {
        console.log('Room images created successfully', response);
      },
      error => {
        console.error('Error creating room images', error);
      }
    );
  }
}
