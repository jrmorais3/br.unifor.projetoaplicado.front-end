import styled from 'styled-components';

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 256px;
  max-width: 256px;
  height: 100vh;

  background: #fff;

  .logo {
    width: 125px;
    margin-top: 23px;
  }

  h1 {
    color: #003379;
    font-size: 24px;
    font-weight: bold;
    margin-top: 30px;
  }

  ul {
    list-style: none;
    margin-top: 30px;
    margin-right: -25px;

    li {
      position: relative;
      display: flex;
      height: 56px;
      width: 230px;
      border-radius: 30px 0 0 30px;
      align-items: center;
      justify-content: center;

      & + li {
        margin-top: 10px;
      }

      &:hover {
        background: #ff365f;
        a {
          color: #fff;
        }
      }
    }

    /* li::after {
      content: '';
      position: absolute;
      width: 90%;
      height: 0.175rem;
      right: 0;
      bottom: 0;
      background: #ff365f;
    }

    li::after {
      transform: scale(0, 1);
      transform-origin: 100% 0%;
      transition: transform 0.3s ease;
    }

    li:hover::after {
      transform: scale(1, 1);
    } */

    a {
      display: flex;
      height: 56px;
      width: 230px;
      text-decoration: none;
      color: #a3a3a3;
      align-items: center;
      justify-content: start;
      border-radius: 30px 0 0 30px;

      svg {
        width: 30px;
        height: 30px;
        margin-right: 20px;
        margin-left: 30px;
      }
    }

    a.active {
      background: #ff365f;
      color: #fff;
      cursor: default;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    }
  }

  hr {
    background: #d2cfcf;
    height: 2px;
    border: 0;
    width: 256px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  button {
    display: flex;
    height: 56px;
    width: 230px;
    margin-right: -25px;
    margin-top: 10px;
    align-items: center;
    justify-content: start;
    color: #a3a3a3;
    background: transparent;
    border: 0;
    border-radius: 25px 0 0 25px;
    text-decoration: none;

    &:hover {
      background: #ff365f;
      color: #fff;
    }

    svg {
      width: 30px;
      height: 30px;
      margin-right: 20px;
      margin-left: 30px;
    }
  }
`;
