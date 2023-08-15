import { Children, useRef, cloneElement, PropsWithChildren } from 'react'
import { CSSTransition as _CSSTransition } from 'react-transition-group'

export default function CSSTransition(props: PropsWithChildren<any>) {
  const nodeRef = useRef(null)

  return (
    <_CSSTransition {...props} nodeRef={nodeRef}>
      <>{Children.map(props.children, child => cloneElement(child, { ref: nodeRef }))}</>
    </_CSSTransition>
  )
}
