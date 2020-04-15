import { Directive, HostListener, Input, Output, ElementRef, EventEmitter } from '@angular/core';


@Directive({
  selector: 'input[type=checkbox][checkModel]'
})
export class CheckboxDirectiveDirective {
  @Input() checkModel:any;
  @Input() trueValue:any;
  @Input() falseValue:any;
  @Output() checkModelChange = new EventEmitter<any>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
     this.el.nativeElement.checked = this.checkModel==this.trueValue;
  }

  @HostListener('change', ['$event']) onChange(event:any) {
      this.checkModel = event.target.checked ? this.trueValue : this.falseValue;
      this.checkModelChange.emit(this.checkModel);
  }

}