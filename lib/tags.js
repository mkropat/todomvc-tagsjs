export const fragment = (...contents) => {
  let f = document.createDocumentFragment()
  for (let c of contents.flat()) {
    f.appendChild(
      c instanceof Element || c instanceof DocumentFragment
        ? c
        : document.createTextNode(c)
    )
  }
  return f
}

const globalEventHandlers = ['onabort', 'onanimationcancel', 'onanimationend', 'onanimationiteration', 'onanimationstart', 'onauxclick', 'onblur', 'onerror', 'onfocus', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'onclose', 'oncontextmenu', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragexit', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onformdata', 'ongotpointercapture', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadend', 'onloadstart', 'onlostpointercapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onwheel', 'onpause', 'onplay', 'onplaying', 'onpointerdown', 'onpointermove', 'onpointerup', 'onpointercancel', 'onpointerover', 'onpointerout', 'onpointerenter', 'onpointerleave', 'onpointerlockchange', 'onpointerlockerror', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onselectstart', 'onselectionchange', 'onshow', 'onsort', 'onstalled', 'onsubmit', 'onsuspend', 'ontimeupdate', 'onvolumechange', 'ontouchcancel', 'ontouchend', 'ontouchmove', 'ontouchstart', 'ontransitioncancel', 'ontransitionend', 'ontransitionrun', 'ontransitionstart', 'onwaiting']
const directAttrs = new Set([...globalEventHandlers, 'checked', 'innerHTML'])

const tag = (tagName) => (...args) => {
  let [first, ...restArgs] = args
  let { options = {}, children } = typeof first !== 'object' || first === null || first instanceof Element || Array.isArray(first)
    ? { children: args }
    : { children: restArgs, options: first }

  let { class: class_ = [], ...attrs } = options

  let el = document.createElement(tagName)

  if (typeof class_ === 'string') {
    el.className = class_
  } else {
    for (let c of class_) {
      el.classList.add(c)
    }
  }

  for (let [k, v] of Object.entries(attrs)) {
    if (directAttrs.has(k)) {
      el[k] = v
    } else {
      el.setAttribute(k, v)
    }
  }

  for (let c of children.flat()) {
    el.appendChild(
      c instanceof Element || c instanceof DocumentFragment
        ? c
        : document.createTextNode(c)
    )
  }

  return el
}

export const a = tag('a')
export const abbr = tag('abbr')
export const address = tag('address')
export const area = tag('area')
export const article = tag('article')
export const aside = tag('aside')
export const audio = tag('audio')
export const b = tag('b')
export const bdi = tag('bdi')
export const bdo = tag('bdo')
export const blockquote = tag('blockquote')
export const br = tag('br')
export const button = tag('button')
export const canvas = tag('canvas')
export const caption = tag('caption')
export const cite = tag('cite')
export const codedata = tag('codedata')
export const col = tag('col')
export const colgroup = tag('colgroup')
export const datalist = tag('datalist')
export const dd = tag('dd')
export const del = tag('del')
export const details = tag('details')
export const dfn = tag('dfn')
export const dialog = tag('dialog')
export const div = tag('div')
export const dl = tag('dl')
export const dt = tag('dt')
export const em = tag('em')
export const embed = tag('embed')
export const fieldset = tag('fieldset')
export const figcaption = tag('figcaption')
export const figure = tag('figure')
export const footer = tag('footer')
export const form = tag('form')
export const h1 = tag('h1')
export const h2 = tag('h2')
export const h3 = tag('h3')
export const h4 = tag('h4')
export const h5 = tag('h5')
export const h6 = tag('h6')
export const header = tag('header')
export const hr = tag('hr')
export const i = tag('i')
export const iframe = tag('iframe')
export const img = tag('img')
export const input = tag('input')
export const ins = tag('ins')
export const kbd = tag('kbd')
export const label = tag('label')
export const legend = tag('legend')
export const li = tag('li')
export const main = tag('main')
export const map = tag('map')
export const mark = tag('mark')
export const math = tag('math')
export const menu = tag('menu')
export const meter = tag('meter')
export const nav = tag('nav')
export const noscript = tag('noscript')
export const object = tag('object')
export const ol = tag('ol')
export const optgroup = tag('optgroup')
export const option = tag('option')
export const output = tag('output')
export const p = tag('p')
export const param = tag('param')
export const picture = tag('picture')
export const portal = tag('portal')
export const pre = tag('pre')
export const progress = tag('progress')
export const q = tag('q')
export const rb = tag('rb')
export const rp = tag('rp')
export const rt = tag('rt')
export const rtc = tag('rtc')
export const ruby = tag('ruby')
export const s = tag('s')
export const samp = tag('samp')
export const script = tag('script')
export const section = tag('section')
export const select = tag('select')
export const small = tag('small')
export const source = tag('source')
export const span = tag('span')
export const strong = tag('strong')
export const sub = tag('sub')
export const summary = tag('summary')
export const sup = tag('sup')
export const svg = tag('svg')
export const table = tag('table')
export const tbody = tag('tbody')
export const td = tag('td')
export const textarea = tag('textarea')
export const tfoot = tag('tfoot')
export const th = tag('th')
export const thead = tag('thead')
export const time = tag('time')
export const tr = tag('tr')
export const track = tag('track')
export const u = tag('u')
export const ul = tag('ul')
export const var_ = tag('var')
export const video = tag('video')
export const wbr = tag('wbr')
