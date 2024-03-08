import React from "react";
import "./CssForThePages/Tutorial.css";
import { VideoComponent1 } from "../../ChessBoardComponents/fun/video";
import { VideoComponent2 } from "../../ChessBoardComponents/fun/princess";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Poper from "../../ChessBoardComponents/buttons/poper"

export const Tutorial = () => {
  return (
    <div>
      <Container fixed>
        <Box>
          <div className="Video">
            <VideoComponent1 />
          </div>
          <div className="text">
            Принцът се движи като Топ, но за разлика от него той прескача през
            едно и през две полета. <br /> След четирестия ход, той взима ролята на цар
            и тогава само на него може да се дава мат.
          </div>
        </Box>
      </Container>

      <Container>
        <Box>
          <div className="Video">
            <VideoComponent2 />
          </div>
          <div className="text">
            Принцесата се движи като Царица , но е ограничена до три полета.
            След четирестия ход, принцесата взима ролята на Царица и започва да се
            движи като нея.
          </div>
        </Box>
      </Container>
      <Poper></Poper>
    </div>
  );
};
