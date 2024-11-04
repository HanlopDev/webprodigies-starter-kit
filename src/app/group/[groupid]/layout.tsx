import { onAuthenticatedUser } from '@/actions/auth'
import { onGetGroupChannels, onGetGroupInfo, onGetGroupSubscriptions, onGetUserGroup } from '@/actions/group'
import { QueryClient } from '@tanstack/react-query'
import { group } from 'console'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children : React.ReactNode
    params: {
        groupId: string
    }
}

const GroupLayou = async ({children, params}: Props) => {
    const query = new QueryClient()
    const user = await onAuthenticatedUser()

    if(!user.id) redirect('/sign-in')
    // group Info
    await query.prefetchQuery({
        queryKey: ["group-info"],
        queryFn: () => onGetGroupInfo(params.groupId),
    })
    //user group
    await query.prefetchQuery({
        queryKey: ["user-groups"],
        queryFn: () => onGetUserGroup(user.id as string)
    })
    // channel
    await query.prefetchQuery({
        queryKey:  ["group-channels"],
        queryFn: () => onGetGroupChannels(params.groupId)
    })
    // group  subscription
    await query.prefetchQuery({
        queryKey: ["group-subscriptions"],
        queryFn: () => onGetGroupSubscriptions(params.groupId)
    })
    // members-chat

  return (
    <div>GroupLayou</div>
  )
}

export default GroupLayou