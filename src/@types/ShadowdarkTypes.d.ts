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
