import mapServerResponse from "./map-response";

export const SEARCH = 'tidal/search/LOAD';
export const SEARCH_SUCCESS = 'tidal/search/LOAD_SUCCESS';
export const SEARCH_FAIL = 'tidal/search/LOAD_FAIL';


interface ReduxAction {
    type: string;
    payload: any;
}

export default function reducer(state = { results: [] }, action: ReduxAction) {
    switch (action.type) {
        case SEARCH:
            return { ...state, loading: true };
        case SEARCH_SUCCESS:
            return { ...state, loading: false, results: mapServerResponse(action.payload.data) };
        case SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching data'
            };
        default:
            return state;
    }
}

export function search(searchTerm: string) {
    return {
        type: SEARCH,
        payload: {
            request: {
                url: '/search?term=' + searchTerm
            }
        }
    };
}

export function browse(uri: string, prevUri: string = 'tidal://') {
    const encodedUri = encodeURIComponent(uri);
    const encodedPrevUri = encodeURIComponent(prevUri);

    return {
        type: SEARCH,
        payload: {
            request: {
                url: `/browse?uri=${encodedUri}&prevUri=${encodedPrevUri}`
            }
        }
    };
}
