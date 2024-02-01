import { HTType, HType } from './Props'
export type Data = {
  // user
  username?: string
  password?: string
  // hole
  id?: number
  label?: string
  OriginalHoleNumber?: string
  jobNumber?: string
  jobName?: string
  HolePosition?: string
  HoleType?: string
  lon?: number
  lat?: number
  MmGirdCoordX?: string
  MmGirdCoordY?: string
  groundElevation?: string
  drillingDepth?: string
  initWaterLevel?: string
  FixedLevel?: string
  ConstructionOrginization?: string
  CommencementDate?: string
}

export interface UserStore {
  dataList: Data[]
  dataCount: number
}

export interface LoginStore {
  menuList: any
}

export interface HoleStore {
  tarRockList: HTType
  rockList: HTType
  histogramList: HType[]
  ageCount: number
  histogramTypeCount: number
  engTypeCount: number
  holeCount: number
  holeTypeCount: number
}

export interface cesiumStore {
  isFlyTo: boolean
  defaultPointId: number
  defaultCheckedBox: Array<any>
  defaultChecked: Array<any>
  Entites: Array<any>
}

export enum CacheType {
  Local,
  Session
}
