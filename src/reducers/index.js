import { ADD_MEDIA, REMOVE_MEDIA, REORDER_BACKLOG } from '../constants/action-types';
import { containsMedia, swap } from '../helpers';

const initialState = {
    backlog: [
        {
            Poster: "https://ia.media-imdb.com/images/M/MV5BODdlMjU0MDYtMWQ1NC00YjFjLTgxMDQtNDYxNTg2ZjJjZDFiXkEyXkFqcGdeQXVyMTU2NTcxNDg@._V1_SX300.jpg",
            Title: "Beta Test",
            Type: "movie",
            Year: "2016",
            imdbID: "tt4244162",
            Runtime: 88,
            Watched: false
        }, {
            Poster: "https://m.media-amazon.com/images/M/MV5BYzc3OGZjYWQtZGFkMy00YTNlLWE5NDYtMTRkNTNjODc2MjllXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg",
            Title: "Johnny Test",
            Type: "series",
            Year: "2005–2014",
            imdbID: "tt0454349",
            Runtime: 30,
            Watched: false
        }, {
            Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMzMDQwMzM2M15BMl5BanBnXkFtZTcwMzA1OTg1OQ@@._V1_SX300.jpg",
            Title: "The Test",
            Type: "movie",
            Year: "2013",
            imdbID: "tt2616114",
            Runtime: 89,
            Watched: false
        }
    ]
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MEDIA:
            if(containsMedia(state.backlog, action.payload) === -1) {
                return {...state, backlog: [...state.backlog, action.payload]};
            } else {
                return state;
            }
        case REMOVE_MEDIA:
            const filtered = state.backlog.filter((value, index, arr) => {
                return value.imdbID !== action.payload.imdbID;
            })
            return {...state, backlog: [...filtered]};
        case REORDER_BACKLOG:
            const position = containsMedia(state.backlog, action.payload.media);
            const newPosition = position + action.payload.direction;
            if(newPosition >= 0 && newPosition < state.backlog.length) {
                const reorderedBacklog = swap(state.backlog, position, newPosition);
                return {...state, backlog: [...reorderedBacklog]};
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default rootReducer;
