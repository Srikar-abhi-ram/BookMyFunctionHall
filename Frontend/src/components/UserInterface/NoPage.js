import React from 'react'
import { Link } from 'react-router-dom'
import { animated, useSpring } from '@react-spring/web'
import { Icon } from '@iconify/react'
import warningCircleOutline from '@iconify/icons-mdi/warning-circle-outline'
import { TailSpin } from 'react-loader-spinner'

const NoPage = () => {
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  })

  return (
    <animated.div style={style} className="h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <Icon
          icon={warningCircleOutline}
          className="text-8xl text-yellow-500"
          style={{ animation: 'spin 2s linear infinite' }}
        />
        <h1 className="text-5xl font-bold tracking-wide">Uh-oh!</h1>
        <p className="text-2xl text-gray-600 tracking-wide">
          It looks like the page you are looking for doesn't exist.
        </p>
        <Link to="/" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go back home
        </Link>
      </div>
      <TailSpin color="#00BFFF" height={80} width={80} className="mt-12" />
    </animated.div>
  )
}

export default NoPage
