"use client"

import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useAuthSignIn } from "@/hooks/authentication"
import React from "react"

type Props = {}

const SignInForm = (props: Props) => {
    const { isPending, onAutheticatedUser, register, errors } = useAuthSignIn()

    return (
        <form
            className="flex flex-col gap-3 mt-10"
            onSubmit={onAutheticatedUser}
        >
            {GROUPLE_CONSTANTS.signInForm.map((field) => (
                <FormGenerator
                    {...field}
                    key={field.id}
                    register={register}
                    errors={errors}
                />
            ))}
            <Button type="submit" className="rounded-2xl">
                <Loader loading={isPending}>Sign in withemail</Loader>
            </Button>
        </form>
    )
}

export default SignInForm
