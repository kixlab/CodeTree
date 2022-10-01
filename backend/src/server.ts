import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import { IncomingMessage } from 'http'
import { GetAssessmentAnswersController } from './controller/getAssessmentAnswers'
import { GetCodeGroupsController } from './controller/getCodeGroups'
import { getDocumentationController } from './controller/getDocumentation'
import { getIdAndGroupController } from './controller/getIdAndGroup'
import { GetLabelsController } from './controller/getLabels'
import { getNewSubgoalTreeController } from './controller/getNewSubgoalTree'
import { getParsonsListController } from './controller/getParsonsList'
import { getParticipationAvailabilityController } from './controller/getParticipationAvailability'
import { getProblemController } from './controller/getProblem'
import { getProblemMarkDownController } from './controller/getProblemMarkDown'
import { getProblemSkeletonController } from './controller/getProblemSkeleton'
import { getProgramCodeController } from './controller/getProgramCode'
import { getProgramExplanationController } from './controller/getProgramExplanation'
import { getSkeletonCodeController } from './controller/getSkeletonCode'
import { getSubgoalTreeController } from './controller/getSubgoalTree'
import { getVotingListController } from './controller/getVotingList'
import { postAssessmentCodeController } from './controller/postAssessmentCode'
import { postParsonsAnswerController } from './controller/postParsonsAnswer'
import { postParticipantFinishedController } from './controller/postParticipantFinished'
import { postParticipantProgressController } from './controller/postParticipantProgress'
import { postPracticeAnswerController } from './controller/postPracticeAnswer'
import { postPracticeCodeController } from './controller/postPracticeCode'
import { postPythonCodeController } from './controller/postPythonCode'
import { postSubgoalsController } from './controller/postSubgoals'
import { postVotingChoicesController } from './controller/postVotingChoices'
import { cors } from './middleware/cors'
import { getEnv } from './utils/getEnv'

const { PORT } = getEnv()
const app = express()

// TODO: fix 이후 interface 이동
interface Request extends IncomingMessage {
  path: string
  query: {
    participantId: string
  }
}

app.use(bodyParser.json())
app.use(cors)

morgan.token('originUrl', (req: Request) => req.path)
morgan.token('userId', (req: Request) => req.query.participantId)
morgan.token('label', () => `codetree-${process.env.PRODUCTION === 'true' ? 'prod' : 'dev'}`)
// eslint-disable-next-line prettier/prettier, no-useless-escape
app.use(morgan(`{"remote-addr"\: ":remote-addr", "method"\: ":method", "origin-url"\: ":originUrl", "url"\: ":url","status"\: ":status", "referrer"\: ":referrer", "user-agent"\: ":user-agent", "userId"\: ":userId", "label"\: ":label","duration"\: :response-time}`)
)

app.get('/getIdAndGroup', getIdAndGroupController)
app.get('/getProgramCode', getProgramCodeController)
app.get('/getProblem', getProblemController)
app.get('/getProblemMarkDown', getProblemMarkDownController)
app.get('/getParticipationAvailability', getParticipationAvailabilityController)
app.get('/getVotingList', getVotingListController)
app.get('/getNewSubgoalTree', getNewSubgoalTreeController)
app.get('/getSubgoalTree', getSubgoalTreeController)
app.get('/getParsonsList', getParsonsListController)
app.get('/getSkeletonCode', getSkeletonCodeController)
app.get('/getDocumentation', getDocumentationController)
app.get('/getProgramExplanation', getProgramExplanationController)
app.get('/getAssessmentAnswers', GetAssessmentAnswersController)
app.get('/getCodeGroups', GetCodeGroupsController)
app.get('/getLabels', GetLabelsController)
app.get('/getProblemSkeleton', getProblemSkeletonController)
app.post('/postVotingChoices', postVotingChoicesController)
app.post('/postSubgoals', postSubgoalsController)
app.post('/postPythonCode', postPythonCodeController)
app.post('/postPracticeCode', postPracticeCodeController)
app.post('/postAssessmentCode', postAssessmentCodeController)
app.post('/postParsonsAnswer', postParsonsAnswerController)
app.post('/postParticipantProgress', postParticipantProgressController)
app.post('/postParticipantFinished', postParticipantFinishedController)
app.post('/postPracticeAnswer', postPracticeAnswerController)

// https.createServer(options, app).listen(PORT)
app.listen(PORT, () => {
  console.info(`App listening at ${PORT}`)
})
