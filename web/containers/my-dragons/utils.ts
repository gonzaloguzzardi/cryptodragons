export const mapDragonsResults = (results: any[], source: string): any[] =>
  results ? results.map((dragon: any) => ({ id: dragon, source })) : []
