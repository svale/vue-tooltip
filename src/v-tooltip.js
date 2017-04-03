import Tooltip from 'tether-tooltip'

import { addClasses, removeClasses, replaceClasses } from './utils'

const positions = [
  'top-left',
  'left-top',
  'left-middle',
  'left-bottom',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'right-bottom',
  'right-middle',
  'right-top',
  'top-right',
  'top-center',
]

export const defaultTetherOptions = {
  constraints: [
    {
      to: 'window',
      attachment: 'together',
      pin: true,
    },
  ],
}

export const defaultOptions = {
  tetherOptions: defaultTetherOptions,
  defaultClass: 'vue-tooltip-theme',
  openOn: 'hover',
}

function createTooltip (el, value, modifiers) {
  let position = 'top-center'
  for (const pos of positions) {
    if (modifiers[pos]) {
      position = pos
    }
  }
  position = position.replace('-', ' ')

  const content = value.content || value

  let classes = directive.options.defaultClass
  if (value.classes) {
    classes = value.classes
  }

  let openOn = directive.options.openOn
  if (value.show) {
    // if value is true or false, set openOn to null and controll the tooltip programmatically by the boolean
    openOn = (typeof value.show === 'boolean') ? 'null' : value.show
  }

  el._tooltip = new Tooltip({
    target: el,
    position,
    content,
    classes,
    openOn,
    tetherOptions: directive.options.tetherOptions,
  })
}

function destroyTooltip (el) {
  if (el._tooltip) {
    el._tooltip.destroy()
    delete el._tooltip
  }
}

const directive = {
  options: defaultOptions,
  bind (el, { value, modifiers }) {
    const content = value && value.content || value
    destroyTooltip(el)
    if (content) {
      createTooltip(el, value, modifiers)
    }
  },
  update (el, { value, oldValue, modifiers }) {
    const content = value && value.content || value
    if (!content) {
      destroyTooltip(el)
    } else if (el._tooltip) {
      const drop = el._tooltip.drop

      // Content
      drop.content.innerHTML = content

      // CSS classes
      const oldClasses = oldValue && oldValue.classes
      if (value && value.classes) {
        if (oldClasses) {
          replaceClasses(drop.drop, value.classes, oldClasses)
        } else {
          addClasses(drop.drop, value.classes)
        }
      } else if (oldClasses) {
        removeClasses(drop.drop, oldClasses)
      }

      // show (open) / hide (close)
      if (value && typeof value.show !== 'undefined') {
        if (value.show) {
          el._tooltip.open()
        } else {
          el._tooltip.close()
        }
      }
    } else {
      createTooltip(el, value, modifiers)
    }
  },
  unbind (el) {
    destroyTooltip(el)
  },
}

export default directive
