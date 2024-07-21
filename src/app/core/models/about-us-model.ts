export interface Aboutpoint {
  aboutpointsId: number;
  aboutId: number;
  listitem: string;
}

export interface About {
  aboutId: number;
  title: string;
  aboutpoints: Aboutpoint[];
}
