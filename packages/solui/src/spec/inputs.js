import { isAddress } from 'web3-utils'

import { _, promiseSerial } from '../utils'

const INPUTS = {
  address: true,
  uint: true,
  int: true,
  bool: true,
  string: true,
  bytes32: true,
}

export const processList = async (ctx, inputs) => (
  promiseSerial(inputs, async (inputId, inputConfig) => {
    const newCtx = { ...ctx, id: `${ctx.parentId}.inputs.${inputId}` }

    if (!_.get(inputConfig, 'title')) {
      ctx.errors.add(newCtx.id, `must have a title`)
    }

    const type = _.get(inputConfig, 'type')
    if (!INPUTS[type]) {
      ctx.errors.add(newCtx.id, `must have a valid type: ${Object.keys(INPUTS).join(', ')}`)
    }

    const initialValue = _.get(inputConfig, 'initialValue')
    if (initialValue) {
      switch (type) {
        case 'address': {
          if (!isAddress(initialValue)) {
            ctx.errors.add(newCtx.id, `initial value must be a valid Ethereum address`)
          }
          break
        }
        default:
          // do nothing
      }
    }

    const result = await ctx.callbacks.getInput(newCtx.id, inputId, inputConfig)

    if (result) {
      // check result
      switch (type) {
        case 'address': {
          if (!isAddress(result)) {
            ctx.errors.add(newCtx.id, `value must be a valid Ethereum address`)
          }
          break
        }
        default:
          // do nothing
      }
    }

    ctx.inputs[inputId] = result
  })
)
