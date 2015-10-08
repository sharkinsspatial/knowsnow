/*eslint-env jest*/
jest.dontMock('../CreateReportInputs')
jest.dontMock('moment')

//Use CommonJS require instead of import to prevent Babel hoisting above
//dontMock.  See https://github.com/facebook/jest/issues/377
const React = require('react/addons')
const TestUtils = require('react/lib/ReactTestUtils')

//I hate Jest.
const Button = require('react-bootstrap/lib/Button')
const moment = require('moment')
const CreateReportInputs = require('../CreateReportInputs')

describe('CreateReportInputs', () => {

    var ReportActions = {}
    var Reports = {}
    Reports.createdReportRoute = {}
    beforeEach(() => {
        ReportActions.createReport = jest.genMockFunction()
    })

    it('Calls the createReport function prop when the button is clicked',
        () => {
            let instance = TestUtils.renderIntoDocument(
                <CreateReportInputs Reports={Reports}
                    ReportActions={ReportActions}/>
            )
            let inputs = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')
            TestUtils.Simulate.click(inputs[inputs.length - 1])
            expect(ReportActions.createReport.mock.calls.length).toEqual(1)
    })
})
