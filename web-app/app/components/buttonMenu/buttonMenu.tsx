import React from 'react'

const ButtonMenu = (props: { text: string }) => {
  return (
    <div className="bg-white rounded-3xl btn btn-sm">
      <div className="text-xl text-center text-black">{props.text}</div>
    </div>
  )
}

export default ButtonMenu
