import { onCreatNewChannel } from "@/actions/channels"
import { onGetGroupChannels } from "@/actions/group"
import { IGroupInfo, IGroups } from "@/components/global/sidebar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const useNavigation = () => {
    const patName = usePathname()
    const [section, setSection] = useState<string>(patName)
    const onSetSection = (page: string) => setSection(page)
    return {
        section,
        onSetSection,
    }
}

export const useSideBar = (groupid: string) => {
    const { data: groups } = useQuery({
        queryKey: ["user-groups"],
    }) as { data: IGroups }

    const { data: groupInfo } = useQuery({
        queryKey: ["group-info"],
    }) as { data: IGroupInfo }

    const { data: channels } = useQuery({
        queryKey: ["group-channel"],
        queryFn: () => onGetGroupChannels(groupid),
    })

    const client = useQueryClient()

    const { isPending, mutate, isError, variables } = useMutation({
        mutationFn: (data: {
            id: string
            name: string
            icon: string
            createdAt: Date
            groupId: string | null
        }) =>
            onCreatNewChannel(groupid, {
                id: data.id,
                name: data.name.toLowerCase(),
                icon: data.icon,
            }),
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })

    if (isPending) {
        toast("Success", { description: "Channel Created" })
    }

    if (isError) {
        toast("Error", { description: "Oop! something went wrong" })
    }

    return { groupInfo, groups, mutate, variables, isPending, channels }
}
