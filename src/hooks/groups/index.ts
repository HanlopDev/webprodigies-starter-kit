
import { supabaClient } from "@/lib/utils"
import { onOnline } from "@/redux/slice/online-member-slice"
import { AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


export const useGroupChatOnline = async (userid: string) => {
    const dispatch: AppDispatch  = useDispatch()

    useEffect(()=> {
        const  channel = supabaClient.channel("tracking")

        channel
        .on("presence",  {event: "sync"}, () => {
            const state: any = channel.presenceState()
            console.log(state)
            for(const user in state){
                dispatch(
                    onOnline({
                        members: [{id: state[user][0].member.userid}]
                    })
                )
            }
        })
        .subscribe(async (status) => {
            if (status ===   "SUBSCRIBED") {
                await  channel.track({
                    member: {
                        userid
                    }
                })
            }
        })
        return () =>  {
            channel.unsubscribe()
        }
    },[])
}