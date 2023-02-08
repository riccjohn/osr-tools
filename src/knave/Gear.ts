import armorList from "@/knave/data/armor.json"
import gearList from "@/knave/data/gear.json"
import weaponList from "@/knave/data/weapons.json"
import { Randomization } from "@/dice"

class Gear {
  public itemSlots: number
  public items: IGear[]
  public armor: IArmor
  public weapon: IWeapon
  private itemSlotsUsed: number

  constructor(itemSlots: number) {
    // Order matters! this.getRandomGear must be last
    this.itemSlots = itemSlots
    this.itemSlotsUsed = 6
    this.armor = this.getRandomArmor()
    this.weapon = this.getRandomWeapon()
    this.items = this.getRandomGear()
  }

  private getRandomArmor = (): IArmor => {
    const slotsRemaining = this.itemSlots - this.itemSlotsUsed

    const availableArmor = (armorList.armor as IArmor[]).filter(armor => {
      // Ensures there is at least 1 slot remaining for a weapon to be added
      return armor.slots < slotsRemaining
    })
    const armor = Randomization.getRandomItem(availableArmor)
    this.itemSlotsUsed += armor.slots
    return armor
  }

  private getRandomWeapon = (): IWeapon => {
    const slotsRemaining = this.itemSlots - this.itemSlotsUsed
    const availableWeapons = (weaponList.weapons as IWeapon[]).filter(
      weapon => {
        return weapon.slots <= slotsRemaining
      }
    )
    const weapon = Randomization.getRandomItem(availableWeapons)
    this.itemSlotsUsed += weapon.slots
    return weapon
  }

  private getRandomGear(): IGear[] {
    const dg = gearList.dungeoneeringGear as IGear[]
    const gen1 = gearList.generalGearSetOne as IGear[]
    const gen2 = gearList.generalGearSetTwo as IGear[]

    const startingGear: IGear[] = [
      { name: "rations", count: 1, slots: 1, type: "food" },
      { name: "rations", count: 1, slots: 1, type: "food" },
    ]

    const dungeoneeringGear: IGear[] = new Array(2)
      .fill(undefined)
      .map(el => Randomization.getRandomItem(dg))

    const generalGear1 = Randomization.getRandomItem(gen1)
    const generalGear2 = Randomization.getRandomItem(gen2)

    // TODO: refactor so this isn't dependent on getRandomArmor being called first in the constructor
    return [
      ...startingGear,
      ...dungeoneeringGear,
      generalGear1,
      generalGear2,
      this.armor,
      this.weapon,
    ]
  }
}

export default Gear
