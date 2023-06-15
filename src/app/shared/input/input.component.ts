import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

type ErrorSource =
  | 'required'
  | 'pattern'
  | 'nonUniqueUserName'
  | 'minlength'
  | 'maxlength'
  | 'noConnection';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() inputType: string = 'text';

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  errorSource(source: ErrorSource) {
    const { errors } = this.control;
    return errors && errors[source];
  }

  requiredLength(length: 'minlength' | 'maxlength') {
    const { errors } = this.control;
    return errors && errors[length]['requiredLength'];
  }
}
