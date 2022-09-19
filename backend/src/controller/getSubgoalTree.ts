import maxBy from 'lodash/maxBy'
import difference from 'lodash/difference'
import { SubgoalTreeData } from '../database/DataBaseDataTypes'
import { GetData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetSubgoalTreeParams, GetSubgoalTreeResults } from '../protocol/GetSubgoalTree'
import { Subgoal } from '../dataType/subgoal'

type SubgoalNode = GetSubgoalTreeResults['tree']['children'][number]

export const getSubgoalTreeController = Get<GetSubgoalTreeParams, GetSubgoalTreeResults>(async (params, send) => {
  GetData<SubgoalTreeData>(
    `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`,
    snapshot => {
      const tree: SubgoalNode = {
        label: '',
        group: snapshot.subgoalNodes.reduce((g, n) => [...new Set([...g, ...n.group])], [] as number[]),
        children: [],
      }
      const nodes = snapshot.subgoalNodes
      for (const node of nodes) {
        let currentNode = tree
        const subTree: SubgoalNode = {
          label: maxBy(node.labels, label => label.voteCount)?.label ?? Subgoal.NOT_LABELED,
          group: node.group,
          children: [],
        }
        while (difference(node.group, currentNode.group).length === 0) {
          const subgoalIdxs: number[] = []
          let next = null
          for (let i = 0; i < currentNode.children.length; i += 1) {
            const child = currentNode.children[i]
            // check if goal can be a higher goal of any child
            if (difference(child.group, node.group).length === 0) {
              subgoalIdxs.push(i)
            }
            // check if goal is a lower goal of any child
            if (difference(node.group, child.group).length === 0) {
              next = child
              break
            }
          }

          // is a higher goal
          if (subgoalIdxs.length > 0) {
            subTree.children.push(...currentNode.children.filter((_, i) => subgoalIdxs.includes(i)))
            currentNode.children = currentNode.children.filter((_, i) => !subgoalIdxs.includes(i))
            // is a sibling goal
          } else if (next === null) {
            break
            // is a lower goal
          } else {
            currentNode = next
          }
        }
        currentNode.children.push(subTree)
      }
      send(200, { tree })
    },
    err => {
      send(500, {
        message: '하위 목표를 불러오는 데에 실패하였습니다. 다시 시도해주세요.',
        error: err,
      })
    }
  )
})
