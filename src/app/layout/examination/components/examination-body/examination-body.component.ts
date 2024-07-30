import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Question } from '../../../../core/DTO/examination-dto';

@Component({
  selector: 'app-examination-body',
  templateUrl: './examination-body.component.html',
  styleUrls: ['./examination-body.component.css']
})
export class ExaminationBodyComponent implements OnInit {

  @Input() question!: Question;
  @Input() selectedQuestionId!: number;
  @Input() isLastQuestion!: boolean;

  @Output() prevQuestion = new EventEmitter<void>();
  @Output() nextQuestion = new EventEmitter<void>();
  @Output() submitExam = new EventEmitter<void>();

  messages: { user: boolean, text: string, time: string }[] = [];
  messageText: string = '';

  ngOnInit() {
    // Initialize with some messages for testing
    this.messages = [
      { user: false, text: 'Hello. How may I help you?', time: '09:32' },
      { user: true, text: 'I have some problem', time: '09:34' }
    ];
  }

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
      const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      this.messages.push({ user: true, text: this.messageText, time: currentTime });
      this.messageText = '';
      // Simulate a bot response
      setTimeout(() => {
        this.messages.push({ user: false, text: 'Hello. How may I help you?', time: currentTime });
      }, 1000);
    }
  }
}
