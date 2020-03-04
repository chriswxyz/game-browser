import produce from "immer";

// ======================================================
// State Description
// ------------------------------------------------------
// Declares the possible states of this page, as well as
// all actions that can change it.
// ======================================================

export interface ExamplePageSuccessState {
    target: string;
}

export interface ExamplePageState {
    viewModel: ExamplePageSuccessState
}

export interface ExamplePageDispatches {
    onPageLoaded(): void;
    onButtonClicked(): void;
}

export const actionCreators: ExamplePageDispatches = {
    onPageLoaded,
    onButtonClicked
}

// =========
// State
// =========

export function initialState(): ExamplePageState {
    return {
        viewModel: {
            target: ''
        }
    };
}

export function reducer(state = initialState(), action: ExampleAction): ExamplePageState {
    return produce(state, next => {
        switch (action.type) {
            case '@example:PAGE_LOADED': {
                next.viewModel = {
                    target: 'world'
                }
                return next;
            }
            case '@example:BUTTON_CLICKED': {
                next.viewModel.target = 'I was clicked!'
                return next;
            }
        }
    });
}

// =========
// Actions
// =========

export type ExampleAction = PAGE_LOADED
    | BUTTON_CLICKED
    ;

export interface PAGE_LOADED { type: '@example:PAGE_LOADED'; }

export function onPageLoaded(): PAGE_LOADED {
    return {
        type: '@example:PAGE_LOADED'
    }
}

export interface BUTTON_CLICKED { type: '@example:BUTTON_CLICKED'; }

export function onButtonClicked(): BUTTON_CLICKED {
    return {
        type: '@example:BUTTON_CLICKED'
    }
}
