import React, {Children} from "react";
// @ts-ignore
import {CSSTransition} from "react-transition-group";

interface Transition {
  show: boolean
  enter: string
  enterFrom: string
  enterTo: string
  leave: string
  leaveFrom: string
  leaveTo: string
  children: any
  appear: boolean
  onExited: () => void
}

function Transition({
                      show = true,
                      enter,
                      enterFrom,
                      enterTo,
                      leave,
                      leaveFrom,
                      leaveTo,
                      children,
                      appear = false,
                      onExited = () => {
                      },
                    }:Transition) {
  const enterClasses = enter.split(" ");
  const enterFromClasses = enterFrom.split(" ");
  const enterToClasses = enterTo.split(" ");
  const leaveClasses = leave.split(" ");
  const leaveFromClasses = leaveFrom.split(" ");
  const leaveToClasses = leaveTo.split(" ");

  return (
    <CSSTransition
      addEndListener={(node:any, done:any) => {
        node.addEventListener("transitionend", done, false);
      }}
      appear={appear}
      in={show}
      onEnter={(node:any) => {
        node.classList.add(...enterClasses, ...enterFromClasses);
      }}
      onEntered={(node:any) => {
        node.classList.remove(...enterClasses);
      }}
      onEntering={(node:any) => {
        node.classList.remove(...enterFromClasses);
        node.classList.add(...enterToClasses);
      }}
      onExit={(node:any) => {
        node.classList.add(...leaveClasses, ...leaveFromClasses);
      }}
      onExited={(node:any) => {
        node.classList.remove(...leaveClasses);
        onExited();
      }}
      onExiting={(node:any) => {
        node.classList.remove(...leaveFromClasses);
        node.classList.add(...leaveToClasses);
      }}
      unmountOnExit={true}
    >
      {Children.only(children)}
    </CSSTransition>
  );
}

export default Transition;
