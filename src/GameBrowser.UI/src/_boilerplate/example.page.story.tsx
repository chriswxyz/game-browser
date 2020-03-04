import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as React from 'react';
import { ExamplePage } from './example.page';
import { ExamplePageState } from './example.duck';

storiesOf('00 - Component Example', module)
    .add('Hello', () => {
        const viewModel: ExamplePageState['viewModel'] = {
            target: 'Storybook'
        };

        return <ExamplePage
            viewModel={viewModel}
            onButtonClicked={action('onButtonClicked')}
            onPageLoaded={action('onPageLoaded')}
        />
    })
