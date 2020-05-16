const initState = [
    
]

export function login(state = initState, action) {
    switch (action.type) {
        case 'LOGIN':
            return [...state, action.responseToken];
        default:
            return state;
    }
}