import * as React from 'react';

export interface ExampleProps {
    emoji: string | null;
}

export function Example(props: ExampleProps) {
    const { emoji } = props;

    return <div className='text-xl text-white'>
        Hello, world! {emoji}
    </div>;
}
