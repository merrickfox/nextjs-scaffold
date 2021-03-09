import Head from 'next/head'
import Shell from "../components/Shell";
import withAuth from "../lib/AuthenticationHoc";
import { useInput } from '../lib/inputhook';
import { login } from '../lib/api';
import React from "react";
import {storeJwt} from "../lib/jwt";

function Login() {
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>("");

  const handleSubmit = async (event: React.FormEvent) => {
    setError(false)
    event.preventDefault()
    const res = await login(password, email)
    if (res.error) {
      setError(true)
      setErrorMessage(res.errorMessage)
    } else {
      // redirect somewhere
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
             alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        {/*<p className="mt-2 text-center text-sm text-gray-600 max-w">*/}
        {/*  Or*/}
        {/*  <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
        {/*    start your 14-day free trial*/}
        {/*  </a>*/}
        {/*</p>*/}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error &&
              <div className="text-sm font-medium text-red-700">{errorMessage}</div>
            }
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input id="email"  name="email" type="email" autoComplete="email" required {...bindEmail}
                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="current-password" required {...bindPassword}
                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
