import styled from 'styled-components';

const MainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 815px;
  top: calc(50% - 407.5px);
`;

const VideoGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: 220px;
  height: 90vh;
  gap: 1rem;
  overflow-y: auto;
`;

const MyVideoWrapper = styled.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 220px;
`;

export { MainContainer, VideoGrid, MyVideoWrapper };
