const features = [
  { label: "Inventário", active: true },
  { label: "Magias", active: false },
  { label: "Status", active: false },
  { label: "Quests", active: false },
  { label: "Multiplayer", active: false },
]

let intervalPress = {
    active: false,
    id: undefined,
}

const keyCodes = { 
  up: ["ArrowUp", "Numpad8", "KeyW"],
  down: ["ArrowDown", "Numpad2", "KeyS"],
  enter: ["Enter", "NumpadEnter"],
}

const renderList = () => {
  document.querySelector('[data-js="features-list"]')
    .innerHTML = 
      features
        .reduce((acc, feature) => 
          `${acc}
          <i class="fa-duotone fa-sack"></i>
          <li class="${feature.active && 'active'}">${feature.label}</li>`
        ,'')
}

const getIndexOfActiveFeature = () => 
    features.findIndex(feature => feature.active) || 0

const setIndexOfActiveFeature = (direction, IndexOfActiveFeature) => {
  if(direction === "up") {
    if(IndexOfActiveFeature === 0) return features.length - 1
      return IndexOfActiveFeature - 1
  }
  if(direction === "down") {
    if(IndexOfActiveFeature+1 === features.length) return 0
    return IndexOfActiveFeature + 1
  }
}

const getActiveFeature = () => features[getIndexOfActiveFeature()]

const moveMenu = (direction) => {
  const IndexOfActiveFeature = getIndexOfActiveFeature()

  const newIndex = setIndexOfActiveFeature(direction, IndexOfActiveFeature)
  features[IndexOfActiveFeature].active = false
  features[newIndex].active = true
  renderList()
}

window.addEventListener('load', e => {
  renderList()
  initControllsEvent(intervalPress)
})

initControllsEvent = (intervalPress) => {
      let direction

  document.addEventListener('keyup', e => {
      if(intervalPress?.id) {
      clearInterval(intervalPress.id)
      intervalPress = {
        active: false,
        id: undefined,
      }
    }
    if(keyCodes.up.includes(e.code)) direction = 'up'
    if(keyCodes.down.includes(e.code)) direction = 'down'
    if(keyCodes.enter.includes(e.code)) alert(JSON.stringify(getActiveFeature()))
    direction && moveMenu(direction)
  })

  document.addEventListener('keydown', e => {
    if(keyCodes.up.includes(e.code)) direction = 'up'
    if(keyCodes.down.includes(e.code)) direction = 'down'
    if(direction && !intervalPress.active) {
      intervalPress = {
        active: true,
        id: setInterval(() => moveMenu(direction), 200)
      }
    }
  })
}
