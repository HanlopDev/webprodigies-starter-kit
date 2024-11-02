import { onAuthenticatedUser } from '@/actions/auth'
import { onGetAffiliateInfo } from '@/actions/group';
import CreateGroup from '@/components/forms/create-group';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const CreateGroupPage = async ({searchParams}: {searchParams: {[affiliate: string]: string}}) => {
    const user = await onAuthenticatedUser();

    const affiliate = await onGetAffiliateInfo(searchParams.affiliate)

    if(!user || !user.id) redirect("/sign-in")

  return (
    <>
        <div className='px-7 flex flex-col'>
            <h5 className='font-bold text-base text-themeTextWhite'>
                Payment method
            </h5>
            <p className='text-themeGray leading-tight'>
            Free for 14 days and $99/month. cancel anytime. All feartures.
            Unlimited everything unhidden fees.
            </p>
            {affiliate.status === 200 && (
                <div className='w-full mt-5 flex justify-center items-center gap-x-2 
                italic text-themeGray text-sm'>
                    You were refared by
                    <Avatar>
                        <AvatarImage
                        src={affiliate.user?.Group?.User.image as string}
                        alt='User'
                        />
                    </Avatar>
                    {affiliate.user?.Group?.User.firstname}{" "}
                    {affiliate.user?.Group?.User.lastname}
                </div>
            )}
        </div>
        <CreateGroup
        userId={user.id}
        affiliate={affiliate.status === 200 ? true : false}
        stripeId={affiliate.user?.Group?.User.stripeId || ""}
        />
    </>
  )
}

export default CreateGroupPage