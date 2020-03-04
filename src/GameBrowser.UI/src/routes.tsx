import * as React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import { SearchPageController } from './search/search.page';

export class Routes extends React.Component {
    public render() {
        return <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <SearchPageController />
                </Route>
                <Route path='/two'>
                    <div>Two</div>
                </Route>
                <Route path="*">
                    <div>404!</div>
                </Route>
            </Switch>
        </BrowserRouter>
    }
}
