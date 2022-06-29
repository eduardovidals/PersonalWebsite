import {ArticleContainer} from "components/common/Article/Article.styles";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import codeStyle from "react-syntax-highlighter/dist/esm/styles/prism/nord";
import {HashLink} from "react-router-hash-link";
import remarkGfm from "remark-gfm";

interface ArticleProps {
  markdown: string
}

function Article(props: ArticleProps) {
  const {markdown} = props;

  return (
    <ArticleContainer>
      <ReactMarkdown children={markdown} skipHtml={false} remarkPlugins={[remarkGfm]} components={{
        a: ({href, ...props}) => {
          if (href && href.match(/^(https?:)?\/\//)) {
            return <a href={href} target={"_blank"} rel={"noreferrer"} {...props}/>;
          }

          return href ? <HashLink to={href} children={props.children}/> : null;
        }
        ,
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
