import * as BoilerplateDuck from './_boilerplate/example.duck';
import * as SearchDuck from './search/search.duck';

export interface AppState {
    _boilerplate: BoilerplateDuck.ExamplePageState;
    search: SearchDuck.SearchPageState;
}

export const allReducers: MappedReducers<AppState> = {
    _boilerplate: BoilerplateDuck.reducer,
    search: SearchDuck.reducer
};

// Ensures that all entries in state have a corresponding reducer.
export type MappedReducers<TState> = {
    [K in keyof TState]: (state: TState[K], action: any) => TState[K];
};

/**
 * Provides a convenient model for page states to follow, less repetition
 * and more refactorability when defining page component state.
 */ 
export type PageProps<TStateProps extends { viewModel: TStateProps['viewModel'] }, TDispatchProps> = TStateProps & TDispatchProps;
