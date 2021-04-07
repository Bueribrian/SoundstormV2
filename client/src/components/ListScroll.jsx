import styled from "styled-components";

const ListScroll = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  max-height: 45rem;
  padding: 0rem 1rem 0rem 0rem;
  overflow-y: scroll;

  & > div {
    cursor: pointer;
    transition: 0.2s all;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h3 {
      max-width: 60%;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    &:hover,
    &:focus {
      background: #160741;
      transition: 0.2s all;
    }
  }
`;

export {ListScroll};
