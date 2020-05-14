const initState = [
    
]

export function cart(state = initState, action) {
    console.log(state);
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.productData];
        default:
            return state;
    }
}