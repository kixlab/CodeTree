import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { Assessment } from './pages/Assessment'
import Cognitive from './pages/Cognitive'
import Consent from './pages/Consent'
import Contact from './pages/Contact'
import Demographic from './pages/Demographic'
import { Instruction } from './pages/Instruction'
import Label from './pages/Label'
import LabelTutorial from './pages/LabelTutorial'
import { Parsons } from './pages/Parsons'
import { PersonalizedPresent } from './pages/PersonalizedPresent'
import { PostTest } from './pages/PostTest'
import { Practice } from './pages/Practice'
import { PreTest } from './pages/PreTest'
import PythonTutorial from './pages/PythonTutorial'
import Survey from './pages/Survey'
import VerbalAnalogy from './pages/VerbalAnalogy'
import Vote from './pages/Vote'
import { VoteTutorial } from './pages/VoteTutorial'
import WorkedExample from './pages/WorkedExample'
import WrapUp from './pages/WrapUp'

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="instruction" element={<Instruction />} />
      <Route path="python-tutorial" element={<PythonTutorial />} />
      <Route path="consent/" element={<Consent />} />
      <Route path="demographic" element={<Demographic />} />
      <Route path="pretest" element={<PreTest />} />
      <Route path="verbal-analogy" element={<VerbalAnalogy />} />
      <Route path="label-tutorial" element={<LabelTutorial />} />
      <Route path="vote-tutorial" element={<VoteTutorial />} />
      <Route path="worked-example/:lecture/:fileName" element={<WorkedExample />} />
      <Route path="label/:lecture/:fileName" element={<Label />} />
      <Route path="vote/:lecture/:fileName" element={<Vote />} />
      <Route path="practice/:category/:problemId" element={<Practice />} />
      <Route path="assessment/:lecture/:fileName" element={<Assessment />} />
      <Route path="parsons/:lecture/:fileName" element={<Parsons />} />
      <Route path="personalized-present/:lecture/:fileName" element={<PersonalizedPresent />} />
      <Route path="present/:lecture/:fileName" element={<PersonalizedPresent />} />
      <Route path="cognitive" element={<Cognitive />} />
      <Route path="posttest" element={<PostTest />} />
      <Route path="survey" element={<Survey />} />
      <Route path="wrapup" element={<WrapUp />} />
      <Route element={<Contact />} />
    </>
  )
)
