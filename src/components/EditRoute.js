import React, {useState, useEffect} from 'react'
import Select from "react-draggable-multi-select";

const EditRouteForm = props => {
    const [data, setData] = useState(props.currentRoute);
    useEffect(() => {
        setData(props.currentRoute);
    }, [props]);

    const handleStops = (e) => {
        let routeOrder = 1;
        e.map(route => route.routeOrder = routeOrder++)
        setData({...data, "stops": e})
    };

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                if (!data.name) { alert("Please enter Route Name"); return; }
                if (data.stops.length<2) { alert("Please select atleast two stops"); return; }
                props.updateRoute(data.id, data);
            }}
        >
            <label>Route Name</label>
            <input type="text" name="name" value={data.name} onChange={(e) => setData({...data, "name": e.target.value})}/>
            <label>Direction</label>
            <select value={data.direction} onChange={(e) => setData({...data, "direction": e.target.value})}>
                <option>Up</option>
                <option>Down</option>
            </select>
            <label>Status</label>
            <select value={data.status} onChange={(e) => setData({...data, "status": e.target.value})}>
                <option>Active</option>
                <option>Inactive</option>
            </select>
            <label>Stops List</label>
             <Select
                value={data.stops}
                onChange={handleStops}
                options={props.stops}
                isMulti={true}
                closeMenuOnSelect={false} //add if needed
            />
            <button>Update Route</button>
            <button onClick={() => props.setEditing(false)} className="button muted-button">
                Cancel
            </button>
        </form>
    )
}

export default EditRouteForm
