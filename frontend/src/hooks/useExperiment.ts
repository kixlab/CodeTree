import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { PRODUCTION, SERVER_ADDRESS } from '../environments/Configuration'
import { Group } from '../protocol/Common'
import { GetIdAndGroupParams, GetIdAndGroupResults } from '../protocol/GetIdAndGroup'
import { GetParticipantStatusParams, GetParticipantStatusResults } from '../protocol/GetParticipantStatus'
import { PostParticipantProgressParams, PostParticipantProgressResult } from '../protocol/PostParticipantProgress'
import { Get, Post2 } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { GroupUrl, SCENARIO, Stage } from '../shared/Scenario'

const PARTICIPANT_ID_KEY = 'PARTICIPANT_ID_KEY'
export const ID_NOT_FOUND = 'ID_NOT_FOUND'

export function useExperiment() {
  const [id, setId] = useState<string | null>(null)
  const [group, setGroup] = useState<Group | null>(null)
  const [stage, setStage] = useState<number>(-1)
  const [timeStamp, setTimeStamp] = useState<number>(-1)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [shouldMoveStage, setShouldMoveStage] = useState<boolean>(false)
  const [currentStage, setCurrentStage] = useState<number>(-1)
  const { pathname } = useLocation()

  const initialize = useCallback(async () => {
    const res = await Get<GetIdAndGroupParams, GetIdAndGroupResults>(`${SERVER_ADDRESS}/getIdAndGroup`, {})
    if (res) {
      localStorage.setItem(PARTICIPANT_ID_KEY, res.id)
      setGroup(res.group)
      setStage(0)
      setTimeStamp(Date.now())
    }
  }, [])

  const nextStage = useCallback(
    async (jump = 0) => {
      if (id === null || group === null) {
        return '/contact'
      }

      if (currentStage === stage) {
        const nextStage = SCENARIO[stage + 1]
        await Post2<PostParticipantProgressParams, PostParticipantProgressResult>(
          `${SERVER_ADDRESS}/postParticipantProgress`,
          {
            participantId: id,
            stage: SCENARIO[currentStage].name,
            timeRemaining,
          }
        )
        setStage(stage + 1)
        setTimeStamp(Date.now())
        if (nextStage.isVariable === true) {
          return (nextStage.url as GroupUrl[]).find(groupUrl => groupUrl.group === group)?.url || '/'
        }
        return nextStage.url as string
      }
      const nextStage = SCENARIO[stage + jump]
      if (nextStage.isVariable === true) {
        return (nextStage.url as GroupUrl[]).find(groupUrl => groupUrl.group === group)?.url || '/'
      }
      return nextStage.url as string
    },
    [currentStage, group, id, stage, timeRemaining]
  )

  useEffect(() => {
    const newStage = SCENARIO.findIndex((stage: Stage) => {
      if (stage.isVariable) {
        return (stage.url as GroupUrl[]).find(groupUrl => groupUrl.url === pathname) ?? false
      }
      return stage.url === pathname
    })
    if (newStage !== stage) {
      setCurrentStage(newStage)
    }
  }, [pathname, stage])

  useEffect(() => {
    if (!PRODUCTION) {
      setShouldMoveStage(false)
    } else if (stage > currentStage && SCENARIO[currentStage]?.canRevisit !== true) {
      window.alert(getString('experiment_helper_not_allowed_to_go_back'))
      setShouldMoveStage(true)
    } else {
      setShouldMoveStage(false)
    }
  }, [currentStage, stage])

  useEffect(() => {
    const timeLimit = SCENARIO[currentStage]?.timeLimit ?? 0
    setTimeRemaining(timeLimit - Math.floor((new Date().getTime() - timeStamp, 10) / 1000))
  }, [currentStage, timeStamp])

  useEffectOnce(() => {
    const participantId = localStorage.getItem(PARTICIPANT_ID_KEY)
    if (participantId) {
      setId(participantId)
      Get<GetParticipantStatusParams, GetParticipantStatusResults>(`${SERVER_ADDRESS}/getParticipantStatus`, {
        participantId,
      }).then(res => {
        if (res) {
          setGroup(res.group)
          setStage(res.lastStage)
          setTimeStamp(res.lastTimestamp)
        }
      })
    }
  })

  return { group, id, timeRemaining, currentStage, shouldMoveStage, initialize, nextStage }
}
