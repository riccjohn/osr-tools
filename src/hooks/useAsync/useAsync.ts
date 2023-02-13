import { useCallback, useReducer } from 'react'

type AsyncStatus = 'pending' | 'resolved' | 'rejected'

interface IReducerState {
  status: AsyncStatus
  data: any
  error?: string | null
}

interface IAction {
  type: AsyncStatus
  data?: any
  error?: string
}

export const asyncStatus = {
  pending: 'pending' as AsyncStatus,
  resolved: 'resolved' as AsyncStatus,
  rejected: 'rejected' as AsyncStatus,
}

const asyncReducer: React.Reducer<IReducerState, IAction> = (state, action) => {
  switch (action.type) {
    case asyncStatus.pending: {
      return { status: asyncStatus.pending, data: null, error: null }
    }
    case asyncStatus.resolved: {
      return { status: asyncStatus.resolved, data: action.data, error: null }
    }
    case asyncStatus.rejected: {
      return { status: asyncStatus.rejected, data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type ${action.type}`)
    }
  }
}

const useAsync = (initialState: { [key: string]: any }) => {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: asyncStatus.pending,
    data: null,
    error: '',
    ...initialState,
  })

  const run = useCallback(<T>(promise: Promise<T>) => {
    dispatch({ type: asyncStatus.pending })
    promise.then(
      (data: T) => dispatch({ type: asyncStatus.resolved, data }),
      (error: string) => dispatch({ type: asyncStatus.rejected, error }),
    )
  }, [])

  return { ...state, run }
}

export default useAsync
