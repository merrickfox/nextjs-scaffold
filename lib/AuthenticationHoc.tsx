import React, {Component} from 'react'
import {ConfigI} from "./config";
import { NextPage, NextPageContext } from 'next';

interface props {
  children: React.ReactNode
  config: ConfigI
}

export default function withAuth(AuthComponent: NextPage) {
  return class Authenticated extends Component {

    static async getInitialProps(ctx: NextPageContext) {
      console.log("hello")
      // Ensures material-ui renders the correct css prefixes server-side
      let userAgent
      if (process.browser) {
        userAgent = navigator.userAgent
      } else {
        userAgent = ctx?.req?.headers['user-agent']
      }

      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
      // Return props.
      return { ...pageProps, userAgent }
    }

    constructor(props: {} | Readonly<{}>) {
      super(props)
      this.state = {
        isLoading: true
      };
    }

    componentDidMount () {
      // if (!Auth.loggedIn()) {
      //   Router.push('/')
      // }
      this.setState({ isLoading: false })
    }

    render() {
      return (
        <AuthComponent {...this.props} />
      )
    }
  }
}
