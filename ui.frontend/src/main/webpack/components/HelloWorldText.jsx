import React from 'react'

export default function HelloWorldText({text}) {
  console.log('config ', text);

  return (
    <p>text from props: {text}</p>
  )
}
