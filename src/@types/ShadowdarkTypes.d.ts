type IShadowdarkAbilities = Record<IShadowdarkAbilityName, IShadowdarkAbility>

type IShadowdarkAbilityName =
  | 'charisma'
  | 'constitution'
  | 'dexterity'
  | 'intelligence'
  | 'strength'
  | 'wisdom'

interface IShadowdarkAbility {
  modifier: number
  score: number
}

type ShadowdarkRaceName =
  | 'Dwarf'
  | 'Goblin'
  | 'Elf'
  | 'Halfling'
  | 'Half-Orc'
  | 'Human'

interface IShadowdarkRace {
  name: ShadowdarkRaceName
  description: string
  languages: string[]
  languageCount: number
  talents: IShadowdarkTalent[]
}

interface IShadowdarkTalent {
  name: string
  description: string
  effect?: any
}

interface IShadowdarkLanguage {
  name: string
  rarity: 'common' | 'rare'
}

interface IShadowdarkArmor {
  name: string
  type: 'armor' | 'shield'
  cost: number
  slots: number
  baseAC?: number
  acModifier?: 'dex'
  acBonus?: number
}

type ShadowdarkClassName = 'cleric' | 'fighter' | 'thief' | 'wizard'
type ShadowdarkAlignment = 'lawful' | 'chaotic' | 'neutral'

interface IShadowdarkTitlesByClass {
  cleric: Array<IShadowdarkTitlesByLevel>
  fighter: Array<IShadowdarkTitlesByLevel>
  thief: Array<IShadowdarkTitlesByLevel>
  wizard: Array<IShadowdarkTitlesByLevel>
}

interface IShadowdarkTitlesByLevel {
  levels: number[]
  lawful: string
  chaotic: string
  neutral: string
}

interface IShadowdarkClassData {
  name: ShadowdarkClassName
  allowedWeapons: string[]
  allowedArmor: string[] | string
  shieldsAllowed: boolean
  hitDie: number
}
