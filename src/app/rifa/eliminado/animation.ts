import {trigger, state, style, animate, transition } from '@angular/animations';

const content_transition_tick = 1100;
const container_transition_tick = 8000;

// States
const contentCenterState = state('contentCenter', style({
    transform: 'rotate(0deg)',
    left: '50%'
}));

const contentLeftState = state('contentLeft', style({
    transform: 'rotate(30deg)',
    left: '0%'
}));

const contentRightState = state('contentRight', style({
    transform: 'rotate(-30deg)',
    left: '100%'
}));

const containerTopState = state('containerTop', style({
    top: '-50%'
}));

const containerBottomState = state('containerBottom', style({
    top: '100%'
}));

const noDisplayTextState = state('noDisplayText', style({
    opacity: '0'
}));

const displayTextState = state('displayText', style({
    opacity: '1'
}));

// Transitions
const contentTransition = transition('* => *',
    animate(content_transition_tick)
);

const containerTopToBottomTransition = transition('containerTop => containerBottom',
    animate(container_transition_tick)
);

const textTransition = transition('* => displayText',
    animate(2000)
);

// Triggers
const contentTrigger = trigger('contentTrigger', [
    contentCenterState,
    contentLeftState,
    contentRightState,
    contentTransition,
]);

const containerTrigger = trigger('containerTrigger', [
    containerTopState,
    containerBottomState,
    containerTopToBottomTransition
]);

const textTrigger = trigger('textTrigger', [
    noDisplayTextState,
    displayTextState,
    textTransition
]);

export { contentTrigger, containerTrigger, textTrigger, content_transition_tick, container_transition_tick };
