import React from 'react'
import styled from '@emotion/styled'
import FormatContainer from '../components/FormatContainer/FormatContainer'
import { CodeMirror } from '../components/CodeMirror'
import {
  ExampleCode1,
  ExampleCode2,
  ExampleCode3,
  ExampleCode4,
  ExampleCode5,
  ExampleCode6,
  ExampleCode7,
} from '../data/TutorialExamples'
import { Color } from '../shared/Common'

export default function PythonTutorial() {
  return (
    <FormatContainer>
      <h1>1. Hello, World!를 출력하는 프로그램 작성</h1>
      <Container>
        <CodeMirror code={ExampleCode1} />
      </Container>
      <h1>2. Variables 변수 정의</h1>
      <Container>
        <CodeMirror code={ExampleCode2} />
      </Container>
      <h1>3. Arithmetic Operations 산수</h1>
      <Container>
        <CodeMirror code={ExampleCode3} />
      </Container>
      <h1>4.Boolean 참/거짓</h1>
      <Container>
        <CodeMirror code={ExampleCode4} />
      </Container>
      <h1>5. Strings 문자열</h1>
      <Container>
        <CodeMirror code={ExampleCode5} />
      </Container>
      <h1>6. Lists 리스트 자료 구조</h1>
      <Container>
        <CodeMirror code={ExampleCode6} />
      </Container>
      <h1>7. Conditionals If else 분기문</h1>
      <Container>
        <CodeMirror code={ExampleCode7} />
      </Container>
    </FormatContainer>
  )
}

const Container = styled.div`
  border: 1px solid ${Color.Gray30};
  padding: 10px;
`
