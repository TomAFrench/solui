/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'

import ErrorBox from './ErrorBox'
import Value from './Value'

const Results = styled.ul`
  list-style: none;
  display: block;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.resultBgColor};
`

const ResultItem = styled.li`
  margin-bottom: ${({ moreThanOne }) => (moreThanOne ? '2rem' : '0')};
  &:last-child {
    margin-bottom: 0;
  }
`

const Title = styled.h3`
  margin: 0 0 1em;
  font-size: 1.2em;
`

/**
 * Render one ore more execution results.
 *
 * @see {Value}
 * @return {ReactElement}
 */
const Result = ({ className, result: { value, error } }) => {
  if (error) {
    return <ErrorBox className={className} error={error} />
  } else {
    let resultItems = []

    const sanitizedValue = (value || new Map())

    sanitizedValue.forEach((v, k) => {
      const { title, result: actualValue, ...valueProps } = v

      resultItems.push(
        <ResultItem key={k} moreThanOne={!!sanitizedValue.size}>
          <Title>{title}</Title>
          <Value {...valueProps} value={actualValue} />
        </ResultItem>
      )
    })

    if (!resultItems.length) {
      resultItems = <ResultItem>Success!</ResultItem>
    }

    return <Results className={className}>{resultItems}</Results>
  }
}

export default Result
