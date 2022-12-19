import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import { Assessment } from './pages/Assessment'
import Cognitive from './pages/Cognitive'
import Consent from './pages/Consent'
import Contact from './pages/Contact'
import Demographic from './pages/Demographic'
import { Instruction } from './pages/Instruction'
import { Label } from './pages/Label'
import LabelTutorial from './pages/LabelTutorial'
import { PostTest } from './pages/PostTest'
import { Practice } from './pages/Practice'
import { PreTest } from './pages/PreTest'
import { Present } from './pages/Present'
import Survey from './pages/Survey'
import VerbalAnalogy from './pages/VerbalAnalogy'
import Vote from './pages/Vote'
import { VoteTutorial } from './pages/VoteTutorial'
import { WrapUp } from './pages/WrapUp'
import { Abstraction } from './pages/Abstraction'

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="instruction" element={<Instruction />} />
      <Route path="consent/" element={<Consent />} />
      <Route path="demographic" element={<Demographic />} />
      <Route path="pretest" element={<PreTest />} />
      <Route path="verbal-analogy" element={<VerbalAnalogy />} />
      <Route path="label-tutorial" element={<LabelTutorial />} />
      <Route path="vote-tutorial" element={<VoteTutorial />} />
      <Route path="label/:lecture/:fileName" element={<Label />} />
      <Route path="abstraction/:category/:problemId" element={<Abstraction />} />
      <Route path="present/:category/:problemId/:participantId" element={<Present />} />
      <Route path="vote/:lecture/:fileName" element={<Vote />} />
      <Route path="practice/:category/:problemId" element={<Practice />} />
      <Route path="assessment/:lecture/:fileName" element={<Assessment />} />
      <Route path="cognitive" element={<Cognitive />} />
      <Route path="posttest" element={<PostTest />} />
      <Route path="survey" element={<Survey />} />
      <Route path="wrapup" element={<WrapUp />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/contact" replace />} />
    </>
  )
)
