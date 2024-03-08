"use client"

import SwaggerUI, { SwaggerUIProps } from "swagger-ui-react"

type Props = {
  spec: SwaggerUIProps["spec"]
}

function ReactSwagger({ spec }: Props) {
  return <SwaggerUI spec={spec} />
}

export default ReactSwagger
