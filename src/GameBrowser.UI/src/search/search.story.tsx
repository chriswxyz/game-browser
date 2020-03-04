import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { SearchInput } from './search.page';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

storiesOf('SearchInput', module)
    .addDecorator(storyFn => <div className='m-5'>{storyFn()}</div>)
    .add('Usage', () => {
        const searchTerm = text('searchTerm', 'sonic the hedgehog');
        return <SearchInput
            disabled={false}
            searchTerm={searchTerm}
            searchTermChanged={action('searchTermChanged')}
        />
    })
