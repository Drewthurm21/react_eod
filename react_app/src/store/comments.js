//CONSTANTS
const GET_COMMENTS = 'comments/LOAD'
const ADD_COMMENT = 'comment/ADD'
const DELETE_COMMENT = 'comment/DELETE'

//ACTION CREATORS
const getCommentsAction = (commentsOject) => {
    return {
        type: GET_COMMENTS,
        payload: commentsOject
    }
}
const addCommentAction = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

const deleteCommentAction = (deletedComment) => {
    return {
        type: DELETE_COMMENT,
        payload: deletedComment
    }
}

//THUNKS
export const getCommentsThunk = () => async (dispatch) => {
    const response = await fetch('/comments')
    let comment_obj = await response.json()
    let commentArr = comment_obj.comments
    if (response.ok) {
        dispatch(getCommentsAction(commentArr))
    } else {
        //error stuff
    }
}

export const createNewCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch('/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        let newComment = await res.json()
        dispatch(addCommentAction(newComment))
    } else {
        //handle errors
    }
}

export const deleteCommentThunk = (id) => async (dispatch) => {
    const response = await fetch(`/delete/${id}`)
    if (response.ok) {
        dispatch(deleteCommentAction(id))
    } else {
        //error stuff
    }
}

//REDUCER
const initialState = {}
export default function commentsReducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload
        case ADD_COMMENT:
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_COMMENT:
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}
