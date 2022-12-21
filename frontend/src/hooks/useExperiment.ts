import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { PRODUCTION, SERVER_ADDRESS } from '../environments/Configuration'
import { Group, ID } from '../protocol/Common'
import { GetIdAndGroupParams, GetIdAndGroupResults } from '../protocol/GetIdAndGroup'
import { GetParticipantStatusParams, GetParticipantStatusResults } from '../protocol/GetParticipantStatus'
import { PostParticipantProgressParams, PostParticipantProgressResult } from '../protocol/PostParticipantProgress'
import { Get, Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { GroupUrl, SCENARIO, Stage } from '../shared/Scenario'

const PARTICIPANT_ID_KEY = 'PARTICIPANT_ID_KEY'
export const ID_NOT_FOUND = 'ID_NOT_FOUND'

export function useExperiment() {
  const [id, setId] = useState<ID>(localStorage.getItem(PARTICIPANT_ID_KEY) ?? ID_NOT_FOUND)
  const [group, setGroup] = useState<Group | null>(null)
  const [stage, setStage] = useState<number>(0)
  const [timeStamp, setTimeStamp] = useState<number>(Date.parse(new Date().toISOString()))
  const [timeRemaining, setTimeRemaining] = useState<number>(Infinity)
  const [shouldMoveStage, setShouldMoveStage] = useState<boolean>(false)
  const [currentStage, setCurrentStage] = useState<number>(0)
  const { pathname } = useLocation()

  const initialize = useCallback(async () => {
    const res = await Get<GetIdAndGroupParams, GetIdAndGroupResults>(`${SERVER_ADDRESS}/getIdAndGroup`, {})
    if (res) {
      localStorage.setItem(PARTICIPANT_ID_KEY, res.id)
      setId(res.id)
      setGroup(res.group)
    }
  }, [])

  const nextStage = useCallback(
    async (jump = 0) => {
      if (currentStage === stage) {
        const nextStage = SCENARIO[stage + 1]
        await Post<PostParticipantProgressParams, PostParticipantProgressResult>(
          `${SERVER_ADDRESS}/postParticipantProgress`,
          {
            participantId: id,
            stage: SCENARIO[currentStage].name,
            timeRemaining,
          }
        )
        setStage(stage + 1)
        if (nextStage.isVariable === true) {
          return (nextStage.url as GroupUrl[]).find(groupUrl => groupUrl.group === group)?.url ?? '/'
        }
        return nextStage.url as string
      }
      const nextStage = SCENARIO[stage + jump]
      if (nextStage.isVariable === true) {
        return (nextStage.url as GroupUrl[]).find(groupUrl => groupUrl.group === group)?.url ?? '/'
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
      const nowUTC = Date.parse(new Date().toISOString())
      setTimeStamp(nowUTC)
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

  useEffectOnce(() => {
    if (id !== ID_NOT_FOUND) {
      Get<GetParticipantStatusParams, GetParticipantStatusResults>(`${SERVER_ADDRESS}/getParticipantStatus`, {
        participantId: id,
      }).then(res => {
        if (res) {
          setGroup(res.group)
          setStage(res.lastStage + 1)
          setTimeStamp(res.lastTimestamp)
        }
      })
    }
  })

  useEffect(() => {
    const timeLimit = SCENARIO[currentStage]?.timeLimit || 100_000
    const nowUTC = Date.parse(new Date().toISOString())
    setTimeRemaining(Math.max(0, timeLimit - Math.floor((nowUTC - timeStamp) / 1000)))
  }, [currentStage, timeStamp])

  useEffect(() => {
    let timer: number | null = null

    if (timeRemaining > 0) {
      timer = window.setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    }

    return () => {
      if (timer) {
        window.clearInterval(timer)
      }
    }
  }, [timeRemaining])

  return { group, id, timeRemaining, currentStage, shouldMoveStage, initialize, nextStage }
}
