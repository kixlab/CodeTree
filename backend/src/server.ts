import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
import { getHealthController } from './controller/getHealth'
import { getIdAndGroupController } from './controller/getIdAndGroup'
import { GetLabelsController } from './controller/getLabels'
import { getMyProgramCodeController } from './controller/getMyProgramCode'
import { getNewSubgoalTreeController } from './controller/getNewSubgoalTree'
import { getParsonsListController } from './controller/getParsonsList'
import { getParticipationAvailabilityController } from './controller/getParticipationAvailability'
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
app.get('/getProgramCode', getProgramCodeController)
app.get('/getProblemMarkDown', getProblemMarkDownController)
app.get('/getParticipationAvailability', getParticipationAvailabilityController)
app.get('/getVotingList', getVotingListController)
app.get('/getNewSubgoalTree', getNewSubgoalTreeController)
app.get('/getSubgoalTree', getSubgoalTreeController)
app.get('/getParsonsList', getParsonsListController)
app.get('/getSkeletonCode', getSkeletonCodeController)
app.get('/getProgramExplanation', getProgramExplanationController)
app.get('/getLabels', GetLabelsController)
app.get('/getProblemSkeleton', getProblemSkeletonController)
app.post('/postVotingChoices', postVotingChoicesController)
app.post('/postSubgoals', postSubgoalsController)
app.post('/postPracticeCode', postPracticeCodeController)
app.post('/postAssessmentCode', postAssessmentCodeController)
app.post('/postParsonsAnswer', postParsonsAnswerController)
app.post('/postParticipantProgress', postParticipantProgressController)
app.post('/postParticipantFinished', postParticipantFinishedController)
app.post('/postPracticeRun', postPracticeRunController)
app.post('/postPracticeAnswer', postPracticeAnswerController)

if (PORT === 80) {
  http.createServer(app).listen(80);
  https.createServer(options, app).listen(443);
  console.info(`App listening at HTTPS`)
} else {
  app.listen(PORT, () => {
    console.info(`App listening at ${PORT}`)
  })
}
