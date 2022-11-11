import ExperienceCard from '../../components/cards/ExperienceCard'
import TitleText from '../../components/TitleText'
import { Link } from 'react-router-dom'

const Experiences = ({ experiences }) => {

  return (
    <div className='space-y-10'>
        <TitleText title='Experiences' />

        <div className='p-4 pt-4 space-y-10'>
          <div>
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Unlock your next <span class="underline underline-offset-3 decoration-8 decoration-indigo-500">experience.</span></h1>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">They said it's just a jpeg, huh? Not at Disney. NFTs can also serve as tickets to unlocking new magical experiences.</p>
          </div>

          <div className="nftList">
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