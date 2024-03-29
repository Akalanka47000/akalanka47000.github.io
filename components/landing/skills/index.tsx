import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffectOnce, useResponsive } from '@/hooks'
import { default as ApplicationState } from '@appstate'
import SkillCard from './card'
import { Skill, desktopSkills, mobileSkills } from './data'

const Skills = (): JSX.Element => {
  const { hoveredCard } = useSelector((state: ApplicationState) => state.ui.skills)

  const { mobile } = useResponsive()

  const [scrollPosition, setScrollPosition] = useState<Number>(0)
  const [lastRendered, setLastRendered] = useState<String>()
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    setSkills(mobile ? mobileSkills : desktopSkills)
  }, [mobile])

  useEffectOnce(() => {
    const onScroll = (e: any) => {
      setScrollPosition(e.target.documentElement.scrollTop)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  })

  const cleanGrid = () => {
    document.querySelectorAll('.lightning-grid-line')?.forEach((line) => {
      line.remove()
    })
  }

  useEffect(() => {
    if (process.browser) {
      console.log(234, hoveredCard, scrollPosition)
      cleanGrid()
      if (hoveredCard && !mobile) {
        const centerElement = document.getElementById(hoveredCard)
        if (window.getComputedStyle(centerElement!).getPropertyValue('opacity') === '1') {
          const originBounds = centerElement?.getBoundingClientRect()
          skills.forEach((_skill, index) => {
            if (index !== Number(hoveredCard.split('-').pop())) {
              const target = document.getElementById(`skill-card-${index}`)?.getBoundingClientRect()
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
              line.setAttribute(
                'class',
                `lightning-grid-line vh ${lastRendered !== hoveredCard ? 'animate-grid-mesh' : ''}`
              )
              line.setAttribute('x1', (originBounds!.left + originBounds!.width / 2).toString())
              line.setAttribute('y1', (originBounds!.top + originBounds!.height / 2).toString())
              line.setAttribute('x2', (target!.left + target!.width / 2).toString())
              line.setAttribute('y2', (target!.top + target!.height / 2).toString())
              line.setAttribute('style', 'stroke: #b81912; stroke-width: 1; pointer-events: none; opacity: 0.4;')
              document.getElementById('lightning-grid')?.append(line)
            }
          })
          setLastRendered(hoveredCard)
        }
      }
    }
  }, [hoveredCard, scrollPosition])

  return (
    <>
      <div
        id="skill-section"
        className="font-bold text-5xl xl:text-6xl 2xl:text-7xl text-white blink text-center mx-6 cursor-default transition ease-in mt-20 lg:mt-36"
        data-aos="fade-left"
      >
        My Arsenal
      </div>
      <div className="w-full pt-20 lg:pt-36 py-36 pb-24 lg:pb-36 px-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 gap-y-16 lg:gap-y-24 place-items-center">
        {skills.map((skill, index) => {
          return (
            <div data-aos={index % 2 == 0 ? 'fade-right' : 'fade-left'} key={`${skill?.name}-${index}`}>
              <SkillCard
                index={index}
                name={skill?.name || ''}
                logo={skill?.image || ''}
                width={skill?.logoWidth || ''}
                link={skill?.link || ''}
              />
            </div>
          )
        })}
      </div>
      <svg id="lightning-grid" className="w-full h-full fixed left-0 top-0 z-[-1] m-0 pointer-events-none" />
    </>
  )
}

export default Skills
