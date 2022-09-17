# Public Transit Route Generator

This Project aims at building Public Transit Route repository from a series of Stops
available. It also includes CRUD, Map viewing and export functionalities.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Pranav4399/chalo.git
```

Go to the project directory

```bash
  cd chalo
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Documentation

The Project is built using ReactJS and also includes few external
react specific packages for implementing certain functionalities.
The packages used will be described in detail in the upcoming sections.

### How it Works

For the assignment purpose, the application uses a local json `(Line 9 in App.js)`
that contains set of stop objects along with different essential keys.

`● Stop Id  ● Stop Name ● Latitude ● Longitude`

This can also be eventually converted into a functionality that
fetches list of stops from an API.

The application can perform CRUD operations with routes.

Localstorage is used as a temporary storage for the purpose of storing the created/updated routes.

The create route form uses a external package `react-draggable-multi-select`
for implementation of stop selection.

#### Other features.

1. **Map view**

The website also allows viewing of routes as polyline in maps
on a button click. `React-leaflet` package is used to implement
the web maps

2. **Export Routes**

All the routes can be exported in an excel file using Export Routes button.

***Gist of functionalities implemented -***

1. Functionalities

- [X] Create a single route by submitting a simple form
- [X] Update route properties.
- [X] Delete route(s).
- [X] View route in a list interface and on a map.
- [X] Generate and visualise a polyline passing through the stops on the map using Google map apis.

2. Brownie Points

- [ ] Option to Display multiple Route on a map.
- [X] Usage of non-volatile Data.
- [X] Export data.
- [ ] Batch upload of routes.

## Authors

- [@Pranav4399](https://github.com/Pranav4399/)

## Roadmap

These are few of the issues/improvements which I'd love to implement
in upcoming versions of this project.

- Write Unit tests.
- Implement other missed out brownie points functionalities.
