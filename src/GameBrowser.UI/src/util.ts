import { AppState } from "./state";

/** Does nothing! */
export function noop() { }

/**
 * Describes a more lenient version of the interface that components use to describe their dispatches. 
 * Allows a duck to fulfill a () => void with a () => Action or () => Thunk.
 */
export type ActionCreators<TDispatches> = {
    [K in keyof TDispatches]: (...args: any[]) => any;
}

/**
 * Creates a thunk to dispatch async actions.
 * @param io Function to do any I/O, can be async.
 */
export function createThunk<
    // Is this too clever? Tell the developer that we can help them with their dispatches.
    TAction extends { type: TAction['type'] } = { type: 'Please provide a TActions type arg to createThunk.' },
    TArgs = void
>(
    io: (args: TArgs, dispatch: (action: TAction) => void, getState: () => AppState) => any
) {
    return (args: TArgs) =>
        async (dispatch: (action: TAction) => void, getState: () => AppState) => {
            await io(args, dispatch, getState);
        }
}