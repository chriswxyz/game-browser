import * as React from 'react';
import { pageConnector } from '../connect';
import { PageProps } from '../state';
import * as Duck from './example.duck';


export type ExamplePageProps = PageProps<Duck.ExamplePageState, Duck.ExamplePageDispatches>;

export class ExamplePage extends React.Component<ExamplePageProps> {
    public componentDidMount = this.props.onPageLoaded;

    public render() {
        const { viewModel } = this.props;
        if (viewModel.kind === 'loading') {
            return <div>Loading...</div>
        }

        if (viewModel.kind === 'error') {
            return <div>Failed to load!</div>
        }

        const { target } = viewModel.value;

        return <div className='m-5 p-5 rounded flex flex-col'>
            <h1>New Page</h1>
            <div>Hello, {target}!</div>
        </div>
    }
}

export const ExamplePageController = pageConnector<
    Duck.ExamplePageState,
    Duck.ExamplePageDispatches
>(
    ExamplePage,
    s => s._boilerplate,
    Duck.actionCreators
)
