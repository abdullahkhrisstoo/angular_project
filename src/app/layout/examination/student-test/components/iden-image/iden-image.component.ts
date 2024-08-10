import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Dropzone from 'dropzone';
import { IdentificationImageService } from '../../../../../core/services/identification-image.service';
import { CreateIdentificationImageDTO } from '../../../../../core/DTO/create-identification-image-dto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-iden-image',
  templateUrl: './iden-image.component.html',
  styleUrl: './iden-image.component.css'
})
export class IdenImageComponent {
  identificationImageForm: FormGroup;
  selectedBackImage: File | null = null;
  selectedFrontImage: File | null = null;
  dropzone!: Dropzone;

  @ViewChild('dropzoneElement', { static: false }) dropzoneElement!: ElementRef;

  constructor(private fb: FormBuilder, private authService: IdentificationImageService,  private router: Router,) {
    this.identificationImageForm = this.fb.group({
      imageBack: [null, Validators.required],
      imageFront: [null, Validators.required],
    });
  }
  onPrevious(){

    this.router.navigate(['./examination/student-test/cam-test']);

  }
onNext(){

  this.router.navigate(['./examination/student-test/room-test']);
}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeDropzone();
  }

  initializeDropzone(): void {
    const self = this;

    const dropzoneOptions: Dropzone.DropzoneOptions = {
      url: './',
      autoProcessQueue: false,
      addRemoveLinks: true,
      maxFiles: 2,
      acceptedFiles: 'image/*',
      thumbnailWidth: undefined,
      thumbnailHeight: undefined,
      init: function() {
        const dz = this as Dropzone;
        dz.on('addedfile', function(file) {
          if (dz.files.length > 2) {
            dz.removeFile(file);
            return;
          }
          if (!self.selectedBackImage) {
            self.selectedBackImage = file;
            self.identificationImageForm.get('imageBack')?.setValue(file);
          } else if (!self.selectedFrontImage) {
            self.selectedFrontImage = file;
            self.identificationImageForm.get('imageFront')?.setValue(file);
          } else {
            dz.removeFile(file);
          }
        });

        dz.on('removedfile', function(file) {
          if (file === self.selectedBackImage) {
            self.selectedBackImage = null;
            self.identificationImageForm.get('imageBack')?.reset();
          } else if (file === self.selectedFrontImage) {
            self.selectedFrontImage = null;
            self.identificationImageForm.get('imageFront')?.reset();
          }
        });
      }
    };

    const dropzoneElement = this.dropzoneElement.nativeElement as HTMLElement & { dropzone?: Dropzone };
    if (dropzoneElement && !dropzoneElement.dropzone) {
      this.dropzone = new Dropzone(dropzoneElement, dropzoneOptions);
    }
  }

  createIdentificationImage(): void {
    if (this.identificationImageForm.invalid || this.dropzone.files.length !== 2) {
      return;
    }

    const createIdentificationImageDTO: CreateIdentificationImageDTO = {
      examReservationId: 69,
      imageBack: this.selectedBackImage!,
      imageFront: this.selectedFrontImage!
    };

    this.authService.createIdentificationImage(createIdentificationImageDTO).subscribe(
      response => {
        console.log('Identification image created successfully', response);
      },
      error => {
        console.error('Error creating identification image', error);
      }
    );
  }

}
