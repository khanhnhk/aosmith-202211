import React from 'react'

interface Thumbnail {
  file: string
}

function Thumbnail({ file }: Thumbnail) {
  return (
    <img src={file} className="img-thumbnail mt-2" height={200} width={200} />
  )
}

export default Thumbnail
