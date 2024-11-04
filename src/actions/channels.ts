import { client } from "@/lib/prisma"
import { onAuthenticatedUser } from "./auth"

export const onGetChannelInfo = async (channelid: string) => {
    try {
        const user = await onAuthenticatedUser()
        const channel = await client.channel.findUnique({
            where: {
                id: channelid,
            },
            include: {
                posts: {
                    take: 3,
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        channel: {
                            select: {
                                name: true,
                            },
                        },
                        author: {
                            select: {
                                firstname: true,
                                lastname: true,
                                image: true,
                            },
                        },
                        _count: {
                            select: {
                                likes: true,
                                comments: true,
                            },
                        },
                        likes: {
                            where: {
                                id: user.id,
                            },
                            select: {
                                userId: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        })
        return channel
    } catch (error) {
        return { status: 400, message: "Oop! something went wrong" }
    }
}

// export const onGetGroupInfo = async (groupid: string)  => {
//     try {

//     } catch (error) {

//     }
// }

export const onCreatNewChannel = async (
    groupid: string,
    data: {
        id: string
        name: string
        icon: string
    },
) => {
    try {
        const channel = await client.group.update({
            where: {
                id: groupid,
            },
            data: {
                channel: {
                    create: {
                        ...data,
                    },
                },
            },
            select: {
                channel: true,
            },
        })
        if (channel) {
            return { statuss: 200, channel: channel.channel }
        }

        return { status: 404, message: "Channel could not be created" }
    } catch (error) {
        return {
            status: 400,
            message: "Oops! something went wrong",
        }
    }
}
