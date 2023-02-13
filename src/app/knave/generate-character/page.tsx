'use client'

import React, { useEffect } from 'react'
import { KnaveCharacterDisplay } from '@/components'
import { KnaveCharacter } from '@/knave'
import useAsync, { asyncStatus } from '@/hooks/useAsync/useAsync'

type JSONResponse = {
  data?: KnaveCharacter
  errors?: Array<{ message: string }>
}

const generateCharacter = async (): Promise<KnaveCharacter> => {
  const response = await fetch('/api/knave/character')
  const { data, errors }: JSONResponse = await response.json()

  if (response.ok) {
    const character = data
    if (character) {
      return character
    } else {
      return Promise.reject(new Error('Error generating character'))
    }
  } else {
    const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
    return Promise.reject(error)
  }
}

const Page = () => {
  const { data: character, status, error, run } = useAsync({})

  useEffect(() => {
    return run(generateCharacter())
  }, [run])

  switch (status) {
    case asyncStatus.pending:
      return <p>Loading ...</p>
    case asyncStatus.rejected:
      console.error(error)
      return <p>Error generating new character. Refresh to try again.</p>
    case asyncStatus.resolved:
      return <KnaveCharacterDisplay character={character} />
    default:
      return <p>Error generating new character. Refresh to try again.</p>
  }
}

export default Page
