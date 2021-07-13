import styled from "@emotion/styled"
import { Button } from "antd"
import { useRun } from "hooks/use-run";

console.log("footer");

export const Footer = ()=>{

  const run = useRun();

  return <Foot>
    <div></div>
    <div>
      <Button type="primary" onClick={run}>Run</Button>
    </div>
  </Foot>
}

const Foot = styled.footer`
display: flex;
justify-content: space-between;
padding: 10px 20px;
`