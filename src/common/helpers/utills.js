export const buildImageUrl = (image, size) => `url(${image[size]['#text']})`

export const camelize = name => `${name[0].toUpperCase()}${name.slice(1, name.length)}`
