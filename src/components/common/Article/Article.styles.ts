import styled from "styled-components";

export const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 80px 20px 20px 20px;
  width: 90%;
  max-width: 800px;

  p {
    padding: 10px 0;
  }

  code {
    font-family: "Titillium Web", sans-serif;
    font-size: 0.875rem;
    font-weight: bold;
  }

  ul {
    margin-left: 20px;
  }

  li {
    padding: 3px 0;
  }

  li a {
    color: #58a6ff;
  }

  a {
    text-decoration: none;
    color: #58a6ff;
    cursor: pointer;
  }
  
  h1 {
    padding: 20px 0 0 0;
    text-align: center;
  }

  h2, h3 {
    padding: 5px 0;
    text-align: center;
  }
  
  td {
    padding: 0 35px;
    height: 100%;
  }

  img {
    display: flex;
    margin: 0 auto;
    max-width: 100%;
    max-height: 550px;
    padding: 10px 0;
  }
  
  pre > div {
    border-radius: 10px !important;
    padding-left: 0 !important;
  }
`
