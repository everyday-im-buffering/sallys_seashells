import axios from "axios";

//action types
const SET_SINGLE_SHELL = "SET_SINGLE_SHELL"

//action creators
export const setSingleShell = (singleShell) => {
    return {
        type: SET_SINGLE_SHELL,
        singleShell
    }
}

//thunk
export const fetchSingleShell = (id) => {
    return async(dispatch) => {
        try {
            const {data:singleShell} = await axios.get(`/api/shells/${id}`)
            dispatch(setSingleShell(singleShell))
        }catch(err){
            console.log(err)
        }
    }
}

//reducer

export default function singleShellReducer(state = {}, action){
    switch(action.type){
        case SET_SINGLE_SHELL:
            return action.singleShell
            default:
                return state
    }
}