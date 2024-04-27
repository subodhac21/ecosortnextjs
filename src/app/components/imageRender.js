import React from 'react'
import { api } from '../lib/api'

const imageRender = (cardImage) => {
  return api.Api+"media/ecosort/"+cardImage;
}

export {imageRender}
