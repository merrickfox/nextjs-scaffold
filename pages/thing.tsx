import { user } from '../lib/api';
import React from "react";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log(context.req.cookies)
  const res = await user(context.req.cookies)
  console.log(res)
  return {
    props: {}, // will be passed to the page component as props
  }
}

function Thing() {
  return (
    <div>Thing</div>
  )
}

export default Thing
