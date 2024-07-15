
import { AbstractControl, ValidatorFn } from '@angular/forms';
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_NUMBER_REGEX = /^[0-9]{10}$/;

//todo: higher order function recive function, 
//todo: use factory design pattern
//todo: abstract class is parent class for formgroup, formarray, 
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}
