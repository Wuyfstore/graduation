export type HoleInfoType = {
  id: number | string | null
  label: string | null
  children: HoleInfoTypes[]
}

export type HoleInfoTypes = {
  id: number
  UniformHoleNumber: string
  OriginalHoleNumber: string
  jobNumber: string
  jobName: string
  HolePosition: any
  holetype: string
  lon: number
  lat: number
  MmGirdCoordX: number
  MmGirdCoordY: number
  groundElevation: number
  drillingDepth: number
  initWaterLevel: any
  FixedLevel: number
  ConstructionOrginization: string
  CommencementDate: string
}

export type PointType = {
  formationId: number
  name: string
  lon: number
  lat: number
  label: string
  holeNumber: string
  color: string
  height: number
}
