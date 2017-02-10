
function findByKey(key) {
  return this.items.find(({ key: elKey }) => elKey === key)
}

function getItems(locale = 'en') {
  return this.items.map(
    ({ name, key: value }) => (
      {
        value,
        label: name[locale]
      })
   )
}

export default {
  styles: {
    findByKey,
    getItems,
    items: [
      {
        key : 1,
        name: {
          ru: 'Рок',
          en: 'Rock'
        }
      },
      {
        key : 2,
        name: {
          ru: 'Метал',
          en: 'Metal'
        }
      },
      {
        key : 3,
        name: {
          ru: 'Джаз',
          en: 'Jazz'
        }
      },
      {
        key : 4,
        name: {
          ru: 'Блюз',
          en: 'Blues'
        }
      },
      {
        key : 5,
        name: {
          ru: 'Фанк',
          en: 'Funk'
        }
      },
    ],
    default: null,
  },

  instruments: {
    findByKey,
    getItems,
    items: [
      {
        key: 1,
        name: {
          ru: 'Электро гитара',
          en: 'Electro guitar'
        }
      },
      {
        key: 2,
        name: {
          ru: 'Барабаны',
          en: 'Drums'
        }
      },
      {
        key: 3,
        name: {
          ru: 'Басс гитара',
          en: 'Bass guitar'
        }
      },
      {
        key: 4,
        name: {
          ru: 'Вокал',
          en: 'Vocal'
        }
      },
      {
        key: 5,
        name: {
          ru: 'Пианино',
          en: 'Piano'
        }
      },
    ],
    default: null,
  }
}
