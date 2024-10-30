import SignUpForm from "@/components/forms/sign-up"
import GoogleAuthButton from "@/components/global/google-oauth-button"
import { Separator } from "@/components/ui/separator"

type Props = {}

const SignUpPage = (props: Props) => {
    return (
        <>
        <h5
                className="font-bold text-base
        text-themeTextWhite
        "
            >
                Sign up
            </h5>
            <div>
                <SignUpForm/>
                <div className="my-10 w-full relative">
                <div
                    className="bg-black p-3 absolute text-themeTextGray text-sm top-1/2 left-1/2
            transform -translate-x-1/2 -translate-y-1/2"
                >
                    OR CONTINUE WITH
                </div>
                <Separator orientation="horizontal" className="bg-themeGray" />
            </div>
            </div>
            <GoogleAuthButton method="signup" />

        </>
    )
}

export default SignUpPage
