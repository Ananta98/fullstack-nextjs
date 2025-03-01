import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

const Login = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            <Button onClick={() => signIn('google')}>Sign in</Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default Login
