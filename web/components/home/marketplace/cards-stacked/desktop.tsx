import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import FeaturedCard from '../../../card/featured-card/index'
import TinderCard from 'react-tinder-card'

import marketplaceDragonsData from './marketplace-dragons-data.json'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function ShowcaseCardDemo(): ReactElement {
  const [dragonsData, setDragonsData] = useState(marketplaceDragonsData)
  const [firstSection, setFirstSection] = useState(
    dragonsData.find((dragon) => dragon && [0, 1, 2].includes(dragon.id))
  )
  const ref1 = React.createRef()

  const onSwipe = (direction): void => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (dragonsData, id): void => {
    console.log(id + ' left the screen')
    const dragonsDataUpdated = dragonsData.filter((dragon) => dragon.id !== id)
    setDragonsData(dragonsDataUpdated)
    setFirstSection(dragonsDataUpdated.find((dragon) => dragon && [0, 1, 2].includes(dragon.id)))
  }

  return (
    <Grid container justify="space-between">
      {firstSection && (
        <Grid container item justify="center" xs={3}>
          <TinderCard
            onSwipe={onSwipe}
            className={styles.tinderCard}
            onCardLeftScreen={() => onCardLeftScreen(dragonsData, dragonsData[0].id)}
            preventSwipe={['up', 'down']}
            ref={ref1}
          >
            <FeaturedCard />
          </TinderCard>

          <TinderCard
            onSwipe={onSwipe}
            className={styles.tinderCard}
            onCardLeftScreen={() => onCardLeftScreen(dragonsData, dragonsData[1].id)}
            preventSwipe={['up', 'down']}
          >
            <FeaturedCard />
          </TinderCard>

          <TinderCard
            onSwipe={onSwipe}
            className={styles.tinderCard}
            onCardLeftScreen={() => onCardLeftScreen(dragonsData, dragonsData[2].id)}
            preventSwipe={['up', 'down']}
          >
            <FeaturedCard />
          </TinderCard>
        </Grid>
      )}
      <Grid container item justify="center" xs={3}>
        <FeaturedCard />
      </Grid>
      <Grid container item justify="center" xs={3}>
        <FeaturedCard />
      </Grid>
      <Grid container item justify="center" xs={3}>
        <FeaturedCard />
      </Grid>
      <button onClick={() => ref1.current.swipe('left')}>click</button>
    </Grid>
  )
}
