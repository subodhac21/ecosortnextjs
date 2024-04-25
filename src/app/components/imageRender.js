import React from 'react'
import { api } from '../lib/api'

const imageRender = (cardImage) => {
  return api.Api+"static/"+cardImage;
}

export {imageRender}
