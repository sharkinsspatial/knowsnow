import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
import MapBoxToken from '../../Tokens'
import 'leaflet-routing-machine'
import 'drmonty-leaflet-awesome-markers'
import RouteMarkerPopup from './RouteMarkerPopup'
import Classnames from 'classnames'

class ReportMap extends React.Component {
    initializeMap () {
        let attribution = '<a href="https://www.mapbox.com/about/maps/"' +
            'target="_blank">&copy; Mapbox &copy; OpenStreetMap</a>'
        let subdomains = ['a', 'b', 'c', 'd']
        let retina = L.Browser.retina ? '@2x' : ''
        this.baseLayer = L.tileLayer(
            'https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}' +
                retina + '.png?' + 'access_token={token}', {
                attribution: attribution,
                subdomains: subdomains,
                mapId: 'sharkins.69e17c44',
                token: MapBoxToken,
            }
        )
        let node = ReactDOM.findDOMNode(this)
        this.map = L.map(node, {
            center: [45.493, -75.865],
            zoom: 14
        })
        this.baseLayer.addTo(this.map)
        this.reportRoute = L.geoJson(null, {style: function (feature) {
                return {color: 'yellow'}
            }
        }).addTo(this.map)
        this.reportRouteLayerGroup = L.layerGroup().addTo(this.map)
        this.routeLayerGroup = L.layerGroup().addTo(this.map)
        this.photoLayerGroup = L.layerGroup().addTo(this.map)

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
        this.photoIcon = L.AwesomeMarkers.icon({
            icon: 'camera',
            markerColor: 'orange'
        })
        this.initializeRoutingControl()
        this.shouldPopup = false
        this.routeDistance = 0
    }

    initializeRoutingControl () {
        let options = { profile: 'mapbox/walking' }
        this.routingControl = L.Routing.control({
            router: L.Routing.mapbox(MapBoxToken, options),
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
            this.tempMarker = new L.marker(waypoint.latLng, {icon: this.lastIcon})
            if (this.shouldPopup) {
                let popupButtons = ReactDOMServer
                    .renderToStaticMarkup(<RouteMarkerPopup/>)
                let div = document.createElement('div')
                div.innerHTML = popupButtons
                this.tempMarker.bindPopup(div, {minWidth: 120})
                this.tempMarker.on('add', (event) => {
                    event.target.openPopup()
                    document.querySelector('.map .undo')
                        .onclick = this.handleUndoLastSegment
                    document.querySelector('.map .finish')
                        .onclick = this.handleRouteFinish
                })
                this.shouldPopup = false
            }
            return this.tempMarker
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
                       {icon: this.finalizedIcon})
                       .bindPopup('Now finish entering your report')
                       .addTo(this.routeLayerGroup).openPopup()
        this.routeLineCoords.push(...this.lastRouteSegment)
        this.routeLine.setLatLngs(this.routeLineCoords)
        this.map.fitBounds(this.routeLine.getBounds(), { padding: [5,5] })
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
        this.routeDistance = 0
        this.lastSegmentDistance = 0
        this.map.off('click', this.handleRoutingClick)
    }

    handleUndoLastSegment = () => {
        this.routingControl.getPlan().setWaypoints([])
        this.routeStart = this.lastRouteSegment[0]
        this.lastRouteSegment = []
        this.routeDistance = this.routeDistance - this.lastSegmentDistance
        this.props.setReportRouteDistance(this.routeDistance)
    }

    handleRoutesFound = (event) => {
        this.shouldPopup = true
        let coords = event.routes[0].coordinates
        if (this.intermediateMarker) {
            this.routeLayerGroup.removeLayer(this.intermediateMarker)
        }

        //Using spread operator with push
        this.routeLineCoords.push(...this.lastRouteSegment)
        this.routeLine.setLatLngs(this.routeLineCoords)

        if (this.routeLine.getLatLngs().length > 0) {
            this.intermediateMarker =  new L.marker(coords[0],
                    {icon: this.intermediateIcon}).addTo(this.routeLayerGroup)
        }
        this.routeStart = coords[coords.length -1]
        this.lastRouteSegment = coords
        this.routeDistance = this.routeDistance + event.routes[0]
                                                        .summary.totalDistance
        this.lastSegmentDistance = event.routes[0].summary.totalDistance

        this.props.setReportRouteDistance(this.routeDistance)
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
            if (nextProps.Reports.activeReportRoute && !nextProps.Reports.createMode) {
                this.addReportRoute(nextProps.Reports.activeReportRoute)
            }
        }
        if (nextProps.ParkingLots.activeParkingLot !== this.props.ParkingLots
            .activeParkingLot) {
                this.clearRoutingState()
                this.routeLayerGroup.clearLayers()
                if (nextProps.ParkingLots.activeParkingLot) {
                    let latlng = L.GeoJSON.coordsToLatLng(
                        nextProps.ParkingLots.activeParkingLot
                            .geometry.coordinates, true)
                    this.startRouting(latlng)
                    this.map.setView(latlng, 15)
                }
        }
        if (this.props.Reports.createdReportRoute &&
            !nextProps.Reports.createdReportRoute) {
                this.routeLayerGroup.clearLayers()
        }
        if (nextProps.Reports.activeReportImages !==
                       this.props.Reports.activeReportImages) {
                this.photoLayerGroup.clearLayers()
                this.addPhotoMarkers(nextProps.Reports.activeReportImages)
        }
        if (nextProps.Reports.activeReportImage !==
            this.props.Reports.activeReportImage) {
            this.openPhotoPopup(nextProps.Reports.activeReportImage)
        }
    }

    addPhotoMarkers (images) {
        if (!this.props.Reports.createMode) {
            images.forEach((image) => {
                if (image.latitude && image.longitude) {
                    let img = `<img src="https://s3.amazonaws.com/knowsnowphotos/` +
                            `${image.reportId}/${image.popupName}"/>`
                    let popup = new L.popup({ minWidth: 125 }).setContent(img)
                    let photoMarker = new L.marker(L.latLng(image.latitude,
                                                            image.longitude),
                                        {icon: this.photoIcon}).bindPopup(popup)
                    photoMarker.id = image.id
                    photoMarker.on('click', (event) => {
                        let id = event.target.id
                        this.props.setActiveReportImage(id)
                    })
                    this.photoLayerGroup.addLayer(photoMarker)
                }
            })
        }
    }

    openPhotoPopup (id) {
        this.photoLayerGroup.eachLayer((marker) => {
            if (marker.id === id) {
                marker.openPopup()
            }
            else {
                marker.closePopup()
            }
        })
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

        this.map.fitBounds(this.reportRoute.getBounds(), { padding: [10,10] })
    }

    handleRoutingClick = (event) => {
        this.routingControl.setWaypoints([this.routeStart, event.latlng])
    }

    startRouting (latlng) {
        this.routeStart = latlng
        this.routeLineCoords = []
        this.lastRouteSegment = []

        this.routeLine = L.polyline([], { color: 'yellow'})
            .addTo(this.routeLayerGroup)

        if (this.startMarker) {
            this.routeLayerGroup.removeLayer(this.startMarker)
        }
        this.startMarker = new L.marker(latlng, {icon: this.startIcon})
        this.startMarker.bindPopup('Start clicking slowly along your route')
            .addTo(this.routeLayerGroup).openPopup()

        this.map.on('click', this.handleRoutingClick)
    }
}

export default ReportMap

