import { Link } from 'react-router-dom'

import ExperienceCard from '../../components/cards/ExperienceCard'
import TitleText from '../../components/nav/TitleText'


const Experiences = ({ experiences }) => {

  return (
    <div className='space-y-10'>
        <TitleText title='Experiences' />
        <div className='px-4 space-y-10'>
          <div>
            <h1 class="mb-4 text-5xl font-extrabold tracking-tight leading-none text-gray-900">Unlock your next <span class="underline underline-offset-3 decoration-8 decoration-indigo-500">experience</span>.</h1>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">They said it's just a jpeg, huh? Not at Disney. NFTs can also serve as tickets to unlocking new magical experiences.</p>
          </div>
          <div className="flex flex-wrap gap-8">
              { 
                  experiences.length > 0 &&
                  experiences.map((experience) => {
                      return (
                        <Link to={`/experiences/${experience.address}`}>
                          <ExperienceCard 
                            experience={experience}
                          />
                        </Link>
                      );
                  })
              }
          </div>
        </div>
    </div>
  )
}

export default Experiences