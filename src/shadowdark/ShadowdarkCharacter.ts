import { Dice } from '@/dice'
import { expandObjectKeys } from '@/helpers'
import { abilityModifiers, languages as allLanguages, races } from './data'
class ShadowdarkCharacter {
  private abilities: IShadowdarkAbilities = {
    strength: { score: 10, modifier: 0 },
    dexterity: { score: 10, modifier: 0 },
    constitution: { score: 10, modifier: 0 },
    intelligence: { score: 10, modifier: 0 },
    wisdom: { score: 10, modifier: 0 },
    charisma: { score: 10, modifier: 0 },
  }

  public race: IShadowdarkRace = {} as IShadowdarkRace
  public languages: string[] = []
  constructor() {}

  public generate = () => {
    this.abilities = this.generateAbilityScores()
    this.generateRace()
  }

  public get abilityScores() {
    return this.abilities
  }

  public get charisma() {
    return this.abilities.charisma
  }

  public get constitution() {
    return this.abilities.constitution
  }

  public get dexterity() {
    return this.abilities.dexterity
  }

  public get intelligence() {
    return this.abilities.intelligence
  }

  public get strength() {
    return this.abilities.strength
  }

  public get wisdom() {
    return this.abilities.wisdom
  }

  private generateAbilityScores = (): IShadowdarkAbilities => {
    const abilityScoreRolls = this.rollAbilityScores()

    const abilityModifiersMap = expandObjectKeys(abilityModifiers)

    const abilitiesWithModifiers = abilityScoreRolls.map(abilityScore => {
      const modifier = abilityModifiersMap[abilityScore.toString()]

      return {
        score: abilityScore,
        modifier,
      }
    })

    const [strength, dexterity, constitution, intelligence, wisdom, charisma] =
      abilitiesWithModifiers

    return {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    }
  }

  private generateRace = (): void => {
    const dieRoll = Dice.roll(races.length - 1, 1)
    const listOfRaces = races as IShadowdarkRace[]
    const race = listOfRaces[dieRoll]
    const languages = this.determineLanguages(race)

    this.languages = languages
    this.race = race
  }

  private determineLanguages = (race: IShadowdarkRace): string[] => {
    const { languages, languageCount } = race

    if (languages.length < languageCount) {
      const commonLanguages = allLanguages
        .filter(language => language.rarity === 'common')
        .map(language => language.name)
      const unknownCommonLanguages = commonLanguages.filter(
        language => !languages.includes(language),
      )
      const newLanguage =
        unknownCommonLanguages[Dice.roll(unknownCommonLanguages.length - 1)]

      return [...languages, newLanguage]
    }

    return languages
  }

  private rollAbilityScores = (): number[] => {
    const rerollThreshold = 14

    const scores = Array(6)
      .fill(undefined)
      .map(() => Dice.roll(6, 3))

    if (!scores.some(score => score >= rerollThreshold)) {
      return this.rollAbilityScores()
    }

    return scores
  }
}

export default ShadowdarkCharacter
