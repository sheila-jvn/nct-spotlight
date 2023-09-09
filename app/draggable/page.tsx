'use client'

import { useDragContext } from '@/components/DeltaProvider'
import Image from 'next/image'

export default function DraggablePage() {
  const { parentProps, transform } = useDragContext()

  return (
    <main
      className='w-screen h-screen bg-aespa-babypink bg-gradient-aespa'
      {...parentProps}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
        vel id ducimus obcaecati nobis ullam voluptatibus et, veritatis illum
        praesentium? Sint dignissimos adipisci consectetur. A eum assumenda
        facilis velit laborum!
      </p>

      <p>Delta: {JSON.stringify(transform)}</p>

      <Image
        className='shadow-xl origin-center'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translateX(200px) translate(${transform.x}px, ${transform.y}px)`
        }}
        width={200}
        height={200}
        src='https://static.wikia.nocookie.net/aespa/images/8/81/Life%27s_Too_Short_Song_Cover.jpeg/revision/latest?cb=20220620150103'
        alt='Vercel Logo'
        draggable={false}
      />

      <Image
        className='shadow-xl origin-center'
        style={{
          position: 'fixed',
          top: 400,
          left: 600,
          transform: `translate(${transform.x}px, ${transform.y}px)`
        }}
        width={200}
        height={200}
        src='https://static.wikia.nocookie.net/aespa/images/8/81/Life%27s_Too_Short_Song_Cover.jpeg/revision/latest?cb=20220620150103'
        alt='Vercel Logo'
        draggable={false}
      />

      <div className='flex'></div>
    </main>
  )
}
