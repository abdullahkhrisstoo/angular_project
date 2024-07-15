import { FormControl, Validators } from '@angular/forms';
import { PHONE_NUMBER_REGEX } from './regex-patterns.constants';

export const EMAIL_CONTROL: FormControl = new FormControl('', [
  Validators.required,
  Validators.email,
]);

export const PHONE_CONTROL: FormControl = new FormControl('', [
  Validators.required,
  Validators.pattern(PHONE_NUMBER_REGEX),
]);

export const NAME_CONTROL: FormControl = new FormControl('', [
  Validators.required,
  Validators.minLength(2),
]);

export const AGE_CONTROL: FormControl = new FormControl('', [
  Validators.required,
  Validators.min(18),
]);
export const PASSWORD_CONTROL: FormControl = new FormControl('', [
  Validators.required,
  Validators.minLength(6),
]);
