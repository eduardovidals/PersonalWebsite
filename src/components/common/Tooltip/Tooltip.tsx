import React, {useEffect, useState} from "react";
import {TooltipContainer, TooltipText} from "components/common/Tooltip/Tooltip.styles";

interface TooltipProps {
  children: React.ReactNode,
  copiedAlertText: string
}

function Tooltip(props: TooltipProps) {
  const {children, copiedAlertText} = props;

  const [copyText, setCopyText] = useState('Copy to clipboard');
  const [onCopy, setOnCopy] = useState(false);

  useEffect(() => {
    if (!onCopy) {
      setCopyText('Copy to clipboard');
    }
  }, [onCopy])

  return (
    <TooltipContainer onMouseEnter={() => setOnCopy(true)} onMouseLeave={() => setOnCopy(false)}
                       onClick={() => setCopyText(copiedAlertText)}>
      <TooltipText active={onCopy}> {copyText} </TooltipText>
      {children}
    </TooltipContainer>
  )
}

export default Tooltip;
