const initialState = {}

const BuscaReducers = (state = initialState, action) => {

    switch (action.type) {
        case 'FIND_EMP_ID':
            return { ...state, empId: action.payload, editItem: true }

        case 'DISABLE_EDIT':
            return { ...state, editItem: false }

        case 'CHANGE_SEARCH_VALUE':
            return { ...state, search: action.payload }

        case 'EDIT_VALUE':
            return { ...state, loadedData: action.payload }


        default:
            return state
    }
}

export default BuscaReducers