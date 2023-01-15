import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import FeaturedCard from '../../card/featured-card'
import mock from './dragons-data'

import styles from './mobile.module.scss'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

function SwipeableTextMobileStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = mock.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <Box sx={{ maxWidth: '100vw', flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {mock.map((data, index) => (
          <div key={data.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <FeaturedCard
                key={data.label}
                image={data.image}
                name={data.label}
                owner={data.owner}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} color="secondary">
            Next <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} color="secondary">
            <KeyboardArrowLeft /> Back
          </Button>
        }
      />
    </Box>
  )
}

export default function MarketplaceSection(): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Typography variant="h4" component="h2">
            Start your own collection
          </Typography>
        </div>
        <div className={styles.subtitle}>
          <Typography variant="subtitle2" color="textSecondary">
            In CryptoDragons you can collect Dragons of all colours and shapes. Create Collections
            of your favourite dragons and share them with our cryptodragons community.
          </Typography>
        </div>
        <div className={styles.marketplaceCollections}>
        <SwipeableTextMobileStepper />
        </div>
        <Link href="/marketplace">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={styles.goMktpButton}
          >
            <Typography variant="body1" component="span">
              Search more in marketplace!
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  )
}
