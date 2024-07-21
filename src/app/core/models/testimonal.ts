export interface Testimonial {
  testimonialid: number;
  testimonalstateid: number;
  userid: number;
  testimonialtext: string;
  createdat: Date | null;
  updatedat: Date | null;
  examProviderId: number;
  image: string | null;
  firstName: string;
  lastName: string;
}
