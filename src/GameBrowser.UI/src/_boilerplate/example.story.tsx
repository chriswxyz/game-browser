import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Example } from './example';

storiesOf('00 - Component Example', module)
    .add('Hello', () => {
        return <Example emoji='🦄' />
    })
