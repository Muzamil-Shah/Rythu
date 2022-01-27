import React from 'react';
import {GrMapLocation} from 'react-icons/gr'

function ZonePicker() {
// const [zoneLocation,setZoneLocation] = useState("")
//   const dispatch = useDispatch();





// zoneLocationStorage(zoneLocation)

//   useEffect(() => {
//     dispatch(pickZone(zoneLocation))
//   }, [dispatch,zoneLocation]);
  
  return (
  <div className='absolute top-0 left-0 z-50 w-full h-screen gradient flex justify-center items-center'>
      <div className="relative w-full border py-5 focus-within:border-lime-500 flex justify-start items-center">
              <label
                className="w-2/12 text-lg ml-2 gap-1 z-10 py-2.5 bg-white flex justify-center items-center "
                   
                
              >
                <GrMapLocation /> Zone Location 
              </label>
              <select
                name="Zone"
                id="Zone"
                type="text"
                value={localStorage.getItem("zoneLocation")}
                onChange={(e) => localStorage.setItem("zoneLocation", e.target.value)}
                  
                className=" w-10/12  mx-2 py-3  font-semibold focus:outline-none"
              >
                <option selected value="L.B.Nager">L.B.Nager</option>
                <option value="Charminar">Charminar</option>
                <option value="Khairatabad">Khairatabad</option>
                <option value="Secunderabad">Secunderabad</option>
                <option value="Serilingampally">Serilingampally</option>
                <option value="Kukatpally">Kukatpally</option>
              </select>
            </div>
  </div>);
}

export default ZonePicker;
