import React, {useEffect} from "react";
import {
  MainContainer, MainChildContainer
} from "components/layout/ui/Main/Main.styles";
import {useAppDispatch} from "store/hooks";
import {increment} from "store/home/home.slice";

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[]
}

function Main(props: MainProps) {
  const {children, ...rest} = props;

  // deploy in main container as user can either be in a projects page or home page, ensures that
  // the animation for the header only runs once, as Main component is used for all other pages
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(increment());
    }, 2200)
  }, [])

  return (
    <MainContainer>
      <MainChildContainer {...rest}>
        {children}
      </MainChildContainer>
    </MainContainer>
  )
}

export default Main;
