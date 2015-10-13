/*eslint-env jest*/
jest.dontMock('../RouteControls')

//Use CommonJS require instead of import to prevent Babel hoisting above
//dontMock.  See https://github.com/facebook/jest/issues/377
const React = require('react/addons')
const TestUtils = require('react/lib/ReactTestUtils')
const RouteControls = require('../RouteControls')
const MenuItem = require('react-bootstrap/lib/MenuItem')
const DropdownButton = require('react-bootstrap/lib/DropdownButton')
const sd = require('skin-deep')

describe('RouteControls', () => {
    var ParkingLotActions = {}
    var ParkingLots = {}
    ParkingLots.parkinglots = [{name: 'P8', id: 1}]
    beforeEach(() => {
        ParkingLotActions.setActiveParkingLot = jest.genMockFunction()
    })

    it('Calls the setActiveParkingLot function prop when a parking lot is selected',
        () => {
            let instance = TestUtils.renderIntoDocument(
               <RouteControls ParkingLots={ParkingLots}
                ParkingLotActions={ParkingLotActions}/>
            )
            let li = TestUtils.findRenderedDOMComponentWithTag(instance, 'li')
            TestUtils.Simulate.select(li)
            expect(ParkingLotActions.setActiveParkingLot.mock.calls.length)
                .toEqual(2)
    })

    it('Should render one list item when passed a single parking lot prop',
        () => {
            const tree = sd.shallowRender(React.createElement(RouteControls,
                                                {ParkingLots: ParkingLots,
                                                ParkingLotActions: ParkingLotActions}))
            const vdom = tree.getRenderOutput()
            const input = vdom.props.children
            const dropDown = input.props.children.filter(dropDown => TestUtils
                .isElementOfType(dropDown, DropdownButton))
            const menuItems = dropDown[0].props.children.filter(menuItem => TestUtils
                .isElementOfType(menuItem, MenuItem))
            expect(menuItems.length).toEqual(1)
    })

    it('Should clear the active parking lot when the component is mounted',
       () => {
            const shallowRenderer = TestUtils.createRenderer()
            shallowRenderer.render(React.createElement(RouteControls,
                                                {ParkingLots: ParkingLots,
                                        ParkingLotActions: ParkingLotActions}))
            expect(ParkingLotActions.setActiveParkingLot.mock.calls.length)
                .toEqual(1)
            expect(ParkingLotActions.setActiveParkingLot.mock.calls[0])
                   .toEqual({})
    })
})
