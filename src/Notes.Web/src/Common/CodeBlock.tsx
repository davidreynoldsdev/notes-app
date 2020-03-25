import React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IProps {
  value: string,
  language: string
};

const CodeBlock: React.FC<IProps> = (props) => {
  const { language, value } = props;
  return (
    <SyntaxHighlighter language={language} style={vs}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;