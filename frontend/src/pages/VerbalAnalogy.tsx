import React, { useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import FormatContainer from '../components/FormatContainer/FormatContainer'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { useGoogleForm } from '../hooks/useGoogleForm'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'

function VerbalAnalogy(props: RouteComponentProps) {
  const { participantID, onUrlChange } = useGoogleForm(props.history.push)

  const onTimeOut = useCallback(() => {
    window.alert(getString('verbal_analogy_timeout_alert'))
  }, [])

  return (
    <div>
      <Header onTimeOut={onTimeOut} />
      <InstructionTask
        instruction={
          <FormatContainer>
            <h1>{getString('verbal_analogy_title')}</h1>
            <p>{getString('verbal_analogy_introduction')}</p>
            <h1>{getString('verbal_analogy_learn_analogies')}</h1>
            <p>{getString('verbal_analogy_learn_content')}</p>
            <h2>{getString('verbal_analogy_method')}</h2>
            <p>{getString('verbal_analogy_method_content')}</p>
            <h2>{getString('verbal_analogy_tips')}</h2>
            <ul>
              <li>{getString('verbal_analogy_tip1')}</li>
              <li>{getString('verbal_analogy_tip2')}</li>
              <li>{getString('verbal_analogy_tip3')}</li>
              <li>{getString('verbal_analogy_tip4')}</li>
            </ul>
            <h2>{getString('verbal_analogy_relationships')}</h2>
            <h3>{getString('verbal_analogy_sameness')}</h3>
            <ul>
              <li>wealthy: affluent:: indigent: poverty-stricken</li>
            </ul>
            <h3>{getString('verbal_analogy_oppositeness')}</h3>
            <ul>
              <li>zenith: nadir:: pinnacle: valley</li>
            </ul>
            <h3>{getString('verbal_analogy_classification_order')}</h3>
            <ul>
              <li>orange: fruit:: beet: vegetable</li>
            </ul>
            <h3>{getString('verbal_analogy_difference_of_degree')}</h3>
            <ul>
              <li>clever: crafty:: modest: prim</li>
            </ul>
            <h3>{getString('verbal_analogy_person_related')}</h3>
            <ul>
              <li>entomologist: insects:: philosopher: ideas</li>
            </ul>
            <h3>{getString('verbal_analogy_part_and_whole')}</h3>
            <ul>
              <li>eraser: pencil:: tooth: comb</li>
            </ul>
            <h3>{getString('verbal_analogy_steps_in_process')}</h3>
            <ul>
              <li>cooking: serving:: word processing: printing</li>
            </ul>
            <h3>{getString('verbal_analogy_cause_and_effect')}</h3>
            <ul>
              <li>fire: scorch:: blizzard: freeze</li>
            </ul>
            <h3>{getString('verbal_analogy_things_and_function')}</h3>
            <ul>
              <li>scissors: cut:: pen: write</li>
            </ul>
            <h3>{getString('verbal_analogy_qualities')}</h3>
            <ul>
              <li>aluminum: lightweight:: thread: fragile</li>
            </ul>
            <h3>{getString('verbal_analogy_substance')}</h3>
            <ul>
              <li>silk: scarf:: wool: sweater</li>
            </ul>
            <h3>{getString('verbal_analogy_implied_relationships')}</h3>
            <ul>
              <li>clouds: sun:: hypocrisy: truth</li>
            </ul>
            <h3>{getString('verbal_analogy_things_and_lacks')}</h3>
            <ul>
              <li>atheist: belief:: indigent: money</li>
            </ul>
            <h3>{getString('verbal_analogy_symbol')}</h3>
            <ul>
              <li>dove: peace:: four-leaf clover: luck</li>
            </ul>
          </FormatContainer>
        }
        task={
          <TestForm
            testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSf0QXPsxc_tcc1B8Rr80JoZ3yBquO8rWgMp0UYt0gdKQGMMXg/viewform?usp=pp_url&entry.1707229012=${participantID}`}
            urlChangeListener={onUrlChange}
          />
        }
      />
    </div>
  )
}

export default VerbalAnalogy
