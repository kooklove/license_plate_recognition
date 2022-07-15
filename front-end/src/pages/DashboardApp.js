import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppAlpr } from '../sections/@dashboard/app';

DashboardApp.propTypes = {
  request: PropTypes.object,
};
// ----------------------------------------------------------------------

export default function DashboardApp({ request }) {
  useEffect(() => {
    // console.log("[DashboardApp]request", request);
  }, [request]);

  return (
    <Page title="Dashboard" style={{ position: 'relative', height: '100%' }}>
      <Container maxWidth="xl" style={{ border: '0px solid blue', height: '100%' }}>
        <AppAlpr
          title="ALPR Preview"
          subheader="Realtime Video Streaming"
          request={request}
        />
      </Container>
    </Page>
  );
}
