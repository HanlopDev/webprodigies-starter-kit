"use client"

import { useStripeElements } from "@/hooks/payment"
import { Elements } from "@stripe/react-stripe-js"

type StripElementProps = {
    children: React.ReactNode
}

export const StripeElement = ({ children }: StripElementProps) => {
    const { StripePromise } = useStripeElements()

    const promise = StripePromise()

    return promise && <Elements stripe={promise}>{children}</Elements>
}
