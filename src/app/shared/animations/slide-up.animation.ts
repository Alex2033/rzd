import { trigger, style, animate, transition } from '@angular/animations';

export function slideUpAnimation(duration = 150) {
  return trigger('slideUp', [
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate(duration, style({ transform: 'translateY(0%)' })),
    ]),
    transition(':leave', [
      animate(duration, style({ transform: 'translateY(100%)' })),
    ]),
  ]);
}
