import React from 'react';
import * as XLSX from 'xlsx'; 

const RouteTable = (props) => {
      
    const exportToCSV = () => {
        if(Array.isArray(props.routes) && !props.routes.length){
            alert("Cannot export since no routes are available");
            return;
        }
        let newArray = props.routes.map(a => ({...a}));
        newArray.forEach((obj) => {
            obj.stops.forEach((stop, i) => {
                obj['stop-'+i] =  stop.label
            });
            delete obj['stops']; 
        });

        const worksheet = XLSX.utils.json_to_sheet(newArray);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Routes.xlsx");
    }

    return <>
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Direction</th>
            <th>Status</th>
            <th>Stops ⬇</th>
        </tr>
        </thead>
        <tbody>
        {props.routes.length > 0 ? (
            props.routes.map(route => (
                <tr key={route.id}>
                    <td>{route.name}</td>
                    <td>{route.direction}</td>
                    <td>{route.status}</td>
                    <td>
                    {
                        route.stops.map((item) => <div key={item.routeOrder}>{item.label}</div>)
                    }
                    </td>
                    <td>
                        <button className="button muted-button" onClick={() => {
                            props.editRow(route)
                        }}>Edit
                        </button>
                        <button className="button muted-button" onClick={() => props.deleteRoute(route.id)}>Delete
                        </button>
                        <button className="button" onClick={() => {
                            props.mapView(route)
                        }}>{props.showRoute ? 'Remove from Map' : 'View in Map'}</button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={3}>No Routes</td>
            </tr>
        )}
        </tbody>
    </table>
    <button onClick={exportToCSV}>Export Routes</button>
    </>
};

export default RouteTable