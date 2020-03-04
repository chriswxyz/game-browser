import produce from "immer";
import { PageState } from "../state";

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
    viewModel: PageState<ExamplePageSuccessState, {}>
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
            kind: 'loading'
        }
    };
}

export function reducer(state = initialState(), action: ExampleAction): ExamplePageState {
    return produce(state, next => {
        if (next.viewModel.kind === 'loading') {
            switch (action.type) {
                case '@example:PAGE_LOADED': {
                    next.viewModel = {
                        kind: 'success',
                        value: {
                            target: 'world'
                        }
                    }
                    return next;
                }
                default: return next;
            }
        }

        if (next.viewModel.kind === 'success') {
            switch (action.type) {
                case '@example:BUTTON_CLICKED': {
                    next.viewModel.value.target = 'I was clicked!'
                }
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
