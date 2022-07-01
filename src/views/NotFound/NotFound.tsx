import {NotFoundContainer, NotFoundHeader, NotFoundText, NotFoundTexts} from "views/NotFound/NotFound.styles";
import Main from "components/layout/ui/Main/Main";

function NotFound(){
  return (
    <Main>
      <NotFoundContainer>
        <NotFoundTexts>
          <NotFoundHeader> Error 404 </NotFoundHeader>
          <NotFoundText>
            Whoops. Looks like this page doesn't exist!
          </NotFoundText>
        </NotFoundTexts>
      </NotFoundContainer>
    </Main>
  )
}

export default NotFound;
