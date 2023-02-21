const expandObjectKeys = (obj: Record<string, any>): Record<string, any>  => {
  const keys = Object.keys(obj);

  keys.forEach(key => {
    const subkeys = key.split(/,\s?/)
    const target = obj[key];
    delete obj[key];
    subkeys.forEach((key) => { obj[key] = target })
  })

  return obj;
}

export default expandObjectKeys
