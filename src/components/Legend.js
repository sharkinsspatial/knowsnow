import React from 'react'

class Legend extends React.Component {
    render() {
        return (
            <div>
                <h4>Classic</h4>
                <svg width='100%' height='5%' viewBox='0 0 100 1'>
                    <line id='classic' x1='0' y1='0' x2='100' y2='0'
                        stroke='#000000' fill='none' strokeWidth='0.5'
                        strokeDasharray='10, 3, 2, 3'/>
                </svg>
                <h4>Backcountry</h4>
                <svg width='100%' height='5%' viewBox='0 0 100 1'>
                    <line id='backcountry' x1='0' y1='0' x2='100' y2='0'
                        stroke='#000000' fill='none' strokeWidth='0.5'
                        strokeDasharray='4, 2'/>
                </svg>
                <h4>Shared</h4>
                <svg width='100%' height='5%' viewBox='0 0 100 1'>
                    <line id='shared' x1='0' y1='0' x2='100' y2='0'
                        stroke='#000000' fill='none' strokeWidth='0.5'/>
                </svg>
                <h4>Easy</h4>
                <svg width='100%' height='5%' viewBox='0 0 100 1'>
                    <line id='easy' x1='0' y1='0' x2='100' y2='0'
                        stroke='#68A926' fill='none'/>
                    <circle cx='50' cy='0' r='4' fill='black'/>
                </svg>
                <h4>Intermediate</h4>
                <svg width='100%' height='5%' viewBox='0 0 100 1'>
                    <line id='intermediate' x1='0' y1='0' x2='100' y2='0'
                        stroke='#00689E' fill='none'/>
                    <rect x='47.5' y='-2.5' height='5' width='5' stroke='black'
                        fill='black'/>
                </svg>
                <h4>Advanced</h4>
                <svg width='100%' height='5%' viewBox='0 0 100 1'>
                    <line id='advanced' x1='0' y1='0' x2='100' y2='0'
                        stroke='#E94D38' fill='none'/>
                    <rect x='47.5' y='-2.5' height='5' width='5' stroke='black'
                        fill='black' transform='rotate(45, 50, 0)'/>
                </svg>
            </div>
        )
    }
}

export default Legend
