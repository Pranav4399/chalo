import React, {useEffect, useState} from 'react';
import RouteTable from './components/ViewRoute';
import AddRouteForm from './components/AddRoute';
import EditRouteForm from './components/EditRoute';
import { Map } from './Map';
import './App.css';

const App = () => {
    const stopsData = [
        {id: 0, label: 'Chennai', value: 'chennai', lat: 13.0827, lng: 80.2707},
        {id: 1, label: 'Bengaluru', value: 'bengaluru', lat: 12.9716, lng: 77.5946},
        {id: 2, label: 'Mumbai', value: 'mumbai', lat: 19.0760, lng: 72.8777},
        {id: 3, label: 'Delhi', value: 'delhi', lat: 28.7041, lng: 77.1025},
        {id: 4, label: 'Kolkata', value: 'kolkatta', lat: 22.5726, lng: 88.3639},
        {id: 5, label: 'Hyderabad', value: 'hyderabad', lat: 17.3850, lng: 78.4867},
    ];

    const [stops, setStops] = useState(stopsData)
    const [routesData, setRoutesData] = useState([]);

    const initialFormState = {id: null, name: '', direction: '', status: '', stops: []};
    const [currentRoute, setCurrentRoute] = useState(initialFormState);

    const [editing, setEditing] = useState(false);

    const [polyline, setPolyline] = useState([])
    const [showRoute, setShowRoute] = useState(false);

    useEffect(()=>{
        setRoutesData(JSON.parse(localStorage.getItem("routes") || "[]"))
    },[]);

    const addRoute = (route) => {
        route.id = 1 +  Math.floor(Math.random() * (99));
        localStorage.setItem('routes', JSON.stringify([...routesData, route]));
        setRoutesData(JSON.parse(localStorage.getItem("routes") || "[]"))
    };

    const editRow = (route) => {
        setEditing(true);
        setCurrentRoute({id: route.id, 
                         name: route.name, 
                         direction: route.direction,
                         status: route.status,
                         stops: route.stops,
                         routeOrder: route.routeOrder
                        })
    };

    const mapView = (route) => {
        setPolyline([])
        setShowRoute(!showRoute);
        if(!showRoute)
            route.stops.forEach(stop => {
                setPolyline(polyline => [...polyline, [stop.lat, stop.lng, stop.routeOrder]]);
            });
    };

    const deleteRoute = id => {
        localStorage.setItem("routes", JSON.stringify(routesData.filter(route => route.id !== id)));
        setRoutesData(JSON.parse(localStorage.getItem("routes") || "[]"))
    };

    const updateRoute = (id, updatedRoute) => {
        setEditing(false)
        localStorage.setItem("routes", JSON.stringify(routesData.map(route => (route.id === id ? updatedRoute : route))))
        setRoutesData(JSON.parse(localStorage.getItem("routes") || "[]"))
    }
    return (
        <div className="container">
            <h1>Chalo Assignment</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <div>
                            <h2>Edit Route</h2>
                            <EditRouteForm
                                editing={editing}
                                setEditing={setEditing}
                                currentRoute={currentRoute}
                                updateRoute={updateRoute}
                                stops={stops}
                            />
                        </div>
                    ) : (
                        <div>
                            <h2>Add Route</h2>
                            <AddRouteForm addRoute={addRoute} stops={stops} setStops={setStops}/>
                        </div>
                    )}
                </div>
                <div className="flex-large">
                    <h2>View Routes</h2>
                    <RouteTable routes={routesData} editRow={editRow} deleteRoute={deleteRoute} 
                                mapView={mapView}
                                showRoute={showRoute}
                                />
                </div>
            </div>
            <Map polyline={polyline}/>
        </div>
    );
}

export default App;
