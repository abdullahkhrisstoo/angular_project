import { Component } from '@angular/core';
import { faUpload, faCreditCard, faUsers, faMicrophoneSlash, faMessage } from '@fortawesome/free-solid-svg-icons';

import { LocalStorageService } from '../../../../core/services/local-storage.service';

type IconType = 'microphone' | 'video' | 'upload' | 'creditCard' | 'users' | 'screenShare' | 'remoteCamera';

@Component({
  selector: 'app-proctor-examination',
  templateUrl: './proctor-examination.component.html',
  styleUrl: './proctor-examination.component.css'
})
export class ProctorExaminationComponent {

  faMicrophoneSlash = faMicrophoneSlash;
  faMessage = faMessage;
  faUpload = faUpload;
  faCreditCard = faCreditCard;
  faUsers = faUsers;
  isChatVisible = false;
  activeIcons: { [key in IconType]: boolean } = {
    microphone: false,
    video: false,
    upload: false,
    creditCard: false,
    users: false,
    screenShare: false,
    remoteCamera: false
  };

  constructor(private cache: LocalStorageService) { }

  toggleIcon(iconName: IconType) {
    this.activeIcons[iconName] = !this.activeIcons[iconName];
    if (iconName === 'video') {
      this.isChatVisible = !this.isChatVisible;
    }
  }
}
