export interface SearchProps {
  searchConfig: {
    labelWidth?: string
    formItems: any[]
  }
}

export interface ContentProps {
  contentConfig: {
    pageName: string
    defaultPageSize: number
    pageSizes: Array<number>
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

export interface ModalConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  labelWidth: string
  size: any
  formItems: any[]
}

export interface ModalProps {
  modalConfig: ModalConfig
}

export interface LoginFormType {
  username: string
  password: string
}

export interface HTType {
  id: number
  label: string
  OriginalHoleNumber: string
  jobNumber: string | null
  jobName: string | null
  holetype: string
  lon: number
  lat: number
  MmGirdCoordX: number | null
  MmGirdCoordY: number | null
  groundElevation: number | null
  drillingDepth: number | null
  initWaterLevel: number | null
  FixedLevel: number | null
  ConstructionOrginization: string | null
  CommencementDate: string | null
  items: histogramType[]
}

export interface histogramType {
  id: number
  projectId: number
  formationId: number
  buriedDeep: number
  elevation: number
  thickness: number
  name: string
  numbering: string
  ageOfGenesisType: string
  characterization: string
  engineeringGeoType: string
  histogramType: string
  histogramTypeColor: string
}

export interface histogramTypeArray {
  children: histogramType[]
}

export interface HType {
  id: number
  type: string
  img: string
}

export interface Point {
  x: number
  y: number
}
