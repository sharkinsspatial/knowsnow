/*eslint-env jest*/
jest.dontMock('../RouteControls')

//Use CommonJS require instead of import to prevent Babel hoisting above
//dontMock.  See https://github.com/facebook/jest/issues/377
const React = require('react')
const TestUtils = require('react-addons-test-utils')
const RouteControls = require('../RouteControls')
const MenuItem = require('react-bootstrap/lib/MenuItem')
const DropdownButton = require('react-bootstrap/lib/DropdownButton')

describe('RouteControls', () => {
    var ParkingLotActions = {}
    var ParkingLots = {}
    ParkingLots.parkinglots = [{name: 'P8', id: 1}]
    var ReportActions = {}
    var Reports = {}
    Reports.reportRouteDistance = 0
    var propsObject = {}
    beforeEach(() => {
        ParkingLotActions.setActiveParkingLot = jest.genMockFunction()
        ReportActions.setReportRouteDistance = jest.genMockFunction()
        propsObject = { ParkingLots: ParkingLots,
                        ParkingLotActions: ParkingLotActions,
                        Reports: Reports,
                        ReportActions: ReportActions }
    })

    it('Calls the setActiveParkingLot function prop when a parking lot is selected',
        () => {
            let instance = TestUtils.renderIntoDocument(
               <RouteControls ParkingLots={ParkingLots}
                ParkingLotActions={ParkingLotActions} Reports={Reports}
                ReportActions={ReportActions}/>
            )
            let li = TestUtils.findRenderedDOMComponentWithTag(instance, 'li')
            TestUtils.Simulate.select(li)
            expect(ParkingLotActions.setActiveParkingLot.mock.calls.length)
                .toEqual(1)
    })

    it('Should render one list item when passed a single parking lot prop',
        () => {
            let instance = TestUtils.renderIntoDocument(
               <RouteControls ParkingLots={ParkingLots}
                ParkingLotActions={ParkingLotActions} Reports={Reports}
                ReportActions={ReportActions}/>
            )
            let dropDown = TestUtils.findRenderedComponentWithType(
                instance, DropdownButton)
            expect(dropDown.props.children.length).toEqual(1)
    })
    ////Need to upgrade React to version where shallowRenderer supports
    ////getMountedInstance
    ////it('Should clear the active parking lot when the component is unmounted',
       ////() => {
            ////const shallowRenderer = TestUtils.createRenderer()
            ////shallowRenderer.render(React.createElement(RouteControls,
                        ////propsObject))
            ////expect(ParkingLotActions.setActiveParkingLot.mock.calls.length)
                ////.toEqual(1)
            ////expect(ParkingLotActions.setActiveParkingLot.mock.calls[0])
                   ////.toEqual({})
    ////})
})
