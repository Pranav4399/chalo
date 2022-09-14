import React, {useState} from 'react';
import Select from "react-draggable-multi-select";

const AddRoute = (props) => {
    const initialFormState = {id: null, name: '', direction: 'Up', status: 'Active', stops: []};
    const [currentRoute, setCurrentRoute] = useState(initialFormState);
    
    const handleStops = (e) => {
        let routeOrder = 1;
        e.map(route => route.routeOrder = routeOrder++)
        setCurrentRoute({...currentRoute, "stops": e})
    };
    return (
        <form onSubmit={e => {
            e.preventDefault();
            if (!currentRoute.name) { alert("Please enter Route Name"); return; }
            if (currentRoute.stops.length<2) { alert("Please select atleast two stops"); return; }
            props.addRoute(currentRoute)
            setCurrentRoute(initialFormState)
        }}>
            <label>Route Name</label>
            <input type="text" name="name" value={currentRoute.name} onChange={(e) => setCurrentRoute({...currentRoute, "name": e.target.value})}/>
            <label>Direction</label>
            <select value={currentRoute.direction} onChange={(e) => setCurrentRoute({...currentRoute, "direction": e.target.value})}>
                <option>Up</option>
                <option>Down</option>
            </select>
            <label>Status</label>
            <select value={currentRoute.status} onChange={(e) => setCurrentRoute({...currentRoute, "status": e.target.value})}>
                <option>Active</option>
                <option>Inactive</option>
            </select>
            <label>Stops List</label>
             <Select
                value={currentRoute.stops}
                onChange={handleStops}
                options={props.stops}
                isMulti={true}
                closeMenuOnSelect={false} //add if needed
            />
            <button>Add new Route</button>
        </form>
    )
};

export default AddRoute
