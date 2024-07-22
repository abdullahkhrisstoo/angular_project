// exam-provider.model.ts
export interface ExamProvider {
  image: string | null;
  user: User | null;
}

// user.model.ts
export interface User {
  firstName: string;
  lastName: string;
  createdAt: string; // يمكنك استخدام Date إذا كنت تفضل التعامل مع التواريخ ككائنات Date
}

// top-exam-modle.model.ts
export class TopExamModle {
  image: string | null;
  user: User | null;

  constructor(image: string | null, user: User | null) {
    this.image = image;
    this.user = user;
  }
}
