import { Injectable } from '@angular/core';
import { Exam, Question } from '../DTO/examination-dto';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private exam: Exam = {
    exam_name: 'Sample Exam',
    duration_In_Minute:50,
    student_name:"abdullah khrais",
    questions: [
      {
        id: 1,
        title: 'Question 1',
        content: 'What is Angular?',
        answers: [
          { text: 'A framework for building web applications', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 2,
        title: 'Question 2',
        content: 'What is TypeScript?',
        answers: [
          { text: 'A superset of JavaScript', isCorrect: true },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A CSS framework', isCorrect: false },
          { text: 'A database', isCorrect: false }
        ]
      },
      {
        id: 3,
        title: 'Question 3',
        content: 'What is HTML?',
        answers: [
          { text: 'A markup language for creating web pages', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 4,
        title: 'Question 4',
        content: 'What is CSS?',
        answers: [
          { text: 'A stylesheet language for styling web pages', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 5,
        title: 'Question 5',
        content: 'What is JavaScript?',
        answers: [
          { text: 'A programming language for web development', isCorrect: true },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      // Add more questions in the same pattern until you reach 25 questions
      {
        id: 6,
        title: 'Question 6',
        content: 'What is Node.js?',
        answers: [
          { text: 'A JavaScript runtime built on Chrome\'s V8 engine', isCorrect: true },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 7,
        title: 'Question 7',
        content: 'What is React?',
        answers: [
          { text: 'A JavaScript library for building user interfaces', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 8,
        title: 'Question 8',
        content: 'What is Vue.js?',
        answers: [
          { text: 'A JavaScript framework for building user interfaces', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 9,
        title: 'Question 9',
        content: 'What is SASS?',
        answers: [
          { text: 'A preprocessor scripting language that is interpreted or compiled into CSS', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 10,
        title: 'Question 10',
        content: 'What is LESS?',
        answers: [
          { text: 'A backward-compatible language extension for CSS', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 11,
        title: 'Question 11',
        content: 'What is jQuery?',
        answers: [
          { text: 'A fast, small, and feature-rich JavaScript library', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 12,
        title: 'Question 12',
        content: 'What is Bootstrap?',
        answers: [
          { text: 'A front-end framework for developing responsive websites', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 13,
        title: 'Question 13',
        content: 'What is SQL?',
        answers: [
          { text: 'A domain-specific language used in programming and designed for managing data held in a relational database', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 14,
        title: 'Question 14',
        content: 'What is MongoDB?',
        answers: [
          { text: 'A source-available cross-platform document-oriented database program', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 15,
        title: 'Question 15',
        content: 'What is Express.js?',
        answers: [
          { text: 'A back end web application framework for Node.js', isCorrect: true },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 16,
        title: 'Question 16',
        content: 'What is REST?',
        answers: [
          { text: 'A software architectural style that defines a set of constraints to be used for creating web services', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 17,
        title: 'Question 17',
        content: 'What is GraphQL?',
        answers: [
          { text: 'An open-source data query and manipulation language for APIs', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 18,
        title: 'Question 18',
        content: 'What is Docker?',
        answers: [
          { text: 'A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers', isCorrect: true },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 19,
        title: 'Question 19',
        content: 'What is Kubernetes?',
        answers: [
          { text: 'An open-source container-orchestration system for automating computer application deployment, scaling, and management', isCorrect: true },
          { text: 'A programming language', isCorrect: false },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 20,
        title: 'Question 20',
        content: 'What is Python?',
        answers: [
          { text: 'A high-level, general-purpose programming language', isCorrect: true },
          { text: 'A type of snake', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 21,
        title: 'Question 21',
        content: 'What is Java?',
        answers: [
          { text: 'A high-level, class-based, object-oriented programming language', isCorrect: true },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 22,
        title: 'Question 22',
        content: 'What is C#?',
        answers: [
          { text: 'A modern, object-oriented, and type-safe programming language', isCorrect: true },
          { text: 'A musical note', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 23,
        title: 'Question 23',
        content: 'What is PHP?',
        answers: [
          { text: 'A popular general-purpose scripting language that is especially suited to web development', isCorrect: true },
          { text: 'A type of coffee', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 24,
        title: 'Question 24',
        content: 'What is Ruby?',
        answers: [
          { text: 'A dynamic, open source programming language with a focus on simplicity and productivity', isCorrect: true },
          { text: 'A type of gemstone', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      },
      {
        id: 25,
        title: 'Question 25',
        content: 'What is Swift?',
        answers: [
          { text: 'A powerful and intuitive programming language for macOS, iOS, watchOS, and tvOS', isCorrect: true },
          { text: 'A type of bird', isCorrect: false },
          { text: 'A database', isCorrect: false },
          { text: 'A web server', isCorrect: false }
        ]
      }
    ]
  };

  getExam(): Exam {
    return this.exam;
  }

  getTotalQuestions(): number {
    return this.exam.questions.length;
  }

  getQuestionById(id: number): Question | null {
    return this.exam.questions.find(q => q.id === id) || null;
  }
}
