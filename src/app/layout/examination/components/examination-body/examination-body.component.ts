import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../core/DTO/examination-dto';

@Component({
  selector: 'app-examination-body',
  templateUrl: './examination-body.component.html',
  styleUrls: ['./examination-body.component.css']
})
export class ExaminationBodyComponent {

  @Input() question!: Question;
  @Input() selectedQuestionId!: number;
  @Input() isLastQuestion!: boolean;

  @Output() prevQuestion = new EventEmitter<void>();
  @Output() nextQuestion = new EventEmitter<void>();
  @Output() submitExam = new EventEmitter<void>();

  messages: { user: boolean, text: string }[] = [];
  messageText: string = '';

  onPrevQuestion() {
    this.prevQuestion.emit();
  }

  onNextQuestion() {
    this.nextQuestion.emit();
  }

  onSubmitExam() {
    this.submitExam.emit();
  }

  openChatModal() {
    const modalElement = document.getElementById('chatModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    } else {
      console.error('Chat modal element not found');
    }
  }

  closeChatModal() {
    const modalElement = document.getElementById('chatModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    } else {
      console.error('Chat modal element not found');
    }
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.messages.push({ user: true, text: this.messageText });
      this.messageText = '';
      // Simulate a bot response
      setTimeout(() => {
        this.messages.push({ user: false, text: 'Hello. How may I help you?' });
      }, 1000);
    }
  }
}
