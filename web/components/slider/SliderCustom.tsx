import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const SliderCustom = ({
  label,
  min,
  max,
  parentMethod,
  step,
  track,
  value,
}) => {
  const [valueSlider, setValue] = useState(value)

  const onChange = (_e, newValue) => {
    setValue(newValue)
    parentMethod(newValue)
  }

  return (
    <div>
      <label>{label}</label>
      <Box>
        <Slider
          aria-label={label}
          min={min}
          max={max}
          onChange={onChange}
          size="small"
          step={step}
          value={valueSlider}
          valueLabelDisplay="auto"
          disabled={min === max}
          marks={[
            { value: min, label: min },
            { value: max, label: max }
          ]}
        />
      </Box>
    </div>
  )
}

export default SliderCustom
