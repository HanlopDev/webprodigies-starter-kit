import { onAuthenticatedUser } from "@/actions/auth"
import { onGetChannelInfo } from "@/actions/channels"
import { onGetGroupInfo } from "@/actions/group"
import { currentUser } from "@clerk/nextjs/server"
import { QueryClient } from "@tanstack/react-query"
import React from "react"

type Props = {
    params: { channelid: string; groupid: string }
}

const GroupChannelPage = async ({ params }: Props) => {
    const client = new QueryClient()
    const user = await currentUser()
    const authUser = onAuthenticatedUser()

    await client.prefetchQuery({
        queryKey: ["channel-info"],
        queryFn: () => onGetChannelInfo(params.channelid),
    })

    await client.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(params.groupid),
    })

    return <div>GroupChannelPage</div>
}

export default GroupChannelPage
