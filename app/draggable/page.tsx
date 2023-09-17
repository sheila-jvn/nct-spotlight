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
      <p>Transform: {JSON.stringify(transform)}</p>

      <Image
        className='shadow-xl origin-center'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
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
