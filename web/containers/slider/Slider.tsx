// Slider.js

import React, { Component, ReactElement } from 'react'
import InputRange from "react-input-range";

//

interface SProps {
    any
}
interface SState {
    min?: number
    max?: number
    step?: number
    value?: number
    label?: string
    parentMethod: Function;
}

class Slider extends Component<any> {
    state: SState
    constructor(props: any) {
        super(props);
        this.state = {
            min: props.min,
            max: props.max,
            step: props.step,
            value: props.value,
            label: props.label,
            parentMethod: props.parentMethod
        }
    }

    onChange = range => {
        this.setState({
            type: this.state.label,
            value: range
        });
        this.state.parentMethod(range);
    };

    render() {
        return (
            <div>
                <label>{this.state.label}</label>
                <InputRange
                    minValue={this.state.min}
                    maxValue={this.state.max}
                    step={this.state.step}
                    onChange={this.onChange}
                    value={this.state.value}
                />
            </div>
        );
    }
}

export default Slider;