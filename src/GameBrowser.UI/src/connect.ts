import { connect, MapStateToProps } from 'react-redux';
import { AppState } from './state';

/**
 * Connects a page component to the store.
 * @param component The page component to connect to the store.
 * @param mapStateToProps The state entry which is a match for the component.
 * @param dispatches A map of action creators that matches the component dispatch methods.
 */
export function pageConnector<TStateProps, TDispatches, TOwnProps = {}>(
    component: React.ComponentClass<any>,
    mapStateToProps: MapStateToProps<TStateProps, TOwnProps, AppState>,
    dispatches: ComponentDispatches<TDispatches>
) {
    const connected = connect<
        TStateProps,
        ComponentDispatches<TDispatches>,
        TOwnProps,
        AppState>(
            mapStateToProps,
            dispatches
        )(component);

    return connected;
}

export type ComponentDispatches<TDispatches> = {
    [K in keyof TDispatches]: () => void;
};


