import { tMarketplaceDragon } from 'types/data'
import { tLowOrHigh } from 'components/sorting-bar/types'

export const sortByAttribute = (
  dragons: tMarketplaceDragon[],
  attribute: string,
  value: tLowOrHigh
): tMarketplaceDragon[] => {
  if (!dragons || dragons.length < 2 ) return dragons;

  if (!Object.keys(dragons[0]).includes(attribute)) return dragons;

  const sortedDragons = [...dragons]

  return sortedDragons.sort((dragonA, dragonB) =>
    value === 'LOW_TO_HIGH_VALUE' ?
      dragonA[attribute] - dragonB[attribute] :
      dragonB[attribute] - dragonA[attribute]
  );
}
