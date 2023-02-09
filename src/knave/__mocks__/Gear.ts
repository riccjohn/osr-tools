class Gear {
  public itemSlots: number
  public items: IGear[]
  public armor: IArmor[]
  public weapon: IWeapon

  constructor(itemSlots: number) {
    this.itemSlots = itemSlots
    this.items = [
      { name: 'item 1', slots: 1, type: 'tool', count: 1 },
      { name: 'item 2', slots: 1, type: 'tool', count: 1 },
      { name: 'item 3', slots: 1, type: 'tool', count: 1 },
      { name: 'item 4', slots: 1, type: 'tool', count: 1 },
      { name: 'item 5', slots: 1, type: 'tool', count: 1 },
      { name: 'item 6', slots: 1, type: 'tool', count: 1 },
    ]
    this.armor = [
      {
        name: 'gambeson armor',
        count: 1,
        defense: 12,
        slots: 1,
        type: 'armor',
        quality: 3,
      },
    ]
    this.weapon = {
      count: 1,
      damage: 'd6',
      hand: 1,
      name: 'weapon-name',
      quality: 10,
      slots: 1,
      type: 'weapon',
    }
  }
}

export default Gear
