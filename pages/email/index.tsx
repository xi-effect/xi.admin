import Head from "next/head";
import React from "react";
import { Stack } from "@mui/material";
// @ts-ignore
import { inject, observer } from "mobx-react";
import Navigation from "kit/Navigation/Navigation";
import { Email } from "components/Email";

const EmailPage: React.FC = inject()(observer(() => (
  (
    <>
      <Head>
        <title>
          Ξffect | Главная
        </title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navigation>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          sx={{
            width: "100%",
            pt: 1,
            ml: 0,
            mr: 0,
            pb: 10,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Email />
        </Stack>
      </Navigation>
    </>
  )
)));

export default EmailPage;