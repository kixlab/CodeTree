type Locale = 'ko' | 'en'

export function getString(key: keyof typeof Localiztion, locale: Locale = 'ko'): string {
  const localizedString = Localiztion[key][locale]
  if (localizedString.length === 0) {
    return Localiztion[key][locale === 'ko' ? 'en' : 'ko']
  }
  return Localiztion[key][locale]
}

interface Dictionary {
  [key: string]: LocalizedString
}

type LocalizedString = {
  [key in Locale]: string
}

const Localiztion: Dictionary = {
  header_timer_prefix: {
    ko: '남은 시간: ',
    en: 'Time Left: ',
  },
  header_no_time_limit: {
    ko: '제한 없음',
    en: '-',
  },
  header_id_prefix: {
    ko: 'ID: ',
    en: 'ID: ',
  },
  progress_bar_prefix: {
    ko: '진행 상황: ',
    en: 'Progress: ',
  },
  progress_bar_stage_instruction: {
    ko: '실험 안내',
    en: 'Instruction',
  },
  progress_bar_stage_consent: {
    ko: '참가 동의서 확인',
    en: 'Informed Consent',
  },
  progress_bar_stage_demographic: {
    ko: '참가자 설문',
    en: 'Demographic Questionnaire',
  },
  progress_bar_stage_pretest: {
    ko: '사전 평가',
    en: 'Pretest',
  },
  progress_bar_stage_training: {
    ko: '학습 안내',
    en: 'Traning',
  },
  progress_bar_stage_worked_example: {
    ko: '하위 목표 학습',
    en: 'Worked Example',
  },
  progress_bar_stage_practice: {
    ko: '문제 풀이',
    en: 'Practice Problem',
  },
  progress_bar_stage_cognitive: {
    ko: '인지 부하 측정',
    en: 'Cognitive Load Measurement',
  },
  progress_bar_stage_assessment: {
    ko: '평가 문제',
    en: 'Assessment Problem',
  },
  progress_bar_stage_posttest: {
    ko: '사후 평가',
    en: 'Posttest',
  },
  progress_bar_stage_survey: {
    ko: '사후 설문',
    en: 'Post-task Survey',
  },
  progress_bar_stage_wrapup: {
    ko: '마무리',
    en: 'Wrap Up',
  },
  instruction_title: {
    ko: '',
    en: '',
  },
  instruction_background: {
    ko: '실험 배경',
    en: 'Background',
  },
  instruction_procedure: {
    ko: '실험 과정',
    en: 'Procedure',
  },
  instruction_notes: {
    ko: '실험 중 유의 사항',
    en: 'Notes',
  },
  pretest_alert_time_up: {
    ko: '제한 시간이 다 되었습니다. 현재 가지고 있는 답안을 제출하고 다음 단계로 이동해주세요. 아직 풀지 못한 문제는 "잘 모르겠음"를 체크한 다음 제출해주세요.',
    en: 'Time is up. Please submit what you have now. Check "I don\'t know" for the questions you did not answer.',
  },
  tutorial_title: {
    ko: '학습 안내',
    en: 'Training',
  },
  tutorial_introduction: {
    ko: `참가자는 "하위 목표 학습법"을 통해 Python의 while 문을 익히게 됩니다.
            현재의 페이지에선 앞으로 진행하실 하위 목표 학습법에 대한 소개와, 간단한 수학 예시 문제를 통해 하위 목표 학습법과 사용되는 인터페이스를 직접 체험할 수 있는 연습 활동 2개가 준비되어 있습니다.
            이 페이지 이후, 체험하신 학습법과 인터페이스를 이용해 while 문을 사용한 3개의 프로그램 예시를 하위 목표 학습법으로 익히고 이어서 연관된 연습 문제 풀이로 while 문의 사용법을 더 깊이 익히게 됩니다.`,
    en: `You are going to learn while loops in Python by studying on three worked examples and
            solving three practice problems. In this stage, we explain how you should approach
            them while learning. For your easier understanding, we use simple math problems as examples
            for the explanation.`,
  },
  tutorial_learn_subgoal: {
    ko: '하위 목표 학습법',
    en: 'Learn Subgoals',
  },
  tutorial_subgoal_explanation1: {
    ko: `수학 문제나 프로그래밍 문제를 풀 때 예제의 풀이를 꼼꼼히 이해하지 않고 그대로 가져다 쓴 경험이 모두 한 번쯤은 있을 겁니다.
            하지만 이렇게 문제를 풀 경우, 문제 풀이가 잘 기억나지 않을 뿐더러 비슷한 유형의 다른 문제를 맞닥뜨렸을 때 풀이를 문제에 맞게 어떻게 고쳐야 하는지 몰라 새로운 문제들을 못 푸는 경우가 많습니다.
            선행 연구에 따르면, 예제를 공부할 때 예제의 각 풀이 과정이 어떤 목적을 가지는지, 또 전체 풀이 과정에서 어떠한 역할을 하는지 이해함으로써 새로운 문제를 풀 때 기존의 풀이를 알맞게 고쳐 풀 수 있게 되고,
            나아가 새로운 문제로의 "전이"가 더 잘 일어납니다. 하위 목표란 이렇듯 학습자가 학습의 전이를 위해 배워야 할 예제의 담긴 각 풀이 과정의 목표를 의미합니다.
      `,
    en: ``,
  },
  tutorial_subgoal_explanation2: {
    ko: `예를 들어 오른쪽 그림과 같이 방정식 2x + 4 = 6x + 10을 푼다고 할 때, 그림과 같이 변수와 수를 이항하는 여러 단계를 밟습니다.
            여기서 각 단계들을 "변수를 같은 변으로 모으기", "양변 정리하기", "변수의 계수를 1로 만들기"와 같은 목표들로 묶어,
            문제 풀이 과정을 크게 세 부분으로 나눌 수 있습니다. 하위 목표를 기준으로 문제 풀이를 이해하면, 복잡한 문제 풀이의 구조도 쉽게 이해할 수 있고,
            또 연관된 문제를 풀 때도 풀이의 어느 부분을 고쳐야 하는지 더 쉽게 파악할 수 있습니다. 하위 목표 학습법은 이렇듯 수학 또는 프로그래밍 예제를 공부할 때
            학습자가 예제의 각 과정이 가지는 하위 목표를 스스로 설명해보는 활동을 통해 예제가 가지는 하위 목표 구조를 이해하고 다른 문제로 더 쉽게 전이할 수 있도록 돕는 학습법입니다.`,
    en: ``,
  },
  tutorial_subgoal_explanation3: {
    ko: `앞으로의 실험에서 참가자는 예시 코드에 존재하는 하위 목표들을 설명해보는 활동을 통해 찾는 활동을 통해 while 문을 사용법을 익히게 됩니다.
            이 과정에서 참가자는 주어진 예시 코드에서 하위 목표를 가장 올바른 문구를 보기에서 고르거나 직접 작성합니다.
            올바른 하위 목표 문구는 "~를 ~하기"와 같은 형태로 문제 해결 과정을 단계별로 묶어 설명해야 합니다.
            아래 3가지 연습 활동을 통해 하위 목표 학습법을 간단히 경험해보고 올바른 하위 목표가 어떤 것인지 익혀보세요.`,
    en: `While you are learning by looking at code samples, you will be asked
            to provide your own subgoal labels for the examples that you receive.
            To do this, you will be asked to identify the purpose of groups of steps
            in the examples (label the subgoals). Good subgoal labels are action-based
            phrases (i.e. similarly to imperative sentences like "Close the door,"
            or "Press the button"); they tell the problem solver what to do next.`,
  },
  tutorial_subgoal_explanation3_vote: {
    ko: `앞으로의 실험에서 참가자는 예시 코드에 존재하는 하위 목표들을 설명해보는 활동을 통해 찾는 활동을 통해 while 문을 사용법을 익히게 됩니다.
            이 과정에서 참가자는 주어진 예시 코드에서 하위 목표를 가장 올바른 문구를 보기에서 고르거나 직접 작성합니다.
            올바른 하위 목표 문구는 문제 해결 과정을 단계별로 묶어 설명하며, 비슷한 유형의 문제에도 적용될 수 있도록 특정 문제에 국한된 정보를 최대한 배제합니다.
            아래 2가지 연습 활동을 통해 하위 목표 학습법을 간단히 경험하고 익혀보세요.`,
    en: `While you are learning by looking at code samples, you will be asked
            to provide your own subgoal labels for the examples that you receive.
            To do this, you will be asked to identify the purpose of groups of steps
            in the examples (label the subgoals). Good subgoal labels are action-based
            phrases (i.e. similarly to imperative sentences like "Close the door,"
            or "Press the button"); they tell the problem solver what to do next.`,
  },
  tutorial_practice_title: {
    ko: '연습',
    en: 'Practice',
  },
  tutorial_practice1_goal: {
    ko: ': 연관된 목표를 가지는 풀이 과정 묶기',
    en: '',
  },
  tutorial_practice2_goal: {
    ko: ': 각 풀이 묶음의 목표 설명하기',
    en: '',
  },
  tutorial_practice3_goal: {
    ko: ': 목표 계층 만들어보기',
    en: '',
  },
  tutorial_practice1_instruction: {
    ko: `위에서 소개한 하위 목표 예시를 참고하여, 다음 풀이 과정의 단계들을 왼쪽에 나열된
            하위 목표와 연관지어 분류하고 묶어보세요. 먼저, 나열된 하위 목표 중 하나를 선택하고,
            해당 하위 목표를 가지는 풀이 과정 단계를 선택하세요.`,
    en: `Group and label the steps of the following example using the same
            subgoal labels from Figure 1. You can label steps by first clicking
            one of the subgoal labels below and then putting checkmarks on the
            steps that are applicable.`,
  },
  tutorial_practice2_instruction: {
    ko: `이번에는 직접 하위 목표를 작성해보세요. 아래의 입력창을 선택하면, 작성해야할 하위 목표와
            관련된 풀이 단계들이 오른쪽에 표시됩니다. 지정된 풀이 단계들을 아우를 수 있는 하위 목표를
            "~를 ~하기" 형태로 작성해보세요.`,
    en: `For this order of operations problem, create subgoal labels for
            each group of steps (by labeling each group of steps with its purpose).
            You can create labels by clicking one of the text input boxes and fill
            in it. Grouping of steps will appear once you click a box.`,
  },
  tutorial_practice3_instruction: {
    ko: `하위 목표는 서로 계층을 이루기도 합니다. 아래 주어진 목표를 구성하는 작은 하위 목표들을 추가해보세요.
            그리고 앞선 연습처럼 작은 하위 목표들과 연관된 풀이 과정을 묶고 목표를 설명해보세요.`,
    en: ``,
  },
  tutorial_vote_practice1_instruction: {
    ko: `위에서 소개한 하위 목표 예시를 참고하여, 풀이 과정의 각 하위 목표를 차근차근 이해해보세요. 보기를 고른 뒤 답을 확인해 하위 목표를 올바르게 이해하고 있는지 스스로 확인해보세요.`,
    en: ``,
  },
  tutorial_vote_practice2_instruction: {
    ko: `하위 목표는 서로 포함관계를 가지기도 합니다. 다음 풀이과정에서 전체 풀이과정을 아우르는 큰 하위 목표를 먼저 선택해보고, 그 하위 목표를 구성하는 작은 하위 목표들도 같이 찾아보세요.`,
    en: ``,
  },
  tutorial_check_answer: {
    ko: '답 확인',
    en: 'Check Answer',
  },
  tutorial_figure_hidden: {
    ko: '본인이 만든 하위 목표와 답을 비교해보세요.',
    en: 'Check anwer and compare with your own.',
  },
  tutorial_start_title: {
    ko: '하위 목표 학습 시작하기',
    en: 'Start subgoal learning',
  },
  tutorial_start_instruction: {
    ko: `간단한 수학 풀이에서 하위 목표에 따라 풀이 단계를 분류하고 하위 목표를 직접 작성해 봤으니,
            이제 조금 더 복잡한 프로그램 코드에서 하위 목표를 찾으며 while 문을 배워보는 활동을 시작합니다.
            이 활동에서 주어지는 코드들은 모두 같은 하위 목표를 가지고 있지만, 모두 같은 문구로 설명되지는 않을
            수 있습니다. 주어진 문제와 코드에 맞게 문구를 작성해보세요. 또한, 이 활동에서는 방금 전 위에서 사용한
            인터페이스와 비슷한 인터페이스를 이용해 하위 목표를 찾습니다. 새 인터페이스에서는 참가자가 하위 목표를
            더 자유롭게 정의할 수 있도록 하위 목표를 더 추가하거나 제거할 수 있는 기능이 추가됩니다.
            이 페이지에서 소개한 하위 목표를 충분히 이해했다면, "학습 시작"을 눌러주세요.`,
    en: `Now that you have some practice applying and creating subgoal labels,
            it is time to make subgoal labels for solving problems using a loop.
            The examples that you will be given all have the same subgoals, but
            this does not mean that you have to stick to the subgoal labels that
            you create in the first example. Please feel free to update your subgoal
            labels as you learn more about using loops. For this task, you will use an
            interface that is similar to the one you used above but with more functionalities,
            such as adding/deleting subgoals. If you are ready to start a real task,
            press "Start Task".`,
  },
  tutorial_vote_start_instruction: {
    ko: `이제 조금 더 복잡한 Python 코드 예제에서 하위 목표를 찾으며 while 문의 사용법을 배워봅니다.
            위에서 사용한 인터페이스를 사용하여 코드 예제의 각 줄의 하위 목표를 올바르게 설명한 보기를 고르거나, 더 좋은 하위 목표가 생각난다면 직접 작성해보세요.
            또한, 연습 활동에서는 정답에 대한 해설이 제공되었으나, 이후 하위 목표 학습 활동에서는 실험 설계상 정답/오답만 표기될 뿐 해설이 제공되지 않습니다.
            이 페이지에서 소개한 하위 목표 학습법과 인터페이스 사용법 충분히 숙지했다면, 아래의 "학습 시작하기"를 눌러주세요.`,
    en: ``,
  },
  tutorial_start: {
    ko: '학습 시작',
    en: 'Start Task',
  },
  tutorial_alert_select_subgoal_first: {
    ko: '왼쪽의 하위 목표를 먼저 선택해주세요.',
    en: 'Please choose one of subgoals first.',
  },
  tutorial_alert_assign_all_lines: {
    ko: '풀이 과정의 각 줄을 클릭해 모두 적절한 하위 목표로 분류해주세요.',
    en: 'Please assign all lines to subgoals.',
  },
  tutorial_alert_fill_all_boxes: {
    ko: '모든 하위 목표 입력창을 채워주세요.',
    en: 'Please fill all the text input boxes.',
  },
  tutorial_alert_complete_practices: {
    ko: '연습 1, 2, 3을 모두 마쳐주세요.',
    en: 'Please complete all practices.',
  },
  tutorial_alert_add_smaller_subgoals: {
    ko: '"이 목표 아래 더 작은 하위 목표 추가"를 눌러 하위 목표를 추가해보세요.',
    en: '',
  },
  tutorial_skip: {
    ko: '이미 학습 안내를 마치셨으면 여기를 눌러 다음 단계를 진행하세요.',
    en: 'If you already practiced subgoal labeling, click here to skip this tutorial.',
  },
  tutorial_timeout_alert: {
    ko: '이 페이지에 시간을 많이 쓰고 있습니다. 조금만 더 보신 후 다음 단계로 넘어가주세요.',
    en: 'You are spending too much time on this page. Take few more minutes and proceed please.',
  },
  verbal_analogy_title: {
    ko: '학습 안내',
    en: 'Training',
  },
  verbal_analogy_introduction: {
    ko: `이번 실험에서 참가자는 3개의 예시 풀이와 연습 문제를 통해 Python의 while 문을 학습할 것입니다. 본격적인 학습 이전에
            참가자의 머리를 환기시키기 위헤 이 단계에서 간단한 단어 퍼즐을 진행합니다.`,
    en: `You are going to learn while loops in Python by studying on three worked examples and
            solving three practice problems. Before you start learning, we would like to refresh
            you with some vocabulary puzzles.`,
  },
  verbal_analogy_learn_analogies: {
    ko: '단어 유추 테스트',
    en: 'Verbal Analogies',
  },
  verbal_analogy_learn_content: {
    ko: `단어 유추 테스트(verbal analogy test)는 개념간의 관계를 이해하는 데 도움을 주는 연습입니다.
            단어 유추는 각종 시험에서 인지능력을 평가하는 데 사용되어 왔으나, 최근에는 고용시장 등에서 지원자의
            순발력과 언어능력을 평가하는 데에도 쓰이고 있습니다.`,
    en: `analogies were previously used to test cognitive ability on standardized tests
            (like the SAT, the GRE, and other professional exams). Increasingly, too,
            employers may use these word comparisons on personnel and screening tests to
            determine an applicant’s quickness and verbal acuity.`,
  },
  verbal_analogy_method: {
    ko: '테스트 형태',
    en: 'How to "Read" Analogies',
  },
  verbal_analogy_method_content: {
    ko: `(:)과 (=) 기호는 비례식에서 해당 기호들이 가지는 의미와 동일합니다. 예를 들어 “aspirin : headache =
            nap : fatigue”는 아스피린과 두통의 관계는 낮잠과 피로의 관계와 동일함을 의미합니다.`,
    en: `The symbol (:) means “is to” and the symbol (::) means “as.” Thus, the analogy,
            “aspirin: headache::nap: fatigue,” should be read “aspirin is to headache as nap
            is to fatigue.” Stated another way, the relationship between aspirin and headache
            is the same as the relationship between nap and fatigue.`,
  },
  verbal_analogy_tips: {
    ko: '단어 유추를 하는 방법',
    en: 'Tips for Doing Analogies',
  },
  verbal_analogy_tip1: {
    ko: '단어 쌍이 어떤 관계가 있는지 생각해보세요.',
    en: 'Try to determine the relationship between the complete pair of words.',
  },
  verbal_analogy_tip2: {
    ko: '같은 관계로 연결되지 않는 단어 선택지들을 제거하세요.',
    en: 'Eliminate any pairs in your answer choices that don’t have the same relationship.',
  },
  verbal_analogy_tip3: {
    ko: '단어 쌍들을 같은 문장으로 연결해보세요. 예를 들어 “aspirin relieves a headache”이듯 “nap relieves fatigue”가 성립합니다.',
    en: 'Try putting the pairs into the same sentence: "Aspirin relieves a headache." Therefore, a nap relieves fatigue.',
  },
  verbal_analogy_tip4: {
    ko: '단어들의 품사를 고려하는 것이 도움이 될 수도 있습니다. 예를 들어 “knife : cut = pen : write”에서 knife와 pen은 명사이고, cut과 write는 동사입니다.',
    en: 'Sometimes paying attention to the words\' parts of speech helps. For example "knife (noun): "cut" (verb):: "pen" (also a noun): "write" (also a verb).',
  },
  verbal_analogy_relationships: {
    ko: '단어 간 관계의 종류',
    en: 'Common Relationships Between Word Pairs',
  },
  verbal_analogy_sameness: {
    ko: '동일',
    en: 'Sameness (synonyms)',
  },
  verbal_analogy_oppositeness: {
    ko: '정반대',
    en: 'Oppositeness (antonyms)',
  },
  verbal_analogy_classification_order: {
    ko: '분류 체계',
    en: 'Classification Order (general – specific)',
  },
  verbal_analogy_difference_of_degree: {
    ko: '정도의 차이',
    en: 'Difference of Degree',
  },
  verbal_analogy_person_related: {
    ko: '사람의 직업 과 능력, 도구, 관심 등',
    en: 'Person Related to Tool, Major Trait, or Skill or Interest',
  },
  verbal_analogy_part_and_whole: {
    ko: '전체와 부분',
    en: 'Part and Whole',
  },
  verbal_analogy_steps_in_process: {
    ko: '과정',
    en: 'Steps in a Process',
  },
  verbal_analogy_cause_and_effect: {
    ko: '인과관계',
    en: 'Cause and Effect (or Typical Result)',
  },
  verbal_analogy_things_and_function: {
    ko: '물체의 기능',
    en: 'Thing and Its Function',
  },
  verbal_analogy_qualities: {
    ko: '물체의 특성',
    en: 'Qualities or Characteristics',
  },
  verbal_analogy_substance: {
    ko: '원재료',
    en: 'Substance Related to End Product',
  },
  verbal_analogy_implied_relationships: {
    ko: '함축적 관계',
    en: 'Implied Relationships',
  },
  verbal_analogy_things_and_lacks: {
    ko: '결핍',
    en: 'Thing and What It Lacks',
  },
  verbal_analogy_symbol: {
    ko: '상징',
    en: 'Symbol and What It Represents',
  },
  verbal_analogy_timeout_alert: {
    ko: '이 페이지에 시간을 많이 쓰고 있습니다. 조금만 더 보신 후 다음 단계로 넘어가주세요.',
    en: 'You are spending too much time on this page. Take few more minutes and proceed please.',
  },
  experiment_helper_not_allowed_to_go_back: {
    ko: '이전 페이지로 돌아갈 수 없습니다.',
    en: 'You are not allowed to access this previous page.',
  },
  problem_container_title: {
    ko: '문제',
    en: 'Problem',
  },
  example_title: {
    ko: '하위 목표 학습',
    en: 'Worked Example',
  },
  example_instruction: {
    ko: '예시 문제 풀이를 보며 while 문의 사용법을 확인해보세요. 충분히 확인을 한 후, 다음 단계에서 연관된 연습 문제를 풀어 사용법을 직접 익혀봅니다.',
    en: '',
  },
  example_action_button: {
    ko: '다음',
    en: 'Solve Practice Problem',
  },
  label_title: {
    ko: '하위 목표 학습',
    en: 'Worked Example',
  },
  label_instruction: {
    ko: `예시 문제 풀이를 보며 while 문의 사용법을 확인해보세요. 풀이에 존재하는 하위 목표들을 찾아보며 코드가 어떠한 하위 목표로 구성되어 있는지 설명해보세요.
            다음 단계에서 연관된 연습 문제를 풀어 사용법을 직접 익혀봅니다.`,
    en: `The program code on the right solves the following problem. In this task,
            you will self-explain the code by identifying subgoals. Click
            a group of code lines that go together and write a subgoal label on the text input on the left.`,
  },
  label_warning: {
    ko: '작성하신 하위 목표는 다른 학습자들에게 공유되니 학습에 도움이 되는 내용으로 작성해주세요!',
    en: ' ',
  },
  label_alert_select_subgoal_first: {
    ko: '왼쪽의 하위 목표를 먼저 선택해주세요.',
    en: 'Please choose one of subgoals first.',
  },
  label_alert_assign_all_lines: {
    ko: '남는 줄이 없도록 모든 줄에 적절한 하위 목표를 작성해주세요.',
    en: 'Please make subgoals for all lines.',
  },
  label_alert_fill_all_boxes: {
    ko: '모든 하위 목표 입력창을 채워주세요.',
    en: 'Please fill all the text input boxes.',
  },
  label_alert_remove_empty_subgoals: {
    ko: '선택된 코드 줄이 없는 하위 목표 입력창은 제거해주세요.',
    en: 'Please remove text input boxes without any lines clicked.',
  },
  label_action_button: {
    ko: '다음',
    en: 'Next',
  },
  label_alert_back: {
    ko: '페이지를 벗어나면 작성하신 내용이 저장되지 않습니다.',
    en: '',
  },
  label_placeholder: {
    ko: '"~를 ~하기" 형태로 작성해보세요.',
    en: 'A good goal description starts with a verb.',
  },
  label_add_subgoal: {
    ko: '└ 이 목표 아래 더 작은 하위 목표 추가',
    en: '└ Add a subgoal below this goal',
  },
  vote_title: {
    ko: '문제 풀이',
    en: 'Worked Example',
  },
  vote_instruction: {
    ko: `문제 풀이를 보며 while 문의 사용법을 확인해보세요. 코드의 각 부분에 가장 적절한 하위 목표를
            보기에서 고르거나 직접 작성해보며 코드를 구성하는 하위 목표들을 찾아보세요. 다음 단계에서 연관된 연습
            문제를 풀며 직접 익혀봅니다.`,
    en: `The program code on the right solves the following problem. In this task, you
            will identify subgoals in the code by selecting the most appropriate labels from
            given choices. Please identify subgoals for all lines, and press the blue button.`,
  },
  vote_question: {
    ko: '오른쪽에 주황색으로 강조 표시된 부분의 하위 목표를 가장 올바르게 설명한 문구를 고르세요.',
    en: 'Select the label that best describes the highlighted segment of the code.',
  },
  vote_question_no_label: {
    ko: '오른쪽에 주황색으로 강조 표시된 부분의 하위 목표를 직접 작성해보세요.',
    en: '',
  },
  vote_tutorial_practice1_goal: {
    ko: ': 좋은 하위 목표 선택하기',
    en: '',
  },
  vote_tutorial_practice2_goal: {
    ko: ': 목표 계층을 따라 목표 선택하기',
    en: '',
  },
  vote_tutorial_tip1: {
    ko: '2번째 보기는 문제에 국한된 숫자 8이나 x를 포함하지 않고 좌변과 우변에 변수와 상수를 모으는 목표를 잘 설명했습니다.',
    en: '',
  },
  vote_tutorial_tip2: {
    ko: '좋은 하위 목표는 "~를 ~하기" 형태로 대상과 동작을 명시적으로 설명합니다.',
    en: '',
  },
  vote_tutorial_tip3: {
    ko: '2번째 보기는 문제에 국한된 숫자를 포함하지 않고 변수 앞의 계수를 1로 만든다는 목표를 잘 설명했습니다.',
    en: '',
  },
  vote_tutorial_tip4: {
    ko: '주어진 방정식은 이차식이 아닌 변수 x에 대한 일차식이며 해를 구하는 과정이므로 1번 보기가 맞습니다.',
    en: '',
  },
  vote_tutorial_tip5: {
    ko: '2번째 보기는 괄호 안의 계산을 먼저 한다는 목표를 구체적으로 잘 설명했습니다.',
    en: '',
  },
  vote_tutorial_tip6: {
    ko: '계산 순서에 따라 곱셈과 나눗셈을 계산한다는 목표를 설명하면 맞습니다. (예: 곱셈 나눗셈 계산하기)',
    en: '',
  },
  vote_tutorial_tip7: {
    ko: '1번 보기는 "~를 ~하기" 형태이며 최종 답을 낸다는 목표를 잘 설명했습니다.',
    en: '',
  },
  vote_tutorial_tip_no_answer: {
    ko: '직접 하위 목표를 작성하는 경우 실험 설계 상 답이 제공되지 않습니다.',
    en: '',
  },
  vote_tutorial_alert_complete_practices: {
    ko: '연습 1, 2를 모두 마쳐주세요.',
    en: 'Please complete all practices.',
  },
  multiple_choice_input_placeholder: {
    ko: '더 좋은 답 직접 입력 ("~를 ~하기" 형태로 작성)',
    en: 'I have a better answer',
  },
  multiple_choice_input_placeholder_no_label: {
    ko: '"~를 ~하기" 형태로 주어진 단계를 묶어 설명해보세요.',
    en: '',
  },
  vote_no_option_selected_alert: {
    ko: '가장 잘 설명한 하위 목표를 선택하거나 직접 추가해주세요.',
    en: 'Please select a label before you proceed.',
  },
  vote_option_blank_alert: {
    ko: '표시된 코드 부분을 가장 잘 설명하는 문구를 작성해주세요.',
    en: 'Please fill the text input.',
  },
  vote_prev_button: {
    ko: '이전',
    en: 'Prev',
  },
  vote_next_button: {
    ko: '다음',
    en: 'Next',
  },
  vote_check_answer: {
    ko: '정답 확인',
    en: 'Check Answer',
  },
  vote_action_button: {
    ko: '다음',
    en: 'Next',
  },
  vote_correct: {
    ko: '정답!',
    en: 'Correct!',
  },
  subgoal_container: {
    ko: '+ 다른 하위 목표 추가',
    en: '+ Add Subgoal',
  },
  practice_title: {
    ko: '문제 풀이',
    en: 'Practice Problem',
  },
  practice_instruction: {
    ko: '앞서 공부한 예시 문제 풀이를 응용하여 아래의 문제를 while 문을 사용해 풀어보세요.',
    en: `Now practice the usages of a while loop by writing
            a problem that solves the following problem. Solving
            the problem requires the steps and approach used in the
            worked example you just studied.`,
  },
  practice_run: {
    ko: '코드 실행',
    en: 'Run',
  },
  practice_submit: {
    ko: '코드 채점',
    en: 'Submit',
  },
  practice_terminal_output: {
    ko: '코드 실행 결과가 여기 표시됩니다.',
    en: 'Output of your code will be displayed here.',
  },
  practice_terminal_running: {
    ko: '코드 실행 중...',
    en: 'Running...',
  },
  practice_result_correct: {
    ko: '정답입니다!',
    en: 'Correct',
  },
  practice_result_incorrect: {
    ko: '오답입니다',
    en: 'Incorrect',
  },
  practice_action_button: {
    ko: '하위 목표 학습',
    en: 'Next',
  },
  practice_alert_back: {
    ko: '페이지를 벗어나면 작성하신 내용이 저장되지 않습니다. 내용을 유지하려면 먼저 따로 저장해두세요.',
    en: '',
  },
  practice_code_example: {
    ko: '이전 페이지 예시 문제 풀이',
    en: '',
  },
  assessment_title: {
    ko: '평가 문제',
    en: 'Assessment Problem',
  },
  assessment_instruction: {
    ko: `앞서 공부한 예시 문제 풀이와 연습 문제를 되짚으며, while 문을 사용하여 아래의 문제를 해결하는
            프로그램을 제한 시간 내에 작성해보세요. 제한 시간이 다 되면 자동으로 코드가 제출됩니다.`,
    en: `Recall the worked examples and practice problems you studied.
            Write a program that solves the following problem. When the time is out,
            your code will be submitted automatically.`,
  },
  assessment_action_button: {
    ko: '다음 평가 문제 풀기',
    en: 'Solve Next Problem',
  },
  assessment_confirm_submit: {
    ko: '작성하신 코드를 제출하시겠습니까?',
    en: 'Are you sure to submit your code?',
  },
  assessment_alert_time_up: {
    ko: '제한 시간이 다 되었습니다. 다음 문제로 이동합니다.',
    en: 'Time is up. Your current program code will be submitted.',
  },
  assessment_alert_back: {
    ko: '페이지를 벗어나면 작성하신 내용이 저장되지 않습니다. 내용을 유지하려면 먼저 따로 저장해두세요.',
    en: '',
  },
  parsons_title: {
    ko: '평가 문제',
    en: 'Assessment Problem',
  },
  parsons_instruction: {
    ko: `이번 문제는 주어진 코드의 순서 맞추기 입니다. 아래 문제를 해결하는 코드가 되도록 오른쪽 코드 블럭의 순서를 바꾸어보세요.
    코드 블럭을 드래그하면 순서를 바꿀 수 있습니다. 인덴트(들여쓰기)는 고려하지 않아도 됩니다.`,
    en: ``,
  },
  parsons_action_button: {
    ko: '다음 단계로 이동',
    en: 'Move On',
  },
  parsons_confirm_submit: {
    ko: '정말 제출하시겠습니까?',
    en: 'Are you sure to submit?',
  },
  parsons_alert_time_up: {
    ko: '제한 시간이 다 되었습니다. 다음 단계로 이동합니다.',
    en: 'Time is up. Your current answer will be submitted.',
  },
  posttest_alert_time_up: {
    ko: '제한 시간이 다 되었습니다. 현재 가지고 있는 답안을 제출하고 다음 단계로 이동해주세요. 아직 풀지 못한 문제는 "잘 모르겠음"을 체크한 다음 제출해주세요.',
    en: 'Time is up. Please submit what you have now. Check "I don\'t know" for the questions you did not answer.',
  },
  wrapup_title: {
    ko: '실험에 참여해주셔서 감사합니다.',
    en: 'Thank you for your participation.',
  },
  wrapup_document_submission_instruction: {
    ko: `실험 참가비 지급은 집행 절차에 따라 대략 한 달정도 소요될 수 있습니다.
            또한, 실험 참가비 지급을 위해 다음 서류를 작성하여 jinhw@kaist.ac.kr로 꼭 제출해주세요.
            서류가 누락되거나 불완전할 경우, 참가비 지급이 어렵습니다.`,
    en: `Your participation fee will be delivered in about a month due to the
            lab's payment process. Most importatnly, make sure to fill the following
            documents and send to jinhw@kaist.ac.kr. Participation fee will be not
            paid if any of your document is missing or incomplete.`,
  },
  wrapup_send_signiture: {
    ko: '의 7-1번, 7-2번, 17번 항목 체크와 마지막 피험자란에 서명한 스캔본',
    en: ': a scanned copy of your signiture to this document',
  },
  wrapup_informed_consent: {
    ko: '인간대상연구 피험자 동의서',
    en: 'Informed Consent',
  },
  wrapup_send_privacy: {
    ko: '에 본인 정보를 작성한 스캔본',
    en: ': a scanned copy of your signiture to this document',
  },
  wrapup_privacy_consent: {
    ko: '개인정보에 대한 수집 및 활용에 대한 동의서 (IRB 제출용)',
    en: 'Privacy Consent (for IRB use)',
  },
  wrapup_send_account: {
    ko: '에 본인 정보를 작성한 스캔본',
    en: ': a scanned copy of this document filled with your bank account information',
  },
  wrapup_account: {
    ko: '개인정보 수집,이용에 대한 동의서 (연구실 내부용)',
    en: 'Privacy Consent (for Research Office use)',
  },
  wrapup_further_question: {
    ko: '그 밖에 실험이나 참가비 지급에 관련된 문의는 아래 연락처로 질문해주세요.',
    en: 'If you have any question regarding this experiment or your participation fee, please contact us.',
  },
  contact_title: {
    ko: '다음과 같은 이유로 실험 중 오류가 발생했습니다.',
    en: 'You may see this page for the following reasons.',
  },
  contact_missing_id: {
    ko: '참가자 ID를 찾을 수 없습니다.',
    en: 'We cannot track your participant ID.',
  },
  contact_missing_id_solution: {
    ko: '새로운 참가자 ID를 발급받아야 합니다. 아래에 있는 연락처를 통해 실험 담당자에게 연락해주세요.',
    en: 'You must acquire a new ID. Please contact to the manager of this experiment. Contact information is provided below.',
  },
  contact_missing_group: {
    ko: '참가자가 속한 실험그룹을 찾을 수 없습니다.',
    en: 'We cannot track the group that you are assigned to.',
  },
  contact_missing_group_solution: {
    ko: '새로운 그룹을 배정받아야 합니다. 아래에 있는 연락처를 통해 실험 담당자에게 연락해주세요.',
    en: 'You must be reassigned to a group. Please contact to the manager of this experiment. Contact information is provided below.',
  },
  contact_wrong_url: {
    ko: '참가자가 시스템에서 제공하지 않은 페이지를 접근했습니다.',
    en: 'You attempted to enter undesignated url.',
  },
  contact_wrong_url_solution: {
    ko: '링크를 눌러 올바른 페이지로 다시 돌아가세요.',
    en: 'Click the link to go back to where you should be.',
  },
  contact_wrong_url_link: {
    ko: '링크',
    en: 'Link',
  },
  present_next: {
    ko: '다음 문제 학습',
    en: 'Study next problem',
  },
}
