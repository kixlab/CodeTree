import { SubgoalNodeData, SubgoalsData, SubgoalTreeData } from '../database/DataBaseDataTypes'
import { GetData2, SetData2 } from '../database/DataBaseRef'
import { Subgoal } from '../dataType/subgoal'
import { Get } from '../HttpResponse'
import { GetNewSubgoalTreeParams, GetNewSubgoalTreeResults } from '../protocol/GetNewSubgoalTree'
import { labelFilterService } from '../service/labelFilter'
import { subgoalTreeGenService } from '../service/subgoalTreeGen'
import { collapseDuplicateSubgoals, filterGoalsAboveThreshold } from '../service/subgoalTreeGen/utils'

export const getNewSubgoalTreeController = Get<GetNewSubgoalTreeParams, GetNewSubgoalTreeResults>(
  async (params, send) => {
    try {
      const snapshot = await GetData2<SubgoalsData>(
        `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoals`
      )
      if (snapshot === null) {
        throw new Error('No subgoals data found')
      }
      const subgoals: Subgoal[] = []
      for (const key of Object.keys(snapshot)) {
        const userSubgoals = snapshot[key]
        userSubgoals.map(userSubgoal =>
          subgoals.push(new Subgoal(new Set(userSubgoal.group), userSubgoal.label.toLocaleLowerCase()))
        )
      }

      let filteredSubgoals = collapseDuplicateSubgoals(subgoals)
      filteredSubgoals = filterGoalsAboveThreshold(1)(filteredSubgoals)
      filteredSubgoals = await labelFilterService.filterLabels(filteredSubgoals)
      const tree = subgoalTreeGenService.generateTreeByMajorityAgreementAndInclusionScore(filteredSubgoals)

      const subgoalNodes: SubgoalNodeData[] = tree.getSubgoalList().map(subgoal => ({
        labels: Array.from(subgoal.label)
          .sort()
          .map(label => {
            return {
              label,
              voteCount: 1,
              exposure: 0,
            }
          }),
        group: Array.from(subgoal.steps).sort((a, b) => a - b),
      }))

      await SetData2<SubgoalTreeData>(
        `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`,
        {
          subgoalNodes,
          voteCnt: 0,
        }
      )
      send(200, { tree: tree.toString() })
    } catch (e) {
      send(500, {
        message: '하위 목표를 불러오는 데에 실패하였습니다. 다시 시도해주세요.',
        error: e,
      })
    }
  }
)
