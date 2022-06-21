import {ArticleContainer} from "components/common/Article/Article.styles";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import codeStyle from "react-syntax-highlighter/dist/esm/styles/prism/nord";
import {useEffect} from "react";

interface ArticleProps {
  markdown: string
}

function Article(props: ArticleProps) {
  const {markdown} = props;

  useEffect(() => {
    window.scrollTo({top: -100})
  }, [])

  return (
    <ArticleContainer>
      <ReactMarkdown children={markdown} skipHtml={false} components={{
        a: ({...props}) => <a target={"_blank"} rel={"noreferrer"} {...props} />,
        code: ({inline, className, children, ...props}) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={codeStyle}
              showLineNumbers={true}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}/>
    </ArticleContainer>
  )
}

export default Article;
