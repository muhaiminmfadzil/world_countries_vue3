import { ERegion, EStartOfWeek, EStatus } from '@/enums/country'

export interface ICountrySanitize {
  id: string
  isSelected: boolean
  flag: string
  name: string
  computedName: string
  capital?: string
  computedCapital?: string
  region: ERegion
  population: number
}

export interface ICountry {
  name: IName
  tld?: string[]
  cca2: string
  ccn3?: string
  cca3: string
  independent?: boolean
  status: EStatus
  unMember: boolean
  currencies?: ICurrencies
  idd: IIdd
  capital?: string[]
  altSpellings: string[]
  region: ERegion
  subregion?: string
  languages?: { [key: string]: string }
  translations: { [key: string]: ITranslation }
  latlng: number[]
  landlocked: boolean
  area: number
  demonyms?: IDemonyms
  flag: string
  maps: IMaps
  population: number
  car: ICar
  timezones: string[]
  continents: EContinent[]
  flags: IFlags
  coatOfArms: ICoatOfArms
  startOfWeek: EStartOfWeek
  capitalInfo: ICapitalInfo
  postalCode?: IPostalCode
  borders?: string[]
  cioc?: string
  gini?: { [key: string]: number }
  fifa?: string
}

interface ICapitalInfo {
  latlng?: number[]
}

interface ICar {
  signs?: string[]
  side: ESide
}

enum ESide {
  Left = 'left',
  Right = 'right'
}

interface ICoatOfArms {
  png?: string
  svg?: string
}

enum EContinent {
  Africa = 'Africa',
  Antarctica = 'Antarctica',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SouthAmerica = 'South America'
}

interface ICurrencies {
  XPF?: IAed
  EUR?: IAed
  VES?: IAed
  USD?: IAed
  XCD?: IAed
  GIP?: IAed
  KES?: IAed
  BRL?: IAed
  MVR?: IAed
  CKD?: IAed
  NZD?: IAed
  SCR?: IAed
  XAF?: IAed
  VUV?: IAed
  GMD?: IAed
  GYD?: IAed
  FKP?: IAed
  DZD?: IAed
  MAD?: IAed
  MRU?: IAed
  TRY?: IAed
  PKR?: IAed
  IRR?: IAed
  IDR?: IAed
  AFN?: IAed
  ALL?: IAed
  CDF?: IAed
  XOF?: IAed
  SDG?: IBAM
  SAR?: IAed
  KHR?: IAed
  NPR?: IAed
  MYR?: IAed
  RWF?: IAed
  THB?: IAed
  JOD?: IAed
  CHF?: IAed
  KMF?: IAed
  GBP?: IAed
  IMP?: IAed
  HKD?: IAed
  JEP?: IAed
  TJS?: IAed
  BGN?: IAed
  EGP?: IAed
  MWK?: IAed
  CVE?: IAed
  MDL?: IAed
  DKK?: IAed
  TMT?: IAed
  BBD?: IAed
  ERN?: IAed
  LSL?: IAed
  ZAR?: IAed
  TZS?: IAed
  SOS?: IAed
  ANG?: IAed
  DOP?: IAed
  GNF?: IAed
  NAD?: IAed
  SHP?: IAed
  SBD?: IAed
  MOP?: IAed
  ARS?: IAed
  BAM?: IBAM
  GGP?: IAed
  DJF?: IAed
  SYP?: IAed
  PEN?: IAed
  AUD?: IAed
  JMD?: IAed
  KZT?: IAed
  SLL?: IAed
  KRW?: IAed
  BZD?: IAed
  PGK?: IAed
  ISK?: IAed
  TWD?: IAed
  JPY?: IAed
  CNY?: IAed
  LBP?: IAed
  LKR?: IAed
  GTQ?: IAed
  RSD?: IAed
  MGA?: IAed
  SZL?: IAed
  RON?: IAed
  ZMW?: IAed
  ZWL?: IAed
  TND?: IAed
  IAed?: IAed
  MNT?: IAed
  NOK?: IAed
  UYU?: IAed
  BSD?: IAed
  RUB?: IAed
  YER?: IAed
  SEK?: IAed
  LAK?: IAed
  COP?: IAed
  CAD?: IAed
  INR?: IAed
  MKD?: IAed
  PYG?: IAed
  CRC?: IAed
  UGX?: IAed
  BOB?: IAed
  KPW?: IAed
  MUR?: IAed
  HNL?: IAed
  KGS?: IAed
  CLP?: IAed
  BMD?: IAed
  LRD?: IAed
  LYD?: IAed
  OMR?: IAed
  PHP?: IAed
  PLN?: IAed
  FOK?: IAed
  BHD?: IAed
  BYN?: IAed
  QAR?: IAed
  VND?: IAed
  SGD?: IAed
  GEL?: IAed
  BIF?: IAed
  SSP?: IAed
  WST?: IAed
  KWD?: IAed
  TTD?: IAed
  TVD?: IAed
  AOA?: IAed
  TOP?: IAed
  MZN?: IAed
  MMK?: IAed
  ETB?: IAed
  AZN?: IAed
  UZS?: IAed
  BDT?: IAed
  AMD?: IAed
  NGN?: IAed
  BND?: IAed
  ILS?: IAed
  AWG?: IAed
  NIO?: IAed
  HTG?: IAed
  KID?: IAed
  KYD?: IAed
  UAH?: IAed
  MXN?: IAed
  FJD?: IAed
  GHS?: IAed
  SRD?: IAed
  CUC?: IAed
  CUP?: IAed
  BTN?: IAed
  HUF?: IAed
  STN?: IAed
  IQD?: IAed
  CZK?: IAed
  BWP?: IAed
  PAB?: IAed
}

interface IAed {
  name: string
  symbol: string
}

interface IBAM {
  name: string
}

interface IDemonyms {
  eng: IEng
  fra?: IEng
}

interface IEng {
  f: string
  m: string
}

interface IFlags {
  png: string
  svg: string
  alt?: string
}

interface IIdd {
  root?: string
  suffixes?: string[]
}

interface IMaps {
  googleMaps: string
  openStreetMaps: string
}

interface IName {
  common: string
  official: string
  nativeName?: { [key: string]: ITranslation }
}

interface ITranslation {
  official: string
  common: string
}

interface IPostalCode {
  format: string
  regex?: string
}
