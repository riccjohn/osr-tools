import armorList from "./data/armor.json"
import gearList from "./data/gear.json"
import weaponList from "./data/weapons.json"
import Gear from "./Gear"

jest.mock("@/dice/Randomization")

describe("Gear", () => {
  const itemSlots = 12
  let gear: Gear

  beforeEach(() => {
    gear = new Gear(itemSlots)
  })

  describe("initialization", () => {
    test("sets the max item slots", () => {
      expect(gear.itemSlots).toEqual(itemSlots)
    })
  })

  describe("items", () => {
    test("contains 2 days of rations", () => {
      const rations = gear.items.filter((g: IGear) => g.name === "rations")
      expect(rations).toHaveLength(2)
    })

    test("contains 2 pieces of dungeonnering gear", () => {
      const dungeoneeringGear = gear.items.filter((item: IGear) =>
        gearList.dungeoneeringGear.includes(item)
      )
      expect(dungeoneeringGear).toHaveLength(2)
    })

    test("has one piece of gear from General Gear Set 1", () => {
      const generalGear1 = gear.items.filter((item: IGear) =>
        gearList.generalGearSetOne.includes(item)
      )
      expect(generalGear1).toHaveLength(1)
    })

    test("has one piece of gear from General Gear 2", () => {
      const generalGear2 = gear.items.filter((item: IGear) =>
        gearList.generalGearSetTwo.includes(item)
      )
      expect(generalGear2).toHaveLength(1)
    })
  })

  describe("armor", () => {
    test("selects a random piece of armor", () => {
      expect(armorList.armor.includes(gear.armor)).toBeTruthy()
    })

    test("adds the armor to the characters gear", () => {
      const armor = gear.items.filter((item: IGear) => item.type === "armor")

      expect(armor).toHaveLength(1)
    })
  })

  describe("weapon", () => {
    test("selects a random weapon", () => {
      expect(weaponList.weapons.includes(gear.weapon)).toBeTruthy()
    })

    test("adds the weapon to the characters gear", () => {
      const weapon = gear.items.filter((item: IGear) => item.type === "weapon")
      expect(weapon).toHaveLength(1)
    })
  })

  test("only adds items that fit in the available slots", () => {
    const itemSlotsAvailable = 8

    const gearArray = new Array(10)
      .fill(undefined)
      .map(el => new Gear(itemSlotsAvailable))

    gearArray.forEach(gear => {
      const itemSlotsUsed = gear.items.reduce((acc, curr) => {
        return (acc += curr.slots)
      }, 0)

      expect(itemSlotsUsed).toBeLessThanOrEqual(itemSlotsAvailable)
    })
  })
})
