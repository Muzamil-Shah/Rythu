import { bindActionCreators } from "redux";
import { ZONE_PICKER } from "../conistance/zoneConstants";

// export const zonePickerReducer = (state = {loading: true, zoneName: []},action) => {
//     switch(action.type){
//         case "REQ_ZONE_PICKER":
//             return {loading: true}
//         case ZONE_PICKER:
//             return {loading:false, zoneName:action.payload};
//         case "FAIL_ZONE":
//             return {loading: false, error: action.payload}
//         default:
//             return state;
//     }
// }

export const zonePickerReducer = (state = {loading: true, product: {}}, action) =>{
    switch (action.type){
        case "REQ_ZONE_PICKER":
            return {loading: true};
        case ZONE_PICKER:
            return {loading: false, product: action.payload};
        case "FAIL_ZONE":
            return {loading: false, error: action.payload};
        default:
            return state;
    } 
}