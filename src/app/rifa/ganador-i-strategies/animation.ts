import {trigger, state, style, animate, transition } from '@angular/animations';

const noDisplayTextState = state('noDisplayText', style({
    opacity: '0'
}));

const displayTextState = state('displayText', style({
    opacity: '1'
}));

const textTransition = transition('* => *',
    animate(2000)
);

const textTrigger = trigger('textTrigger', [
    noDisplayTextState,
    displayTextState,
    textTransition
]);

export { textTrigger };
