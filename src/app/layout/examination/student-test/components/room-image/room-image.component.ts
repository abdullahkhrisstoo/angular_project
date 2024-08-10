import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import Dropzone from 'dropzone';
import { RoomImageService } from '../../../../../core/services/room-image.service';
import { CreateRoomReservationImageDTO } from '../../../../../core/DTO/create-room-image-dto';
import { Router } from '@angular/router';


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
  onNext(){

    this.router.navigate(['./examination/student-test/exam-rules']);
  }

  constructor(private fb: FormBuilder, private roomService: RoomImageService,  private router: Router) {
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
          if (this.images['front']==undefined) {
            this.images['front'] = file;
          } else if (this.images['back']==undefined) {
            this.images['back'] = file;
          } else if (this.images['left']==undefined) {
            this.images['left'] = file;
          } else if (this.images['right']==undefined) {
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
      image: this.images[key],
      examReservationId: 69,
      place: key
    }));
  
    dtoList.forEach(e=>{
     
      if(e.image==null){
        alert("upload four images")
        return;
      }

    })
    dtoList.forEach(e=>{
      this.roomService.createRoomImage(e).subscribe(
        response => {
          console.log('Room images created successfully', response);
        },
        error => {
          console.error('Error creating room images', error);
        }
      );

    });
  
  }
}

