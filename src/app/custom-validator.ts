import { FormControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static number(prms): ValidatorFn {
        return (control: FormControl): { [key: string]: boolean } => {
            let val: number = control.value;
            if (isNaN(val) || /\D/.test(val.toString())) {

                return { number: true };
            } else if (!isNaN(prms.min) && !isNaN(prms.max)) {

                return val < prms.min || val > prms.max ? { "number": true } : null;
            } else if (!isNaN(prms.min)) {

                return val < prms.min ? { "number": true } : null;
            } else if (!isNaN(prms.max)) {

                return val > prms.max ? { "number": true } : null;
            } else {

                return null;
            }
        };
    }

}