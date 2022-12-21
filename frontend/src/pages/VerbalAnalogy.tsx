import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { FormatContainer } from '../components/FormatContainer'
import { Page } from '../components/Page'
import { SplitView } from '../components/SplitView'
import { SubTitle } from '../components/SubTitle'
import { TestForm } from '../components/TestForm'
import { Title } from '../components/Title'
import { useExperiment } from '../hooks/useExperiment'
import { getString } from '../shared/Localization'

export function VerbalAnalogy() {
  const { id } = useExperiment()

  const onTimeOut = useCallback(() => {
    window.alert(getString('verbal_analogy_timeout_alert'))
  }, [])

  return (
    <Page onTimeOut={onTimeOut}>
      <SplitView initialWidths={[3, 6]}>
        <FormatContainer>
          <Title>{getString('verbal_analogy_title')}</Title>
          <p>{getString('verbal_analogy_introduction')}</p>
          <Title>{getString('verbal_analogy_learn_analogies')}</Title>
          <p>{getString('verbal_analogy_learn_content')}</p>
          <SubTitle>{getString('verbal_analogy_method')}</SubTitle>
          <p>{getString('verbal_analogy_method_content')}</p>
          <SubTitle>{getString('verbal_analogy_tips')}</SubTitle>
          <ul>
            <li>{getString('verbal_analogy_tip1')}</li>
            <li>{getString('verbal_analogy_tip2')}</li>
            <li>{getString('verbal_analogy_tip3')}</li>
            <li>{getString('verbal_analogy_tip4')}</li>
          </ul>
          <SubTitle>{getString('verbal_analogy_relationships')}</SubTitle>
          <p>
            {getString('verbal_analogy_sameness')}
            <Example>wealthy: affluent:: indigent: poverty-stricken</Example>
          </p>
          <p>
            {getString('verbal_analogy_oppositeness')}
            <Example>zenith: nadir:: pinnacle: valley</Example>
          </p>
          <p>
            {getString('verbal_analogy_classification_order')}
            <Example>orange: fruit:: beet: vegetable</Example>
          </p>
          <p>
            {getString('verbal_analogy_difference_of_degree')}
            <Example>clever: crafty:: modest: prim</Example>
          </p>
          <p>
            {getString('verbal_analogy_person_related')}
            <Example>entomologist: insects:: philosopher: ideas</Example>
          </p>
          <p>
            {getString('verbal_analogy_part_and_whole')}
            <Example>eraser: pencil:: tooth: comb</Example>
          </p>
          <p>
            {getString('verbal_analogy_steps_in_process')}
            <Example>cooking: serving:: word processing: printing</Example>
          </p>
          <p>
            {getString('verbal_analogy_cause_and_effect')}
            <Example>fire: scorch:: blizzard: freeze</Example>
          </p>
          <p>
            {getString('verbal_analogy_things_and_function')}
            <Example>scissors: cut:: pen: write</Example>
          </p>
          <p>
            {getString('verbal_analogy_qualities')}
            <Example>aluminum: lightweight:: thread: fragile</Example>
          </p>
          <p>
            {getString('verbal_analogy_substance')}
            <Example>silk: scarf:: wool: sweater</Example>
          </p>
          <p>
            {getString('verbal_analogy_implied_relationships')}
            <Example>clouds: sun:: hypocrisy: truth</Example>
          </p>
          <p>
            {getString('verbal_analogy_things_and_lacks')}
            <Example>atheist: belief:: indigent: money</Example>
          </p>
          <p>
            {getString('verbal_analogy_symbol')}
            <Example>dove: peace:: four-leaf clover: luck</Example>
          </p>
        </FormatContainer>
        <TestForm
          testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSf0QXPsxc_tcc1B8Rr80JoZ3yBquO8rWgMp0UYt0gdKQGMMXg/viewform?usp=pp_url&entry.1707229012=${id}`}
        />
      </SplitView>
    </Page>
  )
}

const Example = styled.span`
  margin-left: 8px;
`
