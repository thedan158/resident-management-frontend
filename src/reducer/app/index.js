const initialState = {
    isAppReady: false,
    isAppError: false,
    loading: false,
    saving: false,
};

export default function AppReducer(state = initialState, action) {
    switch (action.type) {
        case "api.loading":
            return {
                ...state,
                loading: true
            }
        case "api.success":
            return {
                ...state,
                loading: false
            }
        case "saving.loading": {
            return {
                ...state,
                saving: true
            }
        }
        case "saving.success": {
            return {
                ...state,
                saving: false
            }
        }
        case "bootstrap": {
            return {
                ...state,
                loading: false,
                isAppReady: true
            }
        }
        case "system.error": {
            return {
                ...state,
                loading: false,
                isAppError: true
            }
        }
        default:
            return state
    }
}