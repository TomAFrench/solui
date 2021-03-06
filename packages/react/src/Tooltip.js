/* eslint-disable-next-line import/no-extraneous-dependencies */
import { findDOMNode } from 'react-dom'
/* eslint-disable-next-line import/no-extraneous-dependencies */
import React, { Fragment, Component } from 'react'

import uuid from 'uuid'
import ReactTooltip from 'react-tooltip'
import styled from '@emotion/styled'

const DefaultTooltip = styled(ReactTooltip)`
  z-index: 1;
  max-width: 80%;
`

export default class Tooltip extends Component {
  state = {}

  componentDidMount () {
    this.id = uuid()
    this.componentDidUpdate()
  }

  componentDidUpdate () {
    if (!this.elem) {
      return
    }

    if (this.state.show) {
      ReactTooltip.show(findDOMNode(this.elem))
    } else {
      ReactTooltip.hide(findDOMNode(this.elem))
    }
  }

  _onRef = e => {
    this.elem = e
  }

  render () {
    const { text, position, children } = this.props

    return (
      <Fragment>
        {children({
          flash: this.flash,
          show: this.show,
          hide: this.hide,
          tooltipElement: (
            <span data-tip={text} data-for={this.id} ref={this._onRef} />
          )
        })}
        <DefaultTooltip
          id={this.id}
          event="dbclick"
          place={position || 'top'}
          effect="solid"
          type="dark"
        />
      </Fragment>
    )
  }

  show = () => {
    this.setState({ show: true })
  }

  hide = () => {
    this.setState({ show: false })
  }

  flash = (timeMs = 2000) => {
    this.show()
    setTimeout(() => this.hide(), timeMs)
  }
}
