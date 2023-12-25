import { Component, Input } from '@angular/core';

@Component({
  selector: 'boolean-icon',
  templateUrl: './boolean-icon.component.html',
  styleUrls: ['./boolean-icon.component.scss']
})
export class BooleanIconComponent {
  @Input() value!: boolean;
  @Input() neutralTrue = false;
  @Input() neutralFalse = false;
  @Input() invertedColors = false;
}
