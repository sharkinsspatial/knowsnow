import React from 'react'
import L from 'leaflet'
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
import MapBoxToken from '../../Tokens'
import 'leaflet-routing-machine'
import 'lrm-mapbox'
import 'drmonty-leaflet-awesome-markers'
import RouteMarkerPopup from './RouteMarkerPopup'
import Classnames from 'classnames'

class ReportMap extends React.Component {
    initializeMap () {
        let attribution = '<a href="https://www.mapbox.com/about/maps/"' +
            'target="_blank">&copy; Mapbox &copy; OpenStreetMap</a>'
        let subdomains = ['a', 'b', 'c', 'd']

        this.baseLayer = L.tileLayer(
            'https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?' +
            'access_token={token}', {
                attribution: attribution,
                subdomains: subdomains,
                mapId: 'sharkins.lbp79oa3',
                token: MapBoxToken
            }
        )
        let node = React.findDOMNode(this)
        this.map = L.map(node, {
            center: [45.493, -75.865],
            zoom: 14
        })
        this.baseLayer.addTo(this.map)
        this.reportRoute = L.geoJson().addTo(this.map)
        this.reportRouteLayerGroup = L.layerGroup().addTo(this.map)
        this.routeLayerGroup = L.layerGroup().addTo(this.map)

        this.routeLineStyle = { color: 'red', opacity: 0.5, weight: 5 }
        this.startIcon = L.AwesomeMarkers.icon({
            icon: 'play',
            markerColor: 'green'
        })
        this.lastIcon = L.AwesomeMarkers.icon({
            icon: 'flag',
            markerColor: 'orange'
        })
        this.intermediateIcon = L.AwesomeMarkers.icon({
            icon: 'flag',
            markerColor: 'blue'
        })
        this.finalizedIcon = L.AwesomeMarkers.icon({
            icon: 'stop',
            markerColor: 'red'
        })
        this.initializeRoutingControl()
    }

    initializeRoutingControl () {
        let options = { profile: 'mapbox.walking' }
        this.routingControl = L.Routing.control({
            router: new L.Routing.Mapbox(MapBoxToken, options),
            show: false,
            waypointMode: 'snap',
            fitSelectedRoutes: false,
            draggableWaypoints: true,
            routeLine: (route) => {
                let line = L.Routing.line(route, {
                    addWaypoints: false,
                    styles: [this.routeLineStyle]
                })
                return line
            },
            createMarker: this.createMarker
        })
        this.routingControl
            .addEventListener('routesfound', this.handleRoutesFound, this)
            .addTo(this.map)
    }

    createMarker = (waypointIndex, waypoint, numberOfWaypoints) => {
        if (waypointIndex === 1) {
            let marker = new L.marker(waypoint.latLng, {icon: this.lastIcon})
            let popupButtons = React.renderToStaticMarkup(<RouteMarkerPopup/>)
            let div = document.createElement('div')
            div.innerHTML = popupButtons
            marker.bindPopup(div, {minWidth: 115})
            marker.on('add', (event) => {
                event.target.openPopup()
                document.querySelector('.map .undo')
                    .onclick = this.handleUndoLastSegment
                document.querySelector('.map .finish')
                    .onclick = this.handleRouteFinish
            })
            return marker
        }
        else {
            return false
        }
    }

    handleRouteFinish = () => {
        if (this.intermediateMarker) {
            this.routeLayerGroup.removeLayer(this.intermediateMarker)
        }

        this.finalMarker =  new L.marker(this.lastRouteSegment[
                                         this.lastRouteSegment.length - 1],
                       {icon: this.finalizedIcon}).addTo(this.routeLayerGroup)
        this.routeLineCoords.push(...this.lastRouteSegment)
        this.routeLine.setLatLngs(this.routeLineCoords)
        let geojson = this.routeLine.toGeoJSON()
        this.props.createReportRoute(geojson)
        this.clearRoutingState()
    }

    clearRoutingState () {
        //Clear routing state doesn't inclued the routeLine so that it stays
        //displayed until we submit
        this.routingControl.getPlan().setWaypoints([])
        this.routeLineCoords = []
        this.lastRouteSegment = []
        this.map.off('click', this.handleRoutingClick)
    }

    handleUndoLastSegment = () => {
        this.routingControl.getPlan().setWaypoints([])
        this.routeStart = this.lastRouteSegment[0]
        this.lastRouteSegment = []
    }

    handleRoutesFound = (event) => {
        let coords = event.routes[0].coordinates
        if (this.intermediateMarker) {
            this.routeLayerGroup.removeLayer(this.intermediateMarker)
        }
        if (this.routeLineCoords.length > 0) {
            this.intermediateMarker =  new L.marker(coords[0],
                    {icon: this.intermediateIcon}).addTo(this.routeLayerGroup)
        }
        //Using spread operator with push
        this.routeLineCoords.push(...this.lastRouteSegment)
        this.routeLine.setLatLngs(this.routeLineCoords)

        this.routeStart = coords[coords.length -1]
        this.lastRouteSegment = coords
    }

    componentDidMount () {
        this.initializeMap()
    }

    render () {
        let classes = Classnames({
            'map': true,
            'route-popup': true
        })
        return (
            <div className={classes}></div>
        )
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.Reports.activeReport !== this.props.Reports.activeReport) {
            this.reportRoute.clearLayers()
            this.reportRouteLayerGroup.clearLayers()
            if (nextProps.Reports.activeReportRoute) {
                this.addReportRoute(nextProps.Reports.activeReportRoute)
            }
        }
        if (nextProps.ParkingLots.activeParkingLot !== this.props.ParkingLots
            .activeParkingLot) {
                this.clearRoutingState()
                this.routeLayerGroup.clearLayers()
                let latlng = L.GeoJSON.coordsToLatLng(
                    nextProps.ParkingLots.activeParkingLot.geometry.coordinates,
                    true)
                this.startRouting(latlng)
                this.map.setView(latlng, 15)
        }
        if (this.props.Reports.createdReportRoute &&
            !nextProps.Reports.createdReportRoute) {
                this.routeLayerGroup.clearLayers()
        }
    }

    addReportRoute (route) {
        this.reportRoute.addData(route)
        let startMarker = new L.marker(L.GeoJSON.coordsToLatLng(
            route.geometry.coordinates[0], true), {icon: this.startIcon})
                                       .addTo(this.reportRouteLayerGroup)
        let endMarker = new L.marker(L.GeoJSON.coordsToLatLng(
            route.geometry.coordinates[route.geometry.coordinates.length -1],
                true), {icon: this.finalizedIcon})
                    .addTo(this.reportRouteLayerGroup)

        this.map.fitBounds(this.reportRoute.getBounds(), { padding: [5,5] })
    }

    handleRoutingClick = (event) => {
        this.routingControl.setWaypoints([this.routeStart, event.latlng])
    }

    startRouting (latlng) {
        this.routeStart = latlng
        this.routeLineCoords = []
        this.lastRouteSegment = []

        this.routeLine = L.polyline([], { color: 'blue'})
            .addTo(this.routeLayerGroup)

        if (this.startMarker) {
            this.routeLayerGroup.removeLayer(this.startMarker)
        }
        this.startMarker = new L.marker(latlng, {icon: this.startIcon})
        this.startMarker.bindPopup('First Marker')
            .addTo(this.routeLayerGroup).openPopup()

        this.map.on('click', this.handleRoutingClick)
    }
}

export default ReportMap

