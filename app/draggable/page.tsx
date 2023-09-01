'use client'

import { useDragContext } from '@/components/DeltaProvider'
import Image from 'next/image'

export default function DraggablePage() {
  const { parentProps, transform } = useDragContext()

  return (
    <main className='w-screen h-screen bg-red-500' {...parentProps}>
      <h1 style={{ transform }}>Hello</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
        vel id ducimus obcaecati nobis ullam voluptatibus et, veritatis illum
        praesentium? Sint dignissimos adipisci consectetur. A eum assumenda
        facilis velit laborum!
      </p>

      <p>Delta: {transform}</p>

      <Image
        style={{
          position: 'fixed',
          top: 200,
          left: 200,
          transform
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
