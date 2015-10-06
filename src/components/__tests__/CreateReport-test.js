/*eslint-env jest*/
jest.dontMock('../CreateReport')

//Use CommonJS require instead of import to prevent Babel hoisting above
//dontMock.  See https://github.com/facebook/jest/issues/377
const React = require('react/addons')
const TestUtils = require('react/lib/ReactTestUtils')
const CreateReport = require('../CreateReport')
const MenuItem = require('react-bootstrap/lib/MenuItem')
const DropdownButton = require('react-bootstrap/lib/DropdownButton')
const sd = require('skin-deep')

describe('CreateReport', () => {
    var ParkingLotActions = {}
    var ReportActions = {}
    var parkinglots = [{name: 'P8', id: 1}]
    beforeEach(() => {
        ParkingLotActions.setActiveParkingLot = jest.genMockFunction()
        ReportActions.createReport = jest.genMockFunction()
    })

    it('Calls the setActiveParkingLot function prop when a parking lot is selected',
        () => {
            let instance = TestUtils.renderIntoDocument(
               <CreateReport parkinglots={parkinglots}
                ParkingLotActions={ParkingLotActions}/>
            )
            let li = TestUtils.findRenderedDOMComponentWithTag(instance, 'li')
            TestUtils.Simulate.select(li)
            expect(ParkingLotActions.setActiveParkingLot.mock.calls.length)
                .toEqual(1)
    })

    it('Calls the createReport function prop when the button is clicked',
        () => {
            let instance = TestUtils.renderIntoDocument(
                <CreateReport parkinglots={parkinglots}
                ReportActions={ReportActions}/>
            )
            let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
            TestUtils.Simulate.click(buttons[1])
            expect(ReportActions.createReport.mock.calls.length).toEqual(1)
    })

    it('Should render one list item when passed a single parking lot prop',
        () => {
            const tree = sd.shallowRender(React.createElement(CreateReport,
                                                {parkinglots: parkinglots}))
            const vdom = tree.getRenderOutput()
            const dropDown = vdom.props.children.filter(dropDown => TestUtils
                .isElementOfType(dropDown, DropdownButton))
            const menuItems = dropDown[0].props.children.filter(menuItem => TestUtils
                .isElementOfType(menuItem, MenuItem))
            expect(menuItems.length).toEqual(1)
    })
})
