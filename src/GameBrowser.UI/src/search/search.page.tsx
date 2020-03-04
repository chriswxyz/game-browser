import * as React from 'react';
import { pageConnector } from '../connect';
import { PageProps } from '../state';
import { CoverGallery } from './cover-gallery';
import * as Duck from './search.duck';

export type SearchPageProps = PageProps<Duck.SearchPageState, Duck.SearchPageDispatches>;

export class SearchPage extends React.Component<SearchPageProps> {
    public componentDidMount = this.props.pageLoaded;

    public searchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.searchTermChanged(e.currentTarget.value);
    }

    public searchSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.searchSubmitted();
    }

    public render() {
        const { viewModel } = this.props;

        const { isLoading, searchTerm, currentGame, imageUrls: covers } = viewModel;

        let gameSummaryEl = null;

        if (isLoading) {
            gameSummaryEl = <div className='flex justify-center items-center m-5 p-5 text-2xl'>
                <div className='flex'>
                    <div className='loading'>👾</div>
                    <div className='loading animation-delay-1'>👾</div>
                    <div className='loading animation-delay-2'>👾</div>
                </div>
            </div>;
        } else if (currentGame) {
            const releaseYear = currentGame.firstReleaseDate
                ? new Date(parseInt(currentGame.firstReleaseDate) * 1000).getFullYear()
                : null;
            gameSummaryEl = <div className='flex flex-wrap'>
                <CoverGallery
                    {...viewModel}
                    {...this.props}
                />
                <div className='flex-1' style={{ minWidth: '30rem' }}>
                    <div className='text-white p-4'>
                        <div className='font-2p text-xl'>{currentGame.name}</div>
                        <div className='text-lg font-bold'>{releaseYear}</div>
                        <div className='text-lg font-bold'>{currentGame.platforms.join(', ')}</div>
                        <div>{currentGame.summary}</div>
                    </div>
                </div>
            </div>;
        }

        return <div className='m-3 rounded flex flex-col'>
            <form onSubmit={this.searchSubmitted} className='flex flex-wrap justify-around sm:justify-between'>
                <div className='flex items-center'>
                    <span className='text-xl mb-1 mr-1'>🕹️</span>
                    <h1 className='font-2p text-xl text-white'>GameBrowser</h1>
                </div>
                <SearchInput disabled={isLoading} searchTerm={searchTerm} searchTermChanged={this.searchTermChanged} />
            </form>
            {gameSummaryEl}
        </div>;
    }
}

export interface SearchInputProps {
    disabled: boolean;
    searchTerm: string;
    searchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput(props: SearchInputProps) {
    const { searchTerm, searchTermChanged, disabled } = props;

    const buttonClass = [
        'rounded-r-full',
        'p-2',
        'pr-4',
        'text-white',
        'bg-black',
        'hover:bg-teal-400',
        'hover:text-black',
        'hover:border-teal-400',
        'focus:border-teal-400',
        'border-black',
        'border-2',
        'focus:outline-none',
        'whitespace-no-wrap'
    ].join(' ');

    return <div className='flex items-center'>
        <input disabled={disabled} className='rounded-l-full p-2 pl-4 focus:border-teal-400 border-2 outline-none' type='text' placeholder='Search for games...' autoFocus onChange={searchTermChanged} value={searchTerm} />
        <button disabled={disabled} className={buttonClass} type='submit'>🎏 SEARCH</button>
    </div>
}

export const SearchPageController = pageConnector<
    Duck.SearchPageState,
    Duck.SearchPageDispatches
>(
    SearchPage,
    s => s.search,
    Duck.actionCreators()
);
