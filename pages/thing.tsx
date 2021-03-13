import { user } from '../lib/api';
import React from "react";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {config} from "../lib/config";
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const res = await user(context.req, context.res)
  if (res.error && res.errorCode === config.API_ERRORS.UNAUTHORISED) {
    const url = encodeURIComponent(context.req.url ?? "/")
    context.res.statusCode = 302
    context.res.setHeader('Location', `/login?to=${url}`)
  }
  return {
    props: {}, // will be passed to the page component as props
  }
}

function Thing() {
  const router = useRouter()

  const doThing = async () => {
    const res = await user()
    console.log(res)
    if (res.error && res.errorCode === config.API_ERRORS.UNAUTHORISED) {
      const url = encodeURIComponent(router.pathname ?? "/")
      router.push(`/login?to=${url}`)
    }
  }

  return (
    <div>
      <p>Thing</p>
      <button onClick={doThing}>here</button>
    </div>
  )
}

export default Thing
