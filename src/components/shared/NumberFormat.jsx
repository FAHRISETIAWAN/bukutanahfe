import React from 'react'

const NumberFormat = ({nilai}) => {

 const nominal = new Intl.NumberFormat("id-ID").format(nilai);

//  console.log(nominal)

  return (
    <span>{nominal}</span>
  )
}

export default NumberFormat