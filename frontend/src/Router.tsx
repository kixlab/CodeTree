import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Contact = loadable(() => import('./pages/Contact'))
const Instruction = loadable(() => import('./pages/Instruction'))
const PythonTutorial = loadable(() => import('./pages/PythonTutorial'))
const Consent = loadable(() => import('./pages/Consent'))
const Demographic = loadable(() => import('./pages/Demographic'))
const PreTest = loadable(() => import('./pages/PreTest'))
const VerbalAnalogy = loadable(() => import('./pages/VerbalAnalogy'))
const LabelTutorial = loadable(() => import('./pages/LabelTutorial'))
const VoteTutorial = loadable(() => import('./pages/VoteTutorial'))
const WorkedExample = loadable(() => import('./pages/WorkedExample'))
const Label = loadable(() => import('./pages/Label'))
const Vote = loadable(() => import('./pages/Vote'))
const Practice = loadable(() => import('./pages/Practice'))
const Assessment = loadable(() => import('./pages/Assessment'))
const Parsons = loadable(() => import('./pages/Parsons'))
const Cognitive = loadable(() => import('./pages/Cognitive'))
const PostTest = loadable(() => import('./pages/PostTest'))
const Survey = loadable(() => import('./pages/Survey'))
const WrapUp = loadable(() => import('./pages/WrapUp'))
const Present = loadable(() => import('./pages/Present'))
const PersonalizedPresent = loadable(() => import('./pages/PersonalizedPresent'))
function RedirectComponent() {
  return <Redirect to="/" />
}

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Contact} />
        <Route exact path="/instruction" component={Instruction} />
        <Route exact path="/python-tutorial" component={PythonTutorial} />
        <Route exact path="/consent/" component={Consent} />
        <Route exact path="/demographic" component={Demographic} />
        <Route exact path="/pretest" component={PreTest} />
        <Route exact path="/verbal-analogy" component={VerbalAnalogy} />
        <Route exact path="/label-tutorial" component={LabelTutorial} />
        <Route exact path="/vote-tutorial" component={VoteTutorial} />
        <Route exact path="/worked-example/:lecture/:fileName" component={WorkedExample} />
        <Route exact path="/label/:lecture/:fileName" component={Label} />
        <Route exact path="/vote/:lecture/:fileName" component={Vote} />
        <Route exact path="/practice/:category/:problemId" component={Practice} />
        <Route exact path="/assessment/:lecture/:fileName" component={Assessment} />
        <Route exact path="/parsons/:lecture/:fileName" component={Parsons} />
        <Route exact path="/personalized-present/:lecture/:fileName" component={PersonalizedPresent} />
        <Route exact path="/present/:lecture/:fileName" component={Present} />
        <Route exact path="/cognitive" component={Cognitive} />
        <Route exact path="/posttest" component={PostTest} />
        <Route exact path="/survey" component={Survey} />
        <Route exact path="/wrapup" component={WrapUp} />
        <Route component={RedirectComponent} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
