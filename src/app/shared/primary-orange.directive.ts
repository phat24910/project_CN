import { Directive, ElementRef, Renderer2, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPrimaryOrange]'
})
export class PrimaryOrangeDirective implements OnInit, OnChanges {
  @Input('appPrimaryOrange') customClass = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.applyOrange();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.applyOrange();
  }

  private applyOrange() {
    this.renderer.addClass(this.el.nativeElement, 'bg-orange-500');
    this.renderer.addClass(this.el.nativeElement, 'text-white');
    this.renderer.addClass(this.el.nativeElement, 'border');
    this.renderer.addClass(this.el.nativeElement, 'border-orange-500');
    this.renderer.addClass(this.el.nativeElement, 'hover:bg-orange-600');
    this.renderer.addClass(this.el.nativeElement, 'hover:border-orange-600');
    this.renderer.addClass(this.el.nativeElement, 'transition-colors');
    this.renderer.addClass(this.el.nativeElement, 'duration-200');
    if (this.customClass) {
      this.customClass.split(' ').forEach(cls => this.renderer.addClass(this.el.nativeElement, cls));
    }
  }
}
