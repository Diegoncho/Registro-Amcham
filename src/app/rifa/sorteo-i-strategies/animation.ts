import {trigger, state, style, animate, transition } from '@angular/animations';

const placesStates = [];

placesStates.push(state('placeState1', style({
    top: '0%',
    left: '5%',
    zIndex: '2'
})));

placesStates.push(state('placeState2', style({
    top: '70%',
    left: '0%',
    zIndex: '4'
})));

placesStates.push(state('placeState3', style({
    top: '70%',
    left: '40%',
    zIndex: '5'
})));

placesStates.push(state('placeState4', style({
    top: '15%',
    left: '10%',
    zIndex: '4'
})));

placesStates.push(state('placeState5', style({
    top: '20%',
    left: '35%',
    zIndex: '3'
})));

placesStates.push(state('placeState6', style({
    top: '65%',
    left: '40%',
    zIndex: '2'
})));

placesStates.push(state('placeState7', style({
    top: '50%',
    left: '40%',
    zIndex: '1'
})));

placesStates.push(state('placeState8', style({
    top: '35%',
    left: '5%',
    zIndex: '5'
})));

placesStates.push(state('placeState9', style({
    top: '30%',
    left: '70%',
    zIndex: '2'
})));

placesStates.push(state('placeState10', style({
    top: '0%',
    left: '70%',
    zIndex: '1'
})));

const placeToPlaceTransition = transition('* => *',
    animate('2s')
);

const placesTrigger = trigger('placesTrigger', [
    ...placesStates,
    placeToPlaceTransition
]);

export { placesStates, placesTrigger };
