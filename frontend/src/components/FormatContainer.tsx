import styled from '@emotion/styled'
import React from 'react'
import { Color } from '../shared/Common'

interface Props {
  children: React.ReactNode
}

export function FormatContainer(props: Props) {
  return <Container>{props.children}</Container>
}

const Container = styled.div`
  color: ${Color.Gray50};
  font-size: 16px;
  padding: 20px;
  max-width: 750px;
  margin: 0 auto;

  p {
    margin-bottom: 28px;
  }

  table {
    border: 1px solid ${Color.Gray15};
    padding: 10px;

    thead {
      font-weight: bold;
    }

    tbody {
      tr {
        & > td {
          padding: 0 5px 0 5px;
        }
      }
    }
  }

  strong {
    color: ${Color.Error00};
  }
`
