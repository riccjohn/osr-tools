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

type ShadowdarkRaceName = "Dwarf" | "Goblin" | "Elf" | "Halfling" | "Half-Orc" | "Human"

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
  rarity: "common" | "rare"
}