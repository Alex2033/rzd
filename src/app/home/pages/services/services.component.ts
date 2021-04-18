import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChildren('services') services: QueryList<ElementRef>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.focusBlock();
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    this.focusBlock();
  }

  focusBlock(): void {
    const viewportHeight = window.innerHeight;

    this.services.forEach((card) => {
      const topPos = card.nativeElement.getBoundingClientRect().top;

      if (topPos > viewportHeight / 4.5 && topPos < viewportHeight / 1.3) {
        card.nativeElement.classList.add('focused');
      } else {
        card.nativeElement.classList.remove('focused');
      }
    });
  }
}
