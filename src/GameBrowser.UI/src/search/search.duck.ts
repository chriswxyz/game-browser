import produce from "immer";
import { createThunk, ActionCreators } from "../util";

// ======================================================
// State Description
// ------------------------------------------------------
// Declares the possible states of this page, as well as
// all actions that can change it.
// ======================================================

export interface SearchPageSuccessState {
    imageUrls: string[];
    coverIndex: number;
    searchTerm: string;
    currentGame: GameResult | null;
    isLoading: boolean;
}

export interface SearchPageState {
    viewModel: SearchPageSuccessState;
    dataModel: {
        searchTerm: string;
        games: GameResult[];
    }
}

export interface SearchPageDispatches {
    pageLoaded(): void;
    searchSubmitted(): void;
    moveLeftClicked(): void;
    moveRightClicked(): void;
    searchTermChanged(payload: string): void;
}

export function actionCreators(): ActionCreators<SearchPageDispatches> {
    return {
        pageLoaded,
        searchSubmitted,
        moveLeftClicked,
        moveRightClicked,
        searchTermChanged
    }
}

// =========
// State
// =========

export function initialState(): SearchPageState {
    return {
        viewModel: {
            imageUrls: [],
            coverIndex: 0,
            searchTerm: '',
            currentGame: null,
            isLoading: false
        },
        dataModel: {
            searchTerm: '',
            games: []
        }
    };
}

export function reducer(state = initialState(), action: SearchAction): SearchPageState {
    return produce(state, next => {
        const vm = next.viewModel;
        switch (action.type) {
            case '@search:SEARCH_TERM_CHANGED': {
                next.dataModel.searchTerm = action.payload;
                vm.searchTerm = action.payload;
                return next;
            }
            case '@search:SEARCH_SUBMITTED_PENDING': {
                vm.isLoading = true;
                return next;
            }
            case '@search:SEARCH_SUBMITTED_SUCCESS': {
                next.dataModel.games = action.payload;
                const currentGame = action.payload[0] || null;
                const covers = action.payload
                    .map(x => x.coverId)
                    .map(x => `https://images.igdb.com/igdb/image/upload/t_cover_big/${x}.jpg`);

                next.viewModel = {
                    coverIndex: 0,
                    imageUrls: covers,
                    searchTerm: next.dataModel.searchTerm,
                    currentGame,
                    isLoading: false
                }
            }
            case '@search:MOVE_LEFT_CLICKED': {
                if (vm.coverIndex > 0) {
                    vm.coverIndex -= 1;
                }
                vm.currentGame = next.dataModel.games[vm.coverIndex];
                return next;
            }
            case '@search:MOVE_RIGHT_CLICKED': {
                if (vm.coverIndex < vm.imageUrls.length - 1) {
                    vm.coverIndex += 1;
                }
                vm.currentGame = next.dataModel.games[vm.coverIndex];
                return next;
            }
        }
    });
}

// =========
// Actions
// =========

export type SearchAction = PAGE_LOADED
    | SEARCH_TERM_CHANGED
    | SEARCH_SUBMITTED_PENDING
    | SEARCH_SUBMITTED_FAILURE
    | SEARCH_SUBMITTED_SUCCESS
    | MOVE_RIGHT_CLICKED
    | MOVE_LEFT_CLICKED
    ;

export interface PAGE_LOADED { type: '@search:PAGE_LOADED'; }

export function pageLoaded(): PAGE_LOADED {
    return {
        type: '@search:PAGE_LOADED'
    }
}

export interface SEARCH_SUBMITTED_PENDING { type: '@search:SEARCH_SUBMITTED_PENDING'; }
export interface SEARCH_SUBMITTED_FAILURE { type: '@search:SEARCH_SUBMITTED_FAILURE'; }
export interface SEARCH_SUBMITTED_SUCCESS { type: '@search:SEARCH_SUBMITTED_SUCCESS'; payload: GameResult[]; }

export const searchSubmitted = createThunk<SearchAction>(async (args, dispatch, getState) => {
    dispatch({ type: '@search:SEARCH_SUBMITTED_PENDING' });

    const { searchTerm } = getState().search.dataModel;

    const res = await fetch(`/api/v1/search?term=${searchTerm}`);
    try {
        const content = await res.json() as GameResult[];
        dispatch({ type: '@search:SEARCH_SUBMITTED_SUCCESS', payload: content });
    } catch (e) {
        dispatch({ type: '@search:SEARCH_SUBMITTED_FAILURE' });
    }
})

export interface SEARCH_TERM_CHANGED { type: '@search:SEARCH_TERM_CHANGED', payload: string; }

export function searchTermChanged(payload: string): SEARCH_TERM_CHANGED {
    return {
        type: '@search:SEARCH_TERM_CHANGED',
        payload
    }
}

export interface MOVE_LEFT_CLICKED { type: '@search:MOVE_LEFT_CLICKED' }
export interface MOVE_RIGHT_CLICKED { type: '@search:MOVE_RIGHT_CLICKED' }

export function moveLeftClicked(): MOVE_LEFT_CLICKED {
    return {
        type: '@search:MOVE_LEFT_CLICKED'
    }
}

export function moveRightClicked(): MOVE_RIGHT_CLICKED {
    return {
        type: '@search:MOVE_RIGHT_CLICKED'
    }
}

export interface GameResult {
    id: string;
    name: string;
    summary: string;
    slug: string;
    coverId: string;
    firstReleaseDate: string;
    url: string;
    platforms: string[];
}
