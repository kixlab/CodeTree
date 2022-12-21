import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
import { getAlgorithmSuggestionController } from './controller/getAlgorithmSuggestion'
import { getHealthController } from './controller/getHealth'
import { getIdAndGroupController } from './controller/getIdAndGroup'
import { getCodeToCompareController } from './controller/getCodeToCompare'
import { getMyProgramCodeController } from './controller/getMyProgramCode'
import { getMySubgoalsController } from './controller/getMySubgoals'
import { getNewSubgoalTreeController } from './controller/getNewSubgoalTree'
import { getParticipantStatusController } from './controller/getParticipantStatus'
import { getParticipationAvailabilityController } from './controller/getParticipationAvailability'
import { getProblemMarkDownController } from './controller/getProblemMarkDown'
import { getProblemSkeletonController } from './controller/getProblemSkeleton'
import { getSubgoalTreeController } from './controller/getSubgoalTree'
import { postSuggestionBySubgoalsController } from './controller/getSuggestionBySubgoals'
import { getVotingListController } from './controller/getVotingList'
import { postAssessmentCodeController } from './controller/postAssessmentCode'
import { postParticipantFinishedController } from './controller/postParticipantFinished'
import { postParticipantProgressController } from './controller/postParticipantProgress'
import { postPracticeAnswerController } from './controller/postPracticeAnswer'
import { postPracticeCodeController } from './controller/postPracticeCode'
import { postPracticeRunController } from './controller/postPracticeRun'
import { postSubgoalsController } from './controller/postSubgoals'
import { postVotingChoicesController } from './controller/postVotingChoices'
import { cors } from './middleware/cors'
import { requestLogger } from './middleware/requestLogger'
import { getEnv } from './utils/getEnv'

const { PORT, SSL_KEY, SSL_CERT } = getEnv()
const app = express()

const options = {
  key: fs.readFileSync(SSL_KEY),
  cert: fs.readFileSync(SSL_CERT),
}

app.use(bodyParser.json())
app.use(requestLogger)
app.use(cors)

app.get('/getHealth', getHealthController)
app.get('/getIdAndGroup', getIdAndGroupController)
app.get('/getMyProgramCode', getMyProgramCodeController)
app.get('/getMySubgoals', getMySubgoalsController)
app.get('/getProblemMarkDown', getProblemMarkDownController)
app.get('/getParticipationAvailability', getParticipationAvailabilityController)
app.get('/getParticipantStatus', getParticipantStatusController)
app.get('/getCodeToCompare', getCodeToCompareController)
app.get('/getVotingList', getVotingListController)
app.get('/getNewSubgoalTree', getNewSubgoalTreeController)
app.get('/getSubgoalTree', getSubgoalTreeController)
app.get('/getProblemSkeleton', getProblemSkeletonController)
app.get('/getAlgorithmSuggestion', getAlgorithmSuggestionController)
app.post('/postSuggestionBySubgoals', postSuggestionBySubgoalsController)
app.post('/postVotingChoices', postVotingChoicesController)
app.post('/postSubgoals', postSubgoalsController)
app.post('/postPracticeCode', postPracticeCodeController)
app.post('/postAssessmentCode', postAssessmentCodeController)
app.post('/postParticipantProgress', postParticipantProgressController)
app.post('/postParticipantFinished', postParticipantFinishedController)
app.post('/postPracticeRun', postPracticeRunController)
app.post('/postPracticeAnswer', postPracticeAnswerController)

if (PORT === 80) {
  http.createServer(app).listen(80)
  https.createServer(options, app).listen(443)
  console.info(`App listening at HTTPS`)
} else {
  app.listen(PORT, () => {
    console.info(`App listening at ${PORT}`)
  })
}
