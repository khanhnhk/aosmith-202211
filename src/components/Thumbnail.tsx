import React from 'react'

interface Thumbnail {
  file: string
}

const unlinkObjectUrl = file => {
  if (file) {
    URL.revokeObjectURL(file)
  }
}

function Thumbnail({ file }: Thumbnail) {
  return (
    <img
      src={file}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
      onLoad={unlinkObjectUrl}
    />
  )
}

export default Thumbnail
