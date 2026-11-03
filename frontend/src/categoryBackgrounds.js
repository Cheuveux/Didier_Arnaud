import backgroundMountain from './assets/background_mountain.png'
import snowBg from './assets/snow.png'
import voyageBg from './assets/voyage_bg.png'
import jazzBg from './assets/jazz_bg.png'
import aucunLienBg from './assets/aucun_lien_bg.gif'

export const categoryBackgrounds = {
  mountain: backgroundMountain,
  snow: snowBg,
  voyage: voyageBg,
  jazz: jazzBg,
  'aucun lien': aucunLienBg,
}

export const defaultBackground = backgroundMountain

export const categoryBackgroundList = [
  categoryBackgrounds.mountain,
  categoryBackgrounds.snow,
  categoryBackgrounds.voyage,
  categoryBackgrounds.jazz,
]

export function getBackgroundForCategory(categoryName) {
  if (!categoryName) return defaultBackground

  const normalizedName = categoryName.trim().toLowerCase()
  return categoryBackgrounds[normalizedName] || defaultBackground
}

export function getRandomBackground() {
  const randomIndex = Math.floor(Math.random() * categoryBackgroundList.length)
  return categoryBackgroundList[randomIndex]
}
