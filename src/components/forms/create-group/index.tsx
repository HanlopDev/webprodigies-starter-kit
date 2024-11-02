import { StripeElement } from "@/components/global/stripe/element"
import React from "react"
import PaymentForm from "./payment-form"

type Props = {
    userId: string
    affiliate: boolean
    stripeId?: string
}

const CreateGroup = ({ userId, affiliate, stripeId }: Props) => {
    return (
        <StripeElement>
            <PaymentForm
                userId={userId}
                affiliate={affiliate}
                stripeId={stripeId}
            />
        </StripeElement>
    )
}

export default CreateGroup
