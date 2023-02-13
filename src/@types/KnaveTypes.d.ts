interface KnaveCharacterData {
  abilities: IAbilities
  copperPieces: number
  maxHp: number
  traits: ITraits
  items: Array<Item>
  itemSlots: number
}

type IAbilities = Record<IAbilityName, IAbility>

type IAbilityName =
  | 'charisma'
  | 'constitution'
  | 'dexterity'
  | 'intelligence'
  | 'strength'
  | 'wisdom'

interface IAbility {
  bonus: number
  defense: number
}

type IGender =
  | 'cis-male'
  | 'cis-female'
  | 'non-binary'
  | 'transgender'
  | 'two-spirit'
  | 'genderqueer'
  | 'gender-fluid'
  | 'gender-neutral'

type Item = IGear | IArmor | IWeapon

interface IGear {
  count: number
  name: string
  slots: number
  type: IGearType
}

interface IArmor extends IGear {
  quality: number
  defense: number
}

interface IWeapon extends IGear {
  damage: string
  hand: number
  quality: number
}

type IGearType = 'food' | 'tool' | 'light' | 'armor' | 'weapon'

type ITraits = Record<INoun, string>

type INoun =
  | 'physique'
  | 'face'
  | 'skin'
  | 'hair'
  | 'clothing'
  | 'virtue'
  | 'vice'
  | 'speech'
  | 'background'
  | 'misfortune'
