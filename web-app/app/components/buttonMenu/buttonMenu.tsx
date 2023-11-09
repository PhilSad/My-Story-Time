import React from 'react'

const ButtonMenu = (props: { text: string }) => {
  return (
    <div className="bg-white rounded-3xl">
      <div className="text-black text-2xl text-center pl-5 pr-5 pt-2 pb-2">{props.text}</div>
    </div>
  )
}

export default ButtonMenu
