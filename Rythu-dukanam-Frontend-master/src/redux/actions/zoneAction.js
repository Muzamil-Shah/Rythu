import { ZONE_PICKER } from "../conistance/zoneConstants"

export const pickZone = (zoneLocation) => async(dispatch) => {
    dispatch({type: "REQ_ZONE_PICKER", payload:zoneLocation})
    try {
        const data = await zoneLocation
        // console.log(data)
        dispatch({type: ZONE_PICKER, payload:data})
    } catch (error){
        dispatch({type: "FAIL_ZONE", payload: error})
    }
}