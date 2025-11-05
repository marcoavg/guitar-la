import type { Activity } from "../types"

export type ActivityActions = {
    type: 'save_activity',
    payload: { activity: Activity }
}


type ActivityState = {
    activities: Activity[]

}

export const initialState: ActivityState = {
    activities: []
}



export const activityReducer =  (
    state: ActivityState = initialState, 
    action: ActivityActions
) =>{
    switch(action.type){
        case 'save_activity':
            console.log(action.payload.activity);
            return {
                ...state,
                activities: [...state.activities, action.payload.activity]
            }
        default:
            return state;
    }
}
