class Description {
  public traits

  constructor() {
    this.traits = this.generateRandomTraits()
  }

  private generateRandomTraits() {
    return {
      physique: 'physique-trait',
      face: 'face-trait',
      skin: 'skin-trait',
      hair: 'hair-trait',
      clothing: 'clothing-trait',
      virtue: 'virtue-trait',
      vice: 'vice-trait',
      speech: 'speech-trait',
      background: 'background-trait',
      misfortune: 'misfortune-trait',
    }
  }
}

export default Description
