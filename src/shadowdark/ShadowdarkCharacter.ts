import { Dice, Randomization } from '@/dice'
import { expandObjectKeys } from '@/helpers'
import {
  abilityModifiers,
  characterClasses,
  languages as allLanguages,
  names,
  races,
  titlesByClass,
} from './data'
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
  public name: string = ''
  public level: number = 1
  public characterClass: string = ''
  public maxHp: number = 0
  public alignment: ShadowdarkAlignment = 'neutral'
  public title: string = ''
  public spells: string[] = []

  public generate = () => {
    this.generateAbilityScores()
    this.generateRace()
    this.level = 1
    this.generateAlignment()
    this.rollClass()
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

  private generateAbilityScores = (): void => {
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

    this.abilities = {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    }
  }

  private generateRace = (): void => {
    const dieRoll = Dice.roll(races.length - 1)
    const race = (races as IShadowdarkRace[])[dieRoll]
    const languages = this.determineLanguages(race)

    this.languages = languages
    this.race = race
    this.name = this.rollName(race)
  }

  private rollName = (race: IShadowdarkRace): string => {
    const raceName = (race.name as string).toLowerCase()
    const namesByRace: Record<string, string[]> = names
    const namesForRace = namesByRace[raceName]

    return namesForRace[Dice.roll(namesForRace.length - 1)]
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

  private generateAlignment = (): void => {
    const alignmentChances = {
      '1, 2, 3': 'lawful',
      '4, 5': 'neutral',
      '6': 'chaotic',
    }

    const expandedAlignmentChances = expandObjectKeys(alignmentChances)
    const dieRoll = Dice.roll(6)
    const alignment = expandedAlignmentChances[dieRoll]

    this.alignment = alignment
  }

  private rollClass = (): void => {
    const classes: ShadowdarkClassName[] = [
      'cleric',
      'fighter',
      'thief',
      'wizard',
    ]

    const chosenClass = Randomization.getRandomItem(
      classes as string[],
    ) as ShadowdarkClassName

    this.addBasicClassFeatures(chosenClass)
  }

  private addTitle = () => {
    const titles = titlesByClass as IShadowdarkTitlesByClass
    const classTitles = titles[this.characterClass as ShadowdarkClassName]
    const titlesForClassAndLevel = classTitles.find(title =>
      title.levels.includes(this.level),
    )! as IShadowdarkTitlesByLevel
    const title = titlesForClassAndLevel[this.alignment]

    this.title = title
  }

  private addBasicClassFeatures = (characterClass: ShadowdarkClassName): void => {
    this.characterClass = characterClass
    this.addTitle()
    const classData = (characterClasses as IShadowdarkClassData[]).find(
      classData => classData.name === this.characterClass,
    )!
    this.maxHp = Dice.roll(classData.hitDie)
  }
}

export default ShadowdarkCharacter
